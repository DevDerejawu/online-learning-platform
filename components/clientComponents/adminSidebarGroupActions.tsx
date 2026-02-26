"use client"
import { useEffect, useState } from "react";
import {
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupLabel,
} from "../ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Plus } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "../ui/dialog";
import { adminActionProps, optionType } from "@/app/customTypes/types";
import CommonFormElementForContents from "../serverComponents/commonFormElementForContents";
import { useFormTypeId } from "@/app/contexts/contentFormRelatedContext";


const AdminSidebarGroupActions = ({contentTypes, techs, categories}:adminActionProps) => {

  //context is here
  const {setContentOfType, contentOfType, isAddingState, setIsAddingState, openDialog, setOpenDialog} = useFormTypeId();

  const [types, setTypes] = useState<optionType[] | null>(null);
  const [typeMessage, setTypeMessage] = useState<string | null>(null);

  async function fetchTypes(){
    const res = await fetch('/api/contents/contentType');
    const fetchedData = await res.json();
    if(fetchedData.success){
      setTypes(fetchedData.data);
    }else{
      setTypeMessage(fetchedData.message);
    }
  }

  useEffect(()=>{
    (async () => {
    await fetchTypes();
  })();
  }, []);

  type formType = string;
  
  

  function changeFormTypeAndOpenDialog (type:formType){
    setContentOfType(type);
    setIsAddingState(true);
    setOpenDialog(true);
  }

  function closeDialog(){
    setOpenDialog(false);
    setContentOfType(null);
  }

  type actionType ={
    actionText:  formType;

  }
  const actions:actionType[]= [
    {
      actionText: "Add project",
     
    },
     {
      actionText: "Add note",
    
    },
     {
      actionText: "Add exercise",
      
    },
     {
      actionText: "Add video",
      
    }
  ]
  
if(typeMessage){
  return <p>there is an error</p>
}else{
  if(types===null){
    return<p>Loading...</p>
  }
}
  
  return (
    <>
    
      { types.map(({ id, name}:optionType, index)=>(
        <SidebarGroup key={index}>
        <SidebarGroupLabel className="text-[13px]">Add {name}</SidebarGroupLabel>
      <Tooltip>
        <TooltipTrigger asChild>
          <SidebarGroupAction className="cursor-pointer" onClick={()=>changeFormTypeAndOpenDialog (name.toLowerCase().trim())}>
            <Plus className="h-4 w-4" />
            <span className="sr-only">Add {name}</span>
          </SidebarGroupAction>
         
        </TooltipTrigger>
        <TooltipContent side="right">Add {name}</TooltipContent>
      </Tooltip>
        </SidebarGroup>
      ))}
   
   {/*"Add project"|"Add note"|"Add exercise"|"Add video";*/}
       <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          {contentOfType && <DialogTitle> {isAddingState? `Add ${contentOfType}`:`Edit ${contentOfType}` }</DialogTitle>}

          {contentOfType === "video" && <CommonFormElementForContents contentTypes={contentTypes} techs={techs} categories={categories} close={closeDialog}/>}

          {contentOfType === "project" && <CommonFormElementForContents contentTypes={contentTypes} techs={techs} categories={categories}  close={closeDialog}/>}

          {contentOfType === "note" && <CommonFormElementForContents contentTypes={contentTypes} techs={techs} categories={categories} close={closeDialog}/>}

          {contentOfType === "exercise" && <CommonFormElementForContents contentTypes={contentTypes} techs={techs} categories={categories} close={closeDialog}/>}
        </DialogContent>
       </Dialog>
    </>
  );
};

export default AdminSidebarGroupActions;
