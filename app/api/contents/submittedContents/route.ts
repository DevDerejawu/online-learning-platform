import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(){
  try{
    
  const supabase = await createClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }
  const {data, error}=await supabase.from('submitted_project_note_exercise').select('id, contents(id, content_types(name))').eq('submitted_by', user.id);
  if(error){
    return NextResponse.json({success: false, message: error.message, status:400})
  }else{
    return NextResponse.json({success: true, data, status: 200});
  }
  }catch(err){
    return  NextResponse.json({success: false, message: "Something went wrong"})
  }
}