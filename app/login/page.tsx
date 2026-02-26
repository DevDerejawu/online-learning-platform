"use client";
import { SiGoogle, SiGithub } from "react-icons/si";
import { useActionState, useEffect, useState } from "react";
import Link from "next/link";
import { signInServerAction } from "../actions/signInServerAction";
import { signUpServerAction } from "../actions/signUpServerAction";
import { signUpActionType } from "../customTypes/types";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const initialState: signUpActionType = {
  errors: {},
  success: false,
};

export default function LoginPage() {
const router = useRouter();
const supabase = createClient()
  useEffect(()=>{
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        router.replace("/dashboard/user");
      }
    });

    
  },[])
  const [isLogin, setIsLogin] = useState(true);

  
  const [signInState, signInAction, signInPending] =
    useActionState(signInServerAction, initialState);

  const [signUpState, signUpAction, signUpPending] =
    useActionState(signUpServerAction, initialState);

  const pending = signInPending || signUpPending;

  // Select active state dynamically
  const activeState = isLogin ? signInState : signUpState;
  const formAction = isLogin ? signInAction : signUpAction;

  
useEffect(() => {
    if (activeState.success && isLogin) {
      router.replace("/dashboard/user");
    }
  }, [activeState.success, isLogin, router]);

  const emailError = activeState?.errors?.email;
  const passwordError = activeState?.errors?.password;
  const fullNameError = activeState?.errors?.full_name;
  const generalError = activeState?.errors?.message;

  async function handleSocialLogin(provider: "google" | "github") {
    const supabase = createClient();

    await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/user`,
      },
    });
  }

  return (
    <form
      action={formAction}
      className="flex w-full flex-col items-center mt-3 justify-center max-w-96 mx-auto border-3 rounded pb-10 px-3"
    >
      <h2 className="text-4xl">
        {isLogin ? "Sign in" : "Sign up"}
      </h2>

      <p className="mt-3 text-xl">
        Welcome! Please {isLogin ? "sign in" : "sign up"} to continue
      </p>

      
      <div className="mt-10 mb-2 grid w-full grid-cols-2 gap-6">
        <button
          type="button"
          onClick={() => handleSocialLogin("google")}
          className="flex items-center hover:text-slate-600 cursor-pointer justify-center rounded-full border py-2.5"
        >
          <SiGoogle size={22} />
          <span className="ml-3">Google</span>
        </button>

        <button
          type="button"
          onClick={() => handleSocialLogin("github")}
          className="flex items-center disabled:cursor-pointer justify-center rounded-full border py-2.5"
          disabled={true}
        >
          <SiGithub size={22} />
          <span className="ml-3">GitHub</span>
        </button>
      </div>

      
      {generalError && (
        <p className="text-red-500 text-center mt-2">
          {generalError}
        </p>
      )}

      {/* Divider */}
      <div className="my-5 flex w-fullmx-auto items-center gap-4">
        <div className="h-px w-[50px] bg-gray-300" />
        <p className="text-sm text-gray-500">
          or {isLogin ? "sign in" : "sign up"} with email
        </p>
        <div className="h-px w-[50px] bg-gray-300" />
      </div>

      
      {!isLogin && (
        <div className="w-full mb-3">
          <input
            name="full_name"
            placeholder="Full name"
            className="h-12 w-full rounded-full border px-5"
            type="text"
          />
          {fullNameError && (
            <p className="text-red-500 text-sm mt-1">
              {fullNameError[0]}
            </p>
          )}
        </div>
      )}

  
      <div className="w-full mb-3">
        <input
          name="email"
          placeholder="Your email"
          className="h-12 w-full rounded-full border px-5"
          required
          type="email"
        />
        {emailError && (
          <p className="text-red-500 text-sm mt-1">
            {emailError[0]}
          </p>
        )}
      </div>


      <div className="w-full mb-3">
        <input
          name="password"
          placeholder="Password"
          className="h-12 w-full rounded-full border px-5"
          required
          type="password"
        />
        {passwordError && (
          <p className="text-red-500 text-sm mt-1">
            {passwordError[0]}
          </p>
        )}
      </div>

      
      {isLogin && (
        <div className="w-full text-right">
          <Link
            href="/forgotPassword"
            className="text-sm underline"
          >
            Forgot password?
          </Link>
        </div>
      )}

      
      <button
        disabled={pending}
        type="submit"
        className="mt-6 h-11 w-full rounded-full bg-slate-600 hover:bg-slate-500 cursor-pointer text-white"
      >
        {pending
          ? "Processing..."
          : isLogin
          ? "Login"
          : "Register"}
      </button>

    
      <p className="mt-4">
        {isLogin
          ? "Don't have an account?"
          : "Already have an account?"}

        <button
          type="button"
          onClick={() => setIsLogin((prev) => !prev)}
          className="ml-2 underline cursor-pointer hover:text-slate-400"
        >
          {isLogin ? "Sign up" : "Sign in"}
        </button>
      </p>
      {activeState?.success&& <p className="text-center text-[16px] text-green-500">{isLogin?"✅You have logged in successfully!": "✅ We have sent you an email to verify it is you!."}</p>}
    </form>
  );
}
