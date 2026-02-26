"use client";
import { motion, useAnimation } from "framer-motion";
import { BarChart, Database, Layout } from "lucide-react";
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


const Courses = () => {
 const cards = [
    {
      title: "HTML",
      description: "The standard markup language for structuring web content.",
      icon: <SiHtml5 size={36} className="text-orange-500" />,
    },
    {
      title: "CSS",
      description: "Stylesheet language used to design responsive and modern UIs.",
      icon: <SiCss3 size={36} className="text-blue-500" />,
    },
    {
      title: "JavaScript",
      description: "Core (backbone) language for dynamic web experiences.",
      icon: <SiJavascript size={36} className="text-yellow-400" />,
    },
    {
      title: "Tailwind CSS",
      description: "Utility-first CSS framework for rapid UI development.",
      icon: <SiTailwindcss size={36} className="text-sky-400" />,
    },
    {
      title: "Bootstrap",
      description: "Responsive, mobile-first CSS framework.",
      icon: <SiBootstrap size={36} className="text-purple-500" />,
    },
    {
      title: "React",
      description: "Component-based UI library.",
      icon: <SiReact size={36} className="text-cyan-400" />,
    },
    {
      title: "TypeScript",
      description: "Typed JavaScript for scalable apps.",
      icon: <SiTypescript size={36} className="text-blue-600" />,
    },
    {
      title: "Next.js",
      description: "React framework for production applications.",
      icon: <SiNextdotjs size={36} className="text-white" />,
    },
    {
      title: "Node.js",
      description: "Server-side JavaScript runtime.",
      icon: <SiNodedotjs size={36} className="text-green-500" />,
    },
    {
      title: "Express.js",
      description: "Minimal backend framework for APIs.",
      icon: <SiExpress size={36} className="text-gray-300" />,
    },
    {
      title: "MySQL",
      description: "Relational database for structured data.",
      icon: <SiMysql size={36} className="text-blue-400" />,
    },
    {
      title: "Git",
      description: "Distributed version control system.",
      icon: <SiGit size={36} className="text-orange-600" />,
    },
    {
      title: "GitHub",
      description: "Platform for hosting and collaborating on Git repositories.",
      icon: <SiGithub size={36} className="text-white" />,
    },
     {
    title: "ReCharts",
    description: "A composable charting library for React, ideal for data visualization like bar, line, and pie charts.",
    icon: <BarChart size={36} className="text-white" />,
  },
  {
    title: "Supabase",
    description: "An open-source Firebase alternative providing database, authentication, and storage for modern apps.",
    icon: <Database size={36} className="text-white" />,
  },
  {
  title: "Shadcn/ui",
  description: "A modern, accessible, and composable component library built on Radix and Tailwind CSS, ideal for building React UIs quickly.",
  icon: <Layout size={36} className="text-white" />,
}
  ];


  const duplicatedCards = [...cards, ...cards];

  const controls = useAnimation();

  return (
    <div className="m-10 mt-20" id="courses">
      <motion.h2 
      initial={{y:200, opacity:0}}
      whileInView={{y:0, opacity:1}}
      transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }} 
      viewport={{once:true}} className="text-3xl md:text-5xl text-center text-blue-500 mb-10 mt-10 mb-3">Technologies you will learn!</motion.h2>

      <motion.p initial={{y:200, opacity:0}}
      whileInView={{y:0, opacity:1}}
      transition={{ type: "spring", stiffness: 320, damping: 70, mass: 1 }} 
      viewport={{once:true}} className="text-center text-xl md:text-2xl mb-10">Master the core technologies used in modern full-stack development, from frontend interfaces to backend systems and databases.
</motion.p>
      <div className="overflow-hidden w-full">
      <motion.div
        className="flex gap-6 w-max"
        
        animate={controls}
        transition={{
          duration: 100,
          repeat: Infinity,
          ease: "linear",
        }}

        
        
        onMouseLeave={()=> controls.start({x:["0%", "-50%"]})}
         onMouseEnter={() =>controls.start({ x: ["-50%", "0%"] })
  }

      >
        {duplicatedCards.map((card, i) => (
          <div
            key={i}
            className="w-64 shrink-0 rounded-xl border border-slate-800 bg-slate-900 p-5 text-center"
          >
            <div className="mx-auto mb-3 text-indigo-400">{card.icon}</div>
            <h3 className="text-lg font-semibold text-white">{card.title}</h3>
            <p className="mt-2 text-sm text-slate-400">{card.description}</p>
          </div>
        ))}
      </motion.div>
    </div>
    </div>
  );
};

export default Courses;
