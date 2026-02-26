"use server"

import { createClient } from "@/lib/supabase/server";
import { contentsSchema } from "@/lib/validation/auth";
import { contentsActionType } from "../customTypes/types";
export async function editContents(preeData:contentsActionType, formData:FormData):Promise<contentsActionType>{
  try{
    const title = formData.get('title') as string;
    const description = formData.get('description') as string;
    const contentTypeId = formData.get('contentTypeId') as string;
    const categoryId = formData.get('categoryId') as string;
    const techId = formData.get('techId') as string;
    const contentType = formData.get('activeContentType') as string;
    const targetedContent = contentType === "video"? `${contentType}-url` as string: `${contentType}-content-markdown` as string;
    const actualContent = formData.get(targetedContent) as string;
    const part = formData.get('part') as string;
    const id = formData.get('id') as string;

    const parsedData = contentsSchema.safeParse({title, description, contentTypeId, categoryId, techId, actualContent, part });

    if(!parsedData.success){
      return{
        errors: parsedData.error.flatten().fieldErrors
      }
    }

    const supabase = await createClient();

     const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }
    const {data, error} = await supabase.from('contents').update({title, description, content_type_id:contentTypeId, category_id:categoryId, tech_id:techId, content: actualContent, part, created_by: user.id}).eq('id', id);

    if(error){
      return {success:false, message: error.message}
    }else{
      return {success:true, message: `${contentType} is updated successfully!`}
    }

  }catch(err){
     return {success:false, message: "Something went wrong!"}
  }

}