
import { optionType } from "@/app/customTypes/types";
import TechLists from "@/components/clientComponents/techLists";
import { createClient } from "@/lib/supabase/server";
import { BarChart, Box, Database, Layout, Monitor, Server } from "lucide-react";

import { AiOutlineApi } from "react-icons/ai";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTailwindcss,
  SiBootstrap,
  SiReact,
  SiTypescript,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiGit,
  SiGithub,
} from "react-icons/si";

interface CategoryPageProps {
  params: {
    categoryName: string;
    categoryId: string;
  };
}

const Courses = async ({ params }: CategoryPageProps) => {
  
  const { categoryName, categoryId } = await params;
  let targetedCourses;
  let targetedCourseIntro;
  let targetedCourseIcon;
  let targetedHeaderText;

  if (!params) return <p>Params is falsy</p>;
  
  if (!categoryId || !categoryName)
    return (
      <p className="text-center text-red-500">
        Category id or Category name are falsey value
      </p>
    );

  const supabase = await createClient();
  const { data: techs, error } = await supabase
    .from("tech")
    .select("id, name")
    .eq("category_id", categoryId);

  if (error) {
    return <p className="text-red-500 text-center">{error.message}</p>;
  }

  if (!techs || techs.length === 0) {
    return (
      <p className="text-red-500 text-center">
        No techs found for this category.
      </p>
    );
  }

  //this corses array of object is used to extract icon and description.
  const courses = [
    {
      title: "HTML",
      description: "The standard markup language for structuring web content.",
      icon: <SiHtml5 size={45} className="text-orange-500" />,
      category: "frontend",
    },
    {
      title: "CSS",
      description:
        "Stylesheet language used to design responsive and modern UIs.",
      icon: <SiCss3 size={45} className="text-blue-500" />,
      category: "frontend",
    },
    {
      title: "JavaScript",
      description: "Core (backbone) language for dynamic web experiences.",
      icon: <SiJavascript size={45} className="text-yellow-400" />,
      category: "frontend",
    },
    {
      title: "Tailwind CSS",
      description: "Utility-first CSS framework for rapid UI development.",
      icon: <SiTailwindcss size={45} className="text-sky-400" />,
      category: "frontend",
    },
    {
      title: "Bootstrap",
      description: "Responsive, mobile-first CSS framework.",
      icon: <SiBootstrap size={45} className="text-purple-500" />,
      category: "frontend",
    },
    {
      title: "React",
      description: "Component-based UI library.",
      icon: <SiReact size={45} className="text-cyan-400" />,
      category: "frontend",
    },
    {
      title: "TypeScript",
      description: "Typed JavaScript for scalable apps.",
      icon: <SiTypescript size={45} className="text-blue-600" />,
      category: "frontend",
    },
    {
      title: "Next.js",
      description: "React framework for production applications.",
      icon: <SiNextdotjs size={45} className="text-white" />,
      category: "frontend",
    },
    {
      title: "Node.js",
      description: "Server-side JavaScript runtime.",
      icon: <SiNodedotjs size={45} className="text-green-500" />,
      category: "backend",
    },
    {
      title: "Express.js",
      description: "Minimal backend framework for APIs.",
      icon: <SiExpress size={45} className="text-gray-300" />,
      category: "backend",
    },
    {
      title: "MySQL",
      description: "Relational database for structured data.",
      icon: <SiMysql size={45} className="text-blue-400" />,
      category: "database",
    },
    {
      title: "Git",
      description: "Distributed version control system.",
      icon: <SiGit size={45} className="text-orange-600" />,
      category: "frontend",
    },
    {
      title: "GitHub",
      description:
        "Platform for hosting and collaborating on Git repositories.",
      icon: <SiGithub className="text-white" />,
      category: "frontend",
    },
    {
      title: "ReCharts",
      description:
        "A composable charting library for React, ideal for data visualization like bar, line, and pie charts.",
      icon: <BarChart size={45} className="text-white" />,
      category: "frontend",
    },
    {
      title: "Supabase",
      description:
        "An open-source Firebase alternative providing database, authentication, and storage for modern apps.",
      icon: <Database size={45} className="text-white" />,
      category: "database",
    },
    {
      title: "Shadcn/ui",
      description:
        "A modern, accessible, and composable component library built on Radix and Tailwind CSS, ideal for building React UIs quickly.",
      icon: <Layout size={45} className="text-white" />,
      category: "frontend",
    },
    {
      title: "API",
      description:
        "The API integration icon typically features a plug or a series of connected nodes, symbolizing the seamless bridge and data exchange between two distinct software systems.",
      icon: <AiOutlineApi size={45} className="text-white" />,
      category: "API",
    },
  ];

  if (categoryName === "Frontend") {
    const byCategory = courses.filter(
      (object) => object.category === "frontend",
    );
    const filteredDescAndIcon = Object.fromEntries(
      byCategory.map((item) => [
        item.title.toLowerCase(),
        { description: item.description, icon: item.icon },
      ]),
    );

    targetedCourses = techs.map((item) => ({
      id: item.id,
      title: item.name,
      description: filteredDescAndIcon[item.name.toLowerCase()].description,
      icon: filteredDescAndIcon[item.name.toLowerCase()].icon,
    }));

    targetedCourseIntro = `The frontend is the visual and interactive  layer where users engage directly with the application. Built with HTML, CSS, and JavaScript frameworks, it focuses on responsiveness, accessibility, and a smooth user experience across all devices. This 'client-side' layer transforms abstract data into a beautiful, functional interface.`;
    targetedCourseIcon = <Monitor size={50} />;
    targetedHeaderText = "Frontend (The Interface)";
  } else if (categoryName === "Backend") {
    const byCategory = courses.filter(
      (object) => object.category === "backend",
    );

    const filteredDescAndIcon = Object.fromEntries(
      byCategory.map((item) => [
        item.title.toLowerCase(),
        { description: item.description, icon: item.icon },
      ]),
    );

    targetedCourses = techs.map((item) => ({
      id: item.id,
      title: item.name,
      description: filteredDescAndIcon[item.name.toLowerCase()].description,
      icon: filteredDescAndIcon[item.name.toLowerCase()].icon,
    }));
    targetedCourseIntro =
      "Operating behind the scenes, the backend handles the server-side logic, authentication, and data validation. It processes requests from the frontend and communicates with the database to ensure the application’s 'brains' are functioning correctly. It acts as the secure gatekeeper that maintains the integrity and performance of the overall system.";
    targetedCourseIcon = <Server size={50} />;
    targetedHeaderText = "Backend (The Logic)";
  } else if (categoryName === "Database") {
    const byCategory = courses.filter(
      (object) => object.category === "database",
    );
    const filteredDescAndIcon = Object.fromEntries(
      byCategory.map((item) => [
        item.title.toLowerCase(),
        { description: item.description, icon: item.icon },
      ]),
    );

    targetedCourses = techs.map((item) => ({
      id: item.id,
      title: item.name,
      description: filteredDescAndIcon[item.name.toLowerCase()].description,
      icon: filteredDescAndIcon[item.name.toLowerCase()].icon,
    }));
    targetedCourseIntro =
      'The database serves as the persistent storage layer where all critical application data is organized and secured. It manages complex relationships between entities, ensuring that information is retrieved quickly and accurately via optimized queries. Whether using SQL for structure or NoSQL for flexibility, it acts as the "single source of truth" for the entire system.';
    targetedCourseIcon = <Database size={50} />;
    targetedHeaderText = "Database (The Memory)";
  } else if (categoryName === "API") {
    const byCategory = courses.filter((object) => object.category === "API");
    const filteredDescAndIcon = Object.fromEntries(
      byCategory.map((item) => [
        item.title.toLowerCase(),
        { description: item.description, icon: item.icon },
      ]),
    );

    targetedCourses = techs.map((item) => ({
      id: item.id,
      title: item.name,
      description: filteredDescAndIcon[item.name.toLowerCase()].description,
      icon: filteredDescAndIcon[item.name.toLowerCase()].icon,
    }));
    targetedCourseIcon =
      "API integration allows different software systems to communicate and share data seamlessly. It acts as a digital bridge, enabling the frontend to fetch real-time updates from the backend or connect with third-party services like payment gateways and maps. These 'Application Programming Interfaces' are essential for modularity and expanding the app's functionality without reinventing the wheel.";
    targetedCourseIcon = <Box size={50} />;
    targetedHeaderText = "API Integration (The Connector)";
  } else {
    return <p className="text-center text-red-600">Unknown category!!!</p>;
  }

  if (!targetedCourseIntro) return;

  return (
   
    
    <TechLists
    categoryName={categoryName}
    categoryId={categoryId}
      targetedCourseIcon={targetedCourseIcon}
      targetedHeaderText={targetedHeaderText}
      targetedCourseIntro={targetedCourseIntro}
      targetedCourses={targetedCourses}
    />
    
  );
};

export default Courses;
