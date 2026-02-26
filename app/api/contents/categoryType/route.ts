import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(){
try{
  const supabase = await createClient();
const {data, error} = await supabase.from('categories').select('id, name');
if(error){
  return NextResponse.json({success: false, message: error.message, status: 400});
}else{
  return NextResponse.json({success: true, message:"categories fetched successfully", status:200, data});
}
}catch(err){
  console.log("err", err)
   return NextResponse.json({success: false, message: "something went wrong", status: 500});
}
} 