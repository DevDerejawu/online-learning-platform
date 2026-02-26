import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(){
try{
  const supabase = await createClient();
const {data, error} = await supabase.from('tech').select('id, name');
console.log("data", data, "error", error)
if(error){
  return NextResponse.json({success: false, message: error.message, status: 400});
}else{
  return NextResponse.json({success: true, message:"techs fetched successfully", status:200, data});
}
}catch(err){
  console.log("err", err)
   return NextResponse.json({success: false, message: "something went wrong", status: 500});
}
} 