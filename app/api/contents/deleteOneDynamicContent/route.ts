import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function DELETE(req: Request) {
  try {
    
    const url = new URL(req.url);
    const byContentId = url.searchParams.get("id");

    if (!byContentId) {
  return NextResponse.json(
    { success: false, message: "id is required" },
    { status: 400 }
  );
}
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("contents")
      .delete()
      .eq("id", byContentId);
    if (error) {
      return NextResponse.json({
        success: false,
        message: error.message,
        status: 400,
        
      });
    } else {
      return NextResponse.json({ success: true,status: 200, message:"Deleted successfully." });
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
