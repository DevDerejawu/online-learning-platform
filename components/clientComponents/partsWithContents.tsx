"use client";
//this submitted data
/*CREATE TABLE submitted_project_note_exercise (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    content_id UUID NOT NULL REFERENCES contents(id) ON DELETE CASCADE,
    submitted_by UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    submitted_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);*/
import ReactMarkdown from "react-markdown";

import { AlertCircle, ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

interface Content {
  id: string;
  title: string;
  content_type_id: string;
  part: string;
  content: string;
  tech: { name: string };
  content_types: { name: string };
  categories: { name: string };
}
type organizedContents = Record<number, Record<string, Content>>;
interface SubmittedContentsType {
  id:string;
  contents:{
    id:string;
    content_types: string;
  }
}



const PartsWithContents = ({
  organizedContents,
}: {
  organizedContents: organizedContents;
}) => {
  const [refresh, setRefresh] = useState<boolean>(false);
  const router = useRouter();
  const supabase = createClient()
    
      supabase.auth.getSession().then(({ data }) => {
        if (!data?.session) {
          router.replace("/login");
        }
      }).catch(()=>{
        router.replace("/login");
      });
  const organizedObjectOfArray = Object.entries(organizedContents);
  console.log("ooooooooooooooData",organizedObjectOfArray)
  const [submittedContents, setSubmittedContents] = useState<SubmittedContentsType[] | null>(null);
  const [openDialog, setOpenDialog] = useState<boolean>(false);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  
  const [togglePart, setTogglePart] = useState<number | null>(null);
  const [toggleType, setToggleType] = useState<string | null>(null);

  const togglePartFun = (value: number) => {
    setTogglePart((pre) => (pre === value ? null : value));
  };
  const toggleTypeFun = (value: string) => {
    setToggleType((pre) => (pre === value ? null : value));
  };

  async function submit(contentId: string) {
    try {
      setLoading(true);
      const res = await fetch("/api/contents/submit", {
        method: "POST",
        body: JSON.stringify({
          contentId,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setIsSuccess(true);
        setRefresh(pre=>!pre)
      } else {
        setIsSuccess(false);
      }
      setMessage(data.message);
    } catch (err) {
      setIsSuccess(false);
      setMessage("Something went wrong!");
    } finally {
      setLoading(false);
      setTimeout(()=>{
        setMessage("");
      }, 1000);
       setTimeout(()=>{
        setOpenDialog(false);
      }, 1300);
    }
  }

function fetchSubmittedContents(){
   fetch('/api/contents/submittedContents').then(res=> res.json()).then(data=>{
    if(data.success){
      setSubmittedContents(data.data)
    }else{
      console.log(data.message);
    }
  }).catch(err=>{
    console.log(err);
  })
}
useEffect(()=>{
  fetchSubmittedContents()
}, [refresh]);

const submittedContentIds = new Set(submittedContents?.map(({contents:{id}})=>id));
function isTypeDone(contentId:string){
  return submittedContentIds.has(contentId);
}
function isPartDone (part:number){
  const checkIds:number[] = [];
  const typeIdsByPart = organizedObjectOfArray.filter(([par, item])=>Number(par) === part).flatMap(([_, item])=>Object.values(item)).filter(content=>content.content_types.name.toLowerCase() !== "video").map(content=>content.id);

  typeIdsByPart.forEach(id=>{
    if(submittedContentIds.has(id)){
      checkIds.push(1)
    }else{
      checkIds.push(0);
    }
  })
  if(checkIds.some(value=> value===0) || typeIdsByPart.length<3){
    return false;
  }else{
    return true;
  }
}
  return (
    <>
      {organizedObjectOfArray.map(([part, contents]) => (
        <div key={part} className="mb-4">
          {/* Part Header */}
          <div
            className="flex justify-between items-center bg-gray-500 p-4 w-full cursor-pointer mx-auto rounded-lg shadow-md"
            onClick={() => togglePartFun(Number(part))}
          >
            <div className="flex items-center">
              <input type="checkbox" id={part} className="w-6 h-6 mr-2" disabled={true} checked={isPartDone(Number(part))}/>
              <label
                htmlFor={part}
                className="text-lg md:text-xl font-semibold"
              >
                Part {part}
              </label>
            </div>
            <ChevronDown
              size={30}
              className={`transition-transform duration-600 ${togglePart === Number(part) ? "rotate-180" : ""}`}
            />
          </div>

          {/* Part Content */}
          {togglePart === Number(part) && (
            <div className="mt-2">
              {Object.entries(contents).map(([type, item]) => (
                <div key={type} className="md:mx-10">
                  {/* Type Header */}
                  <div
                    className="flex justify-between items-center cursor-pointer bg-blue-400 p-2 rounded-lg w-full my-2 md:my-3 shadow-sm"
                    onClick={() => toggleTypeFun(type)}
                  >
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id={type}
                        className="w-5 h-5 mr-2"
                        disabled={true}
                        checked={item.content_types.name.toLowerCase() === 'video' || isTypeDone(item.id)}
                      />
                      <label
                        htmlFor={type}
                        className="text-base md:text-xl font-medium"
                      >
                        {type}
                      </label>
                    </div>
                    <ChevronDown
                      size={30}
                      className={`transition-transform duration-600 ${togglePart === Number(part) && toggleType?.toLowerCase() === type.toLowerCase() ? "rotate-180" : ""}`}
                    />
                  </div>

                  {/* Type Content */}
                  {togglePart === Number(part) &&
                    toggleType?.toLowerCase() === type.toLowerCase() && (
                      <div className="m-2 md:m-4">
                        <p className="text-base md:text-xl text-center mb-4 md:mb-5 font-semibold">
                          Title: {item.title}
                        </p>

                        {type.toLowerCase() === "video" ? (
                          <a
                            href={item.content}
                            className="block text-center text-sm md:text-base bg-blue-700 hover:bg-blue-600 text-white rounded px-4 py-3 max-w-[280px] md:max-w-[300px] mx-auto my-2 md:my-5 transition-colors duration-200"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Click here to see it on YouTube
                          </a>
                        ) : (
                          <article className="mx-auto w-full md:max-w-3xl bg-gray-500 prose prose-sm md:prose-lg overflow-auto max-h-[99vh] p-2 md:p-4 rounded-lg shadow-sm">
                            <ReactMarkdown>{item.content}</ReactMarkdown>
                            {!isTypeDone(item.id) &&<div className="flex gap-3">
                              <AlertCircle size={30} fill="red" />
                               <p className="text-xl text-red-400">
                                Before Submitting, make sure you are done!{" "}
                              </p>
                            </div>}
                            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
                              <DialogTrigger className="bg-green-600 py-2 rounded hover:bg-green-500 mx-auto mt-3 block min-w-[300px] cursor-pointer duration-900 disabled:cursor-not-allowed" disabled={isTypeDone(item.id)}>
                                {isTypeDone(item.id)? "✅ 🎉🎉🎉 Alrady submitted 🚀": `Proceed to submit the ${type.toLowerCase()} as done` }
                              </DialogTrigger>

                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>
                                    Are you absolutely sure?
                                  </DialogTitle>
                                  <DialogDescription>
                                    Make sure you have done it before
                                    submitting! Please don't lie to yourself!
                                  </DialogDescription>
                                </DialogHeader>

                                <DialogFooter className="flex justif-between gap-3">
                                  <Button
                                    onClick={() => submit(item.id)}
                                    disabled={loading}
                                    className="bg-green-600 hover:bg-green-500 cursor-pointer"
                                  >
                                    {loading
                                      ? "Submitting..."
                                      : `Submit ${type}`}
                                  </Button>
                                  <DialogClose
                                    disabled={loading}
                                    className="hover:bg-red-500 px-2 rounded cursor-pointer bg-red-600"
                                  >
                                    {loading ? "Can't cancel" : "Cancel"}
                                  </DialogClose>
                                </DialogFooter>
                                <p className={`${isSuccess? "text-green-500": "text-red-400"} text-xl m-3`}>{message}</p>
                              </DialogContent>
                            </Dialog>
                          </article>
                        )}
                      </div>
                    )}
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </>
  );
};
export default PartsWithContents;
