"use server"
import { createClient } from "@/lib/supabase/server";
import { signUpSchema } from "@/lib/validation/auth";
import { signUpActionType } from "../customTypes/types";

export async function signUpServerAction(prevState:signUpActionType, formData:FormData):Promise<signUpActionType>{
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const full_name = formData.get("full_name") as string;

  const parsedData = signUpSchema.safeParse({email, password, full_name});
  if(!parsedData.success){
    return {
      errors: parsedData.error.flatten().fieldErrors
    }
  }else{
    const supabase = await createClient();
    const {error} = await supabase.auth.signUp({email, password, options:{
      data: {full_name,  role:"user"},
      emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/user`
    } });

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