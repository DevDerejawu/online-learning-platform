
import PartsWithContents from "@/components/clientComponents/partsWithContents";
import { createClient } from "@/lib/supabase/server";
import { AlertTriangle} from "lucide-react";

const page = async ({
  params,
}: {
  params: {
    techId: string;
    categoryId: string;
    categoryName: string;
    title: string;
  };
}) => {
  

  interface Content {
    id: string;
    title: string;
    content_type_id: string;
    part: string;
    content: string;
    tech: {name:string};
    content_types: {name:string};
    categories:{name:string}

  }

  const organizedContents: Record<number, Record<string, Content>> = {};
  const coursesExpanded = [
    {
      title: "HTML",
      description:
        "HTML is the standard markup language used to structure web content. It defines the meaning and structure of elements such as headings, paragraphs, links, and images. Every webpage you see on the internet is built using HTML as its foundation. Understanding HTML is essential before moving to CSS or JavaScript.",
    },
    {
      title: "CSS",
      description:
        "CSS is the stylesheet language used to control the appearance of HTML content. It allows developers to design responsive and visually appealing layouts. CSS provides features like flexbox, grid, and animations to create modern UIs. Mastering CSS is crucial for creating user-friendly and professional web interfaces.",
    },
    {
      title: "JavaScript",
      description:
        "JavaScript is the core programming language for creating dynamic web experiences. It can manipulate the DOM, handle events, and communicate with servers. JavaScript enables interactive features like form validation, sliders, and live updates. Almost every modern web application relies heavily on JavaScript.",
    },
    {
      title: "Tailwind CSS",
      description:
        "Tailwind CSS is a utility-first CSS framework for rapid UI development. It provides low-level classes that can be composed to build custom designs quickly. Developers can avoid writing repetitive CSS while maintaining full control over styling. Tailwind is popular for its productivity and responsive design capabilities.",
    },
    {
      title: "Bootstrap",
      description:
        "Bootstrap is a responsive, mobile-first CSS framework. It comes with a set of pre-styled components like buttons, navbars, and modals. Bootstrap helps developers build consistent and modern UIs quickly. Its grid system simplifies layout design across different screen sizes.",
    },
    {
      title: "React",
      description:
        "React is a component-based UI library for building interactive user interfaces. It allows developers to create reusable components and manage state efficiently. React uses a virtual DOM for fast rendering and better performance. Understanding React is essential for modern frontend development.",
    },
    {
      title: "TypeScript",
      description:
        "TypeScript is a typed superset of JavaScript that adds static types. It helps developers catch errors at compile time and improves code maintainability. TypeScript is widely used in large-scale applications to reduce runtime bugs. It integrates seamlessly with React and Node.js projects.",
    },
    {
      title: "Next.js",
      description:
        "Next.js is a React framework for building production-ready applications. It provides features like server-side rendering, static site generation, and API routes. Next.js simplifies routing and optimizes performance automatically. Many modern web apps use Next.js for scalability and SEO.",
    },
    {
      title: "Node.js",
      description:
        "Node.js is a server-side JavaScript runtime built on Chrome's V8 engine. It allows developers to run JavaScript on the backend. Node.js is known for its non-blocking, event-driven architecture that handles many connections efficiently. It is commonly used for APIs, real-time apps, and server-side logic.",
    },
    {
      title: "Express.js",
      description:
        "Express.js is a minimal backend framework for building APIs and web servers. It provides routing, middleware, and utilities to simplify backend development. Express.js works seamlessly with Node.js and supports RESTful endpoints. It is ideal for building fast and lightweight server applications.",
    },
    {
      title: "MySQL",
      description:
        "MySQL is a relational database used for storing structured data. It supports tables, relationships, and SQL queries for efficient data management. MySQL is widely used in web applications to persist user data, content, and transactions. Understanding MySQL is key for backend development.",
    },
    {
      title: "Git",
      description:
        "Git is a distributed version control system that tracks changes in code. It allows multiple developers to collaborate efficiently on the same project. Git provides features like branching, merging, and history tracking. Learning Git is essential for professional software development.",
    },
    {
      title: "GitHub",
      description:
        "GitHub is a platform for hosting and collaborating on Git repositories. It provides tools for pull requests, issue tracking, and code review. GitHub facilitates teamwork and open-source contributions. Many developers rely on GitHub for version control and project management.",
    },
    {
      title: "ReCharts",
      description:
        "ReCharts is a composable charting library for React. It makes creating bar, line, pie, and area charts straightforward. Developers can customize charts using props and components for precise visualization. ReCharts simplifies displaying data in modern web applications.",
    },
    {
      title: "Supabase",
      description:
        "Supabase is an open-source Firebase alternative providing backend services. It includes database, authentication, and storage solutions. Supabase allows developers to quickly build modern applications with minimal setup. Its real-time features make it ideal for collaborative apps.",
    },
    {
      title: "Shadcn/ui",
      description:
        "Shadcn/ui is a modern, accessible component library built on Radix and Tailwind CSS. It provides reusable, customizable components for React apps. Developers can build responsive and polished UIs quickly. Shadcn/ui focuses on accessibility and composability.",
    },
    {
      title: "API",
      description:
        "An API allows different software systems to communicate and exchange data. APIs are the bridge between frontend and backend applications. They can be RESTful, GraphQL, or other types depending on design. Understanding APIs is essential for integrating services and enabling interactivity.",
    },
  ];

  const { title, techId } = await params;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from("contents")
    .select("id, content, title, part, content_type_id, content_types(name), categories(name), tech(name)")
    .eq("tech_id", techId)
    .order("part");

    if(error) return<p className="mt-20 text-2xl flex justify-center items-center md:mx-10 mx-2 bg-slate-700 text-red-400 p-3 rounded-lg">
  <AlertTriangle className="mr-3" size={40} fill="red" />{error.message}</p>

  function asContentArray(data: unknown): Content[] {
  return data as Content[];
}

const realData = asContentArray(data);
for(const item of realData){
  const type = item.content_types.name;
  const part = Number(item.part);
  if(!organizedContents[part]){
    organizedContents[part]={};
  }
  organizedContents[part][type]=item;
}

    if(!realData || realData.length===0){
      const filteredDescription = coursesExpanded.filter((item)=>item.title.toLowerCase() === title.toLowerCase());
       return <div className="m-6">
       <p className="text-2xl bg-slate-200 text-slate-700 p-5 rounded-lg">{filteredDescription[0]?.description}</p>
       <p className="mt-20 text-2xl flex justify-center items-center md:mx-10 mx-2 bg-slate-700 text-slate-200 p-3 rounded-lg">
  <AlertTriangle className="mr-3" size={40} fill="red" />
  Currently, this course is under development. Thank you for visiting! We will make it available soon.
</p>
       </div>
      }


    const filteredDescription = coursesExpanded.filter((item)=>item.title.toLowerCase() === realData[0].tech.name.toLowerCase());

  const organizedObjectOfArray = Object.entries(organizedContents);
  return (
      <div className="md:mx-10 mx-2">
        
          <div className="ml-6 m-1">
       <h1 className="text-blue-500 text-3xl text-center">
        Welcome to {realData[0]?.categories.name.toLowerCase()} course specifically for {realData[0]?.tech.name} concepts
      </h1>
      <p className="text-2xl bg-slate-200 text-slate-700 p-5 rounded-lg mt-2">{filteredDescription[0].description}</p>
    </div>
    <h2 className="text-center text-2xl text-green-500 m-3 underline">Current state of {realData[0].tech.name} contains {organizedObjectOfArray.length} part(s)</h2>


        <PartsWithContents organizedContents={organizedContents}/>
      </div>

  );
};

export default page;
