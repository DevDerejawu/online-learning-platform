"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { IconType } from "react-icons";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Box, ChevronDown, Database, Home, LayoutDashboard, Monitor, Server } from "lucide-react";

import ProfileBtn from "./profileBtn";
import { optionType } from "@/app/customTypes/types";
import { useRouter } from "next/navigation";

type courseType = {
  title: string;
  link: string;
  Icon: IconType;
};


const courses = [
  { title: "Frontend", Icon: Monitor },
  { title: "Backend", Icon: Server },
  { title: "Database", Icon: Database },
  { title: "API", Icon: Box },
];
const staticCourseAdditionalInfo: Record<string, IconType> = Object.fromEntries(
  courses.map((course) => [course.title, course.Icon])
);

const SidebarWithShadcn = () => {
  
  const [isRedirecting, setIsredirecting] = useState<string | null>(null);
  const [isActive, setIsActive] = useState<string | null>(null);

  
  

  function makeDisableWhenAbuttonIsClicked(link: string){
    setIsredirecting(pre=>pre === link? null: link);
    setTimeout(()=>{
      setIsredirecting(null);
    }, 2000)
    setIsActive(pre=>pre === link? null: link);
    
  }
  const router = useRouter();
  const [openCourses, setOpenCourses] = useState(true);
  const [categories, setCategories] = useState<optionType[] | null>(null);

  // Fetch categories from server
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/contents/categoryType");
        const data = await res.json();
        if (data.success) setCategories(data.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  

  // Build courses with safe icon handling
  const realCourses: courseType[] | undefined= categories?.map((category) => ({
    title: `${category.name} course`,
    Icon: staticCourseAdditionalInfo[category.name] || Box, 
    link: `/dashboard/user/courses/${category.name}/${category.id}`,
  }));

  return (
    <Sidebar collapsible="icon">
      {categories? <>
      {/* Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarMenuButton asChild>
                  <Link href="/">
                    <Home /> Home
                  </Link>
                </SidebarMenuButton>
              </TooltipTrigger>
              <TooltipContent>Home</TooltipContent>
            </Tooltip>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/user">
                    <LayoutDashboard /> <span>Overview</span>
                  </Link>
                </SidebarMenuButton>
              </TooltipTrigger>
              <TooltipContent>Overview</TooltipContent>
            </Tooltip>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarMenuButton asChild>
                  <Link href="/dashboard/admin">
                    <LayoutDashboard /> <span>Adimn Pannel</span>
                  </Link>
                </SidebarMenuButton>
              </TooltipTrigger>
              <TooltipContent>Adimn Pannel</TooltipContent>
            </Tooltip>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Content */}
      <SidebarContent>
        <Collapsible open={openCourses} onOpenChange={setOpenCourses}>
          <SidebarMenu>
            <CollapsibleTrigger className="flex w-full items-center justify-between cursor-pointer">
              <span className="text-[15px]">Courses</span>
              <ChevronDown
                className={`transition-transform ${openCourses ? "rotate-180" : ""}`}
              />
            </CollapsibleTrigger>
            <CollapsibleContent>
              <SidebarMenu>
                {realCourses?.map(({ title, link, Icon }) => (
                  <SidebarMenuItem key={title + link}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <SidebarMenuButton asChild>
                          <Link href={link} onClick={()=>makeDisableWhenAbuttonIsClicked(link)
                            } className={`${isRedirecting === link? "opacit-60 text-blue-500  disabled:cursor-not-allowed": ""} ${isActive === link? "text-blue-500 bg-green-500": ""}`}>
                            <Icon /> <span>{isRedirecting === link? "redirecting...": title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </TooltipTrigger>
                      <TooltipContent side="right">{title}</TooltipContent>
                    </Tooltip>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </CollapsibleContent>
          </SidebarMenu>
        </Collapsible>
      </SidebarContent>

      {/* Footer */}
      <ProfileBtn />
      </>:<p>Loading...</p>
              }
    </Sidebar>
  );
};

export default SidebarWithShadcn;