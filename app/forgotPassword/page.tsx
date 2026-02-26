"use client";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { createClient } from "@/lib/supabase/client";
import { emailSchema, emailSchemaType } from "@/lib/validation/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

const ForgotPasword = () => {
  const [message, setMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  async function resetFun(data: emailSchemaType) {
    const email = data.email;
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL}/passwordReset`,
    });

    if (error) {
      setMessage(error.message);
      setIsSuccess(false);
    } else {
      setMessage("Check your email for the reset link.");
      setIsSuccess(true);
    }
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="max-w-md bg-slate-500 p-4 rounded-lg space-y-8">
        <h2 className="text-2xl text-center">
          Enter your email below to reset your password.
        </h2>
        <Field className="mb-3">
          <FieldLabel htmlFor="resetEmail">Enter your email</FieldLabel>
          <Input
            type="email"
            {...register("email")}
            id="resetEmail"
            className="placeholder-blue-400!"
            placeholder="Enter your email here"
          />
          {errors.email && (
            <p className="text-orange-900 text-xl text-center">
              {errors.email.message}
            </p>
          )}
        </Field>
        <Button
          disabled={isSubmitting}
          className="cursor-pointer block mx-auto bg-blue-500 hover:bg-blue-400"
          onClick={handleSubmit(resetFun)}
        >
          {isSubmitting ? "Sending..." : "Send Reset Link"}
        </Button>
        {message && (
          <p
            className={`${isSuccess ? "text-blue-500" : "text-orange-900"} text-center text-xl`}
          >
            {message}
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPasword;
