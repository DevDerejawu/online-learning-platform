"use client"
import { optionType, typeForFilteredContentsToBuildTable } from "@/app/customTypes/types";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import ContentTable from "./contentTable";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
const Filtering = () => {
  const router= useRouter()
  const supabase = createClient();
  supabase.auth.getSession().then(({data})=>{
    console.log("sessionnnnnnnnn", data.session)
    if (!data.session){
     return router.replace('/');
    }else{
      const role = data.session.user?.user_metadata?.role;
      if(role !== "admin"){
        router.replace("/dashboard/user");
      }
    }
  }).catch((er)=>{
    router.replace("/");
  })
 const [types, setTypes] = useState<optionType[] | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [categories, setCategories] = useState<optionType[] | null>(null);
  
  const [techs, setTechs] = useState<optionType[] | null>(null);
  
  const [filteredContents, setFilteredContents] = useState<typeForFilteredContentsToBuildTable>(null);

  const [openDropdown, setOpenDropdown] = useState<null | string>(null);

  function toggleDropdown(name: string) {
    setOpenDropdown((prev) => (prev === name ? null : name));
  }
  //fetch contents

async function fetchByTypeId(id: string) {
  const res = await fetch(`/api/contents/dynamicContentFiltering?type=${id}`);
  const result = await res.json();
  if (result.success) setFilteredContents(result.data);
}

async function fetchByTechId(id:string){
const res = await fetch(`/api/contents/dynamicContentFiltering?tech=${id}`);
  const result = await res.json();
  if (result.success) setFilteredContents(result.data);
}

async function fetchByCategoryId(id:string){
const res = await fetch(`/api/contents/dynamicContentFiltering?category=${id}`);
  const result = await res.json();
  if (result.success) setFilteredContents(result.data);
}


  //fetch types
  async function fetchTypes(){
    const res = await fetch('/api/contents/contentType');
    const fetchedData = await res.json();
    if(fetchedData.success){
      setTypes(fetchedData.data);
    }else{
      setMessage(fetchedData.message);
    }
  }
  
  //fetch categories
  async function fetchCategories(){
    const res = await fetch('/api/contents/categoryType');
    const fetchedData = await res.json();
    if(fetchedData.success){
      setCategories(fetchedData.data);
    }else{
      setMessage(fetchedData.message);
    }
  }

  
  //fetch techs
  async function fetchTechs(){
    const res = await fetch('/api/contents/techType');
    const fetchedData = await res.json();
    if(fetchedData.success){
      setTechs(fetchedData.data);
    }else{
      setMessage(fetchedData.message);
    }
  }
  async function fetchAll(){
const res = await fetch('/api/contents/dynamicContentFiltering');
  const result = await res.json();
  if (result.success) setFilteredContents(result.data);
}
  useEffect(()=>{
    (async () => {
    await fetchTypes();
    await fetchCategories();
    await fetchTechs();
    await fetchAll();
  })();
  }, []);

  if(!types || !categories || !techs ){
    return<p>Loading...</p>
  }
  console.log("filteredContents" ,filteredContents);
  return (
    <>
    <div className="flex space-x-4 p-4 relative ">
      {/* Filter label */}
      <Button className="bg-gray-800 cursor-pointer text-white font-semibold hover:bg-gray-700">
        Filter by
      </Button>

      {/* Type Filter */}

      <Button className="cursor-pointer bg-gray-800 text-white font-semibold hover:bg-gray-700" onClick={()=>{fetchAll(); setOpenDropdown(null)}}>
        All
      </Button>
      <div className="relative">
        <button
          onClick={() => toggleDropdown("type")}
          className={`px-4 py-2 cursor-pointer rounded-md font-medium text-white ${
            openDropdown === "type" ? "bg-green-700" : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          Type
        </button>

        {openDropdown === "type" && (
          <ul className="absolute top-full left-0 mt-1 bg-white text-black rounded-md shadow-lg min-w-[150px] ">
            {types.map((type) => (
              <li
                key={type.id}
                onClick={() => {
                  fetchByTypeId(type.id);
                  setOpenDropdown(null);
                }}
                className="cursor-pointer px-4 py-2 hover:bg-gray-200"
              >
                {type.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Tech Filter */}
      <div className="relative">
        <button
          onClick={() => toggleDropdown("tech")}
          className={`px-4 py-2 cursor-pointer rounded-md font-medium text-white ${
            openDropdown === "tech" ? "bg-green-700" : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          Tech
        </button>

        {openDropdown === "tech" && (
          <ul className="absolute top-full left-0 mt-1 bg-white text-black rounded-md shadow-lg min-w-[150px] overflow-y-auto max-h-[300px]">
            {techs.map((tech) => (
              <li
                key={tech.id}
                onClick={() => {
                  fetchByTechId(tech.id);
                  setOpenDropdown(null);
                }}
                className="cursor-pointer px-4 py-2 hover:bg-gray-200"
              >
                {tech.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Category Filter */}
      <div className="relative">
        <button
          onClick={() => toggleDropdown("category")}
          className={`px-4 cursor-pointer py-2 rounded-md font-medium text-white ${
            openDropdown === "category" ? "bg-green-700" : "bg-gray-800 hover:bg-gray-700"
          }`}
        >
          Category
        </button>

        {openDropdown === "category" && (
          <ul className="absolute top-full left-0 mt-1 bg-white text-black rounded-md shadow-lg min-w-[150px] overflow-hidden z-20">
            {categories.map((category) => (
              <li
                key={category.id}
                onClick={() => {
                  fetchByCategoryId(category.id);
                  setOpenDropdown(null);
                }}
                className="cursor-pointer px-4 py-2 hover:bg-gray-200"
              >
                {category.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>

    <p>{message}</p>

    {/*tables here*/}
    <ContentTable filteredContents={filteredContents}/>
  </>
  );
}

export default Filtering