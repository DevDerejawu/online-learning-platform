"use server"
import { type resetPasswordActionType } from "@/app/customTypes/types";
import { createClient } from "@/lib/supabase/server";
import { resetPasswordSchema } from "@/lib/validation/auth";

export async function resetPasswordServerAction( prevState: resetPasswordActionType,
  formData: FormData):Promise<resetPasswordActionType>{
const newPassword = formData.get("newPassword") as string;
  const confirmPassword = formData.get("confirmPassword") as string;

if (!newPassword || !confirmPassword) {
    return { errors: { message: "Both fields are required" } };
  }


const parsedData = resetPasswordSchema.safeParse({newPassword, confirmPassword});

if(parsedData.success){
  const supabase = await createClient();
  const {error} = await supabase.auth.updateUser({password:parsedData.data.newPassword});
  if(error){
    return {
      errors:{
        message: error.message
      }
    }
  }else{
    return {success: true}
  }
}else{
  return{
    errors:parsedData.error.flatten().fieldErrors
  }
}
}