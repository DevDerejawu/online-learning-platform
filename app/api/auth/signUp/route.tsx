import { signUpSchema } from "@/lib/validation/auth";
import { createClient } from "@/lib/supabase/server";
import { NextResponse, type NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  try {
    // 1. Parse and validate request body
    const body = await req.json();
    const parsedData = signUpSchema.safeParse(body);

    if (!parsedData.success) {
      return NextResponse.json({
        message: parsedData.error.format(), // safer, shows all field errors
        success: false,
        status: 400,
      });
    }

    const { full_name, email, password } = parsedData.data;

    // 2. Create Supabase server client
    const supabase = await createClient();

    // 3. Sign up user
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/user`,
        data: { full_name, role: "user" }, // custom user metadata must go under `data`
      },
    });

    if (error) {
      return NextResponse.json({
        message: error.message,
        success: false,
        status: 400,
      });
    }

    // 4. Return success response
    return NextResponse.json({
      message: "Check your email inbox to verify and finish registering.",
      success: true,
      status: 201,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({
      message: "Something went wrong.",
      success: false,
      status: 500,
    });
  }
}
