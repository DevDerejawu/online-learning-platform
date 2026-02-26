"use server"
import { createClient } from "@/lib/supabase/server";
import { newMessageSchema } from "@/lib/validation/auth";
import { newMessageType } from "../customTypes/types";
export async function postNewMessage(prevState:newMessageType,formData:FormData):Promise<newMessageType>{
  const email = formData.get("email") as string;
  const message = formData.get("message") as string;
  const name = formData.get("name") as string;
  const supabase = await createClient()
  const parsedData = newMessageSchema.safeParse({name, email, message});
  if(!parsedData.success){
    return {
      errors:parsedData.error.flatten().fieldErrors
    }
  }else{
    const {data, error} = await supabase.from('messages').insert([{name, email, message}]);
    if(error){
      return {success:false, errors:{guideMessage: error.message}}
    }else{
      return { success: true, message: `✅ You have successfully submitted your message ${name}. We will respond quickly!` };
    }
  }
}