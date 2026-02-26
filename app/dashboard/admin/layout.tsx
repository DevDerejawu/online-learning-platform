import AdminSidebar from "@/components/serverComponents/adminSidebar"
import DashboardNavbar from "@/components/clientComponents/dashboardNavbar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { ReactNode } from "react"
import { ContentFormTypeProvider } from "@/app/contexts/contentFormRelatedContext"
import { createClient } from "@/lib/supabase/server"

const AdminLayout = async ({children}:{children:ReactNode}) => {
  const supabase = await createClient();
  const { data: { user }, error } = await supabase.auth.getUser();
  let name, role;
  if(user){
    name = user?.user_metadata?.full_name;
    role = user?.user_metadata?.role;
  }
  return (
    <ContentFormTypeProvider>
      <SidebarProvider>
        <DashboardNavbar/>
        <AdminSidebar/>
        <section className="w-full">
        <h1 className="text-center text-xl pt-[40px] bg-green-700">Wellcom, {`${name} ${role}`}</h1>
        {children}
      </section>
      </SidebarProvider>
  </ContentFormTypeProvider>
    
  )
}

export default AdminLayout