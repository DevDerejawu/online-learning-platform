import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(req:Request){

try{
  const {contentId} = await req.json();
  const supabase = await createClient();
  
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("User not authenticated");
  }

  if(!contentId){
    return NextResponse.json({success: false, status: 400, message: "Both user id and content id are required."})
  }
  const {data, error} = await supabase.from('submitted_project_note_exercise').insert([{submitted_by: user.id, content_id:contentId}]);

  if(error){
     return NextResponse.json({success: false, status: 400, message: error.message});
  }else{
     return NextResponse.json({success: true, status: 201, message: "Submitted successfully"});
  }

}catch(err){
   return NextResponse.json({success: false, status: 500, message: "Something went wrong"})
}
}