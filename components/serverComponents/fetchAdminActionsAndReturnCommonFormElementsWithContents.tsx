import { createClient } from "@/lib/supabase/server";
import AdminSidebarGroupActions from "../clientComponents/adminSidebarGroupActions";


export default async function FetchAdminActionsAndReturnCommonFormElementsWithContents(){
const supabase = await createClient();

const [{data:contentTypes}, {data:techs}, {data:categories}] = await Promise.all([
  supabase.from('content_types').select('id, name'),
  supabase.from('tech').select('id, name'),
  supabase.from('categories').select('id, name')
]);

if(!contentTypes || !techs || !categories){
  return <p>Can't load types, categories, techs</p>
}
return (
  <AdminSidebarGroupActions categories={categories} contentTypes={contentTypes} techs ={techs} />
)
}