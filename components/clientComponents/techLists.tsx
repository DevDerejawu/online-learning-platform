"use client"
import { ChevronDown } from 'lucide-react';
import { ReactElement, useState } from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
type objProp = {
  id:string;
  title:string;
  description?:string;
  icon:ReactElement
}
type props = {
  targetedCourseIcon:ReactElement;
  targetedHeaderText:string;
  targetedCourseIntro:string;
  targetedCourses:objProp[]; 
  categoryId: string;
  categoryName: string

}

const TechLists = ({targetedCourseIcon, targetedHeaderText, categoryName, categoryId, targetedCourseIntro, targetedCourses}:props) => {

  const [isRedirecting, setIsRedirecting] = useState<boolean>(false);
  function handleRedirecting (){
    setIsRedirecting(true);
  }

  const router = useRouter();
const supabase = createClient()
  
    supabase.auth.getSession().then(({ data }) => {
      if (!data?.session) {
        router.replace("/login");
      }
    }).catch(()=>{
      router.replace("/login");
    });
  const [openTechById, setOpenTechById] = useState<string | null>(null);
  function toggleTech(id:string){
    setOpenTechById(pre=> pre === id? null: id);
}
  return (
<div className="bg-slate-500 w-full min-h-screen">
    
      <div className="w-[90%] mx-auto py-4">
        <div className="flex border-3">
          {targetedCourseIcon}
          <h1 className="text-2xl text-center text-orange-500">
            {targetedHeaderText}
          </h1>
        </div>

        <p className="text-xl line-h-1 text-center my-3 ">
          {targetedCourseIntro}
        </p>

        {targetedCourses.map(({ title, icon, id, description }) => (
        <div key={id}>
          <div
            onClick={()=>toggleTech(id)}
            className="flex cursor-pointer mb-2 border-2 rounded-sm items-center text-4xl"
          >
            {icon}
            <p className="flex-1 bg-red-200 lg:p-5 p-3 duration-1500  hover:bg-slate-400">
              {title}
              
            </p>
            <ChevronDown size={30} className={openTechById === id? "rotate-180 transition-duration-2":"" }/>
          </div>
          {openTechById === id &&
         <div className="p-4 bg-gray-900 text-base rounded-lg mb-7">
          <p className="mb-5 text-[25px] text-center font-bold">{`${title} is ${description}`}</p>
          <Link href={`/dashboard/user/courses/${categoryName}/${categoryId}/${title}/${id}`} onClick={handleRedirecting}>
          <Button className={`block mx-auto ${
            isRedirecting
              ? "bg-green-600 cursor-not-allowed opacity-50"
              : "bg-green-600 hover:bg-green-500 cursor-pointer"
          }`}> {isRedirecting ? `Redirecting...` : `Go to ${title} details page`}</Button></Link>
          </div>}
        </div>
        ))}
      </div>
    </div>
  )
}

export default TechLists