import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const byContentId = url.searchParams.get("id");
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("contents")
      .select(
        "id, title, part, description, content, tech_id, category_id, content_type_id, created_by, content_types(name)",
      )
      .eq("id", byContentId);
    if (error) {
      return NextResponse.json({
        success: false,
        message: error.message,
        status: 400,
        
      });
    } else {
      return NextResponse.json({ success: true,status: 200, data });
    }
  } catch (err) {
    console.log("error", err);
    return NextResponse.json({
      success: false,
      message: "some thing went wrong",
      status: 500,
    });
  }
}
