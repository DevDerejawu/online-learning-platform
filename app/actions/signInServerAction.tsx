"use server"
import { createClient } from "@/lib/supabase/server";
import { signInSchema } from "@/lib/validation/auth";
import { signUpActionType } from "../customTypes/types";

export async function signInServerAction(prevState:signUpActionType, formData:FormData):Promise<signUpActionType>{
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  
  const parsedData = signInSchema.safeParse({email, password});
  if(!parsedData.success){
    return {
      errors: parsedData.error.flatten().fieldErrors
    }
  }else{
    const supabase = await createClient();
    const {error} = await supabase.auth.signInWithPassword({email, password });

    if (error){
      return {
        errors: {message:error.message},
      }
    }else{
      return {
        success: true
      }
    }
  } 
}