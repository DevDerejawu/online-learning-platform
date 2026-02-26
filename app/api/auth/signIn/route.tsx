
import { createClient } from "@/lib/supabase/server";
import { signInSchema } from "@/lib/validation/auth";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest){
  try{
    const body = await req.json();
  const parsedData = signInSchema.safeParse(body);

  if(!parsedData.success){
    return NextResponse.json({
      message: parsedData.error.format(),
      success: false,
      status: 400
    })
  }

  const {email, password} = parsedData.data;

  const supabase = await createClient();
  const {data, error} = await supabase.auth.signInWithPassword({
    email, password
  })

  if(error){
    return NextResponse.json({
      message: error.message,
      success: false,
      status: 400
    })
  }

  return NextResponse.json({
    message: "Logged in successfully.",
    success: true,
    status: 200
  })
  
  }catch(err){
    return NextResponse.json({
      message: "Something went wrong.",
      success: false,
      status: 500
    })
  }
}