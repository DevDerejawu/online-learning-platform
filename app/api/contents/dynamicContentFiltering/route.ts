import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(req:Request){
  const url = new URL(req.url);
  console.log('url',url);
  console.log("req",req);
  const  byContentTypeId = url.searchParams.get('type');
  const byTechId = url.searchParams.get("tech");
  const byCategoryId = url.searchParams.get("category");
  const byContentId = url.searchParams.get('id');

  const supabase = await createClient();

  let query = supabase
    .from("contents")
    .select(
      "id, title, part, description, content, tech_id, category_id, content_type_id, created_by, content_types(name)",
    )
    .order("created_at", { ascending: false });

  if (byContentTypeId) query = query.eq("content_type_id", byContentTypeId);
  if (byTechId) query = query.eq("tech_id", byTechId);
  if (byCategoryId) query = query.eq("category_id", byCategoryId);
  

  const { data, error } = await query;

  console.log("data", data, "error", error);
  if (error) {
    return NextResponse.json({ success: false, message: error.message, status: 400 });
  }

  return NextResponse.json({ success: true, data, status:200 });

  
}