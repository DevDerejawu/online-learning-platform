"use client"
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "../ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LogOut, Settings, User } from "lucide-react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const ProfileBtn = () => {
  const supabase = createClient();
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout error:", error.message);
    } else {
      // redirect to login page after logout
      router.replace("/login");
    }
  };
  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <Tooltip>
            <DropdownMenu>
              <TooltipTrigger asChild>
                <DropdownMenuTrigger asChild>
                  <SidebarMenuButton className="flex items-center gap-2 cursor-pointer">
                    <User className="w-5 h-5" />
                    <span>Profile</span>
                  </SidebarMenuButton>
                </DropdownMenuTrigger>
              </TooltipTrigger>
              <TooltipContent side="right">Prifile</TooltipContent>

              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <a className="cursor-not-allowed">
                    <Settings />
                    <span>Settings</span>
                  </a>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>

                  <a className="cursor-pointer text-red-600" onClick={()=>handleLogout()}>
                    <LogOut />
                    <span >Log out</span>
                  </a>
                  
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </Tooltip>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarFooter>
  );
};

export default ProfileBtn;
