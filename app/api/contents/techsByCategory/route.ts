import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(req:Request){
try{
  const url = new URL(req.url);
  const categoryId = url.searchParams.get('categoryId');
  const supabase = await createClient();
  const {data, error} = await supabase.from('tech').select('id, name').eq('category_id', categoryId);
  if(error) return NextResponse.json({success: false, status: 400, message: error.message});
  return NextResponse.json({success: true, status: 200, data});
}catch(err){
  return NextResponse.json({success: false, status: 500, message: "something went wrong"});
}
}