import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Home, LayoutDashboard } from "lucide-react";
import { BsPeople } from "react-icons/bs";

import ProfileBtn from "../clientComponents/profileBtn";
import FetchAdminActionsAndReturnCommonFormElementsWithContents from "./fetchAdminActionsAndReturnCommonFormElementsWithContents";

const AdminSidebar = () => {
  const headerSidebar = [
    {
      link: "/",
      text: "Home",
      icon: <Home />,
    },
    {
      link: "/dashboard/admin",
      text: "Overview",
      icon: <LayoutDashboard />,
    },

    {
      link: "/dashboard/user",
      text: "user Dashboard",
      icon: <BsPeople />,
    },
  ];
  return (
    <div>
      <Sidebar collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            {headerSidebar.map(({ link, icon, text }, index) => (
              <SidebarMenuItem key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <SidebarMenuButton asChild>
                      <Link href={link}>
                        {icon}
                        <span>{text}</span>
                      </Link>
                    </SidebarMenuButton>
                  </TooltipTrigger>
                  <TooltipContent side="right">{text}</TooltipContent>
                </Tooltip>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarHeader>
        <SidebarContent>
         <FetchAdminActionsAndReturnCommonFormElementsWithContents/>
        </SidebarContent>
       <ProfileBtn/>
      </Sidebar>
    </div>
  );
};

export default AdminSidebar;
