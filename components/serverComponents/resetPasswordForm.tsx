"use client"
import { Field, FieldLabel } from '../ui/field';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { resetPasswordServerAction } from '../../app/actions/resetPasswordServerAction';
import {type resetPasswordActionType } from '@/app/customTypes/types';
import { useActionState } from 'react';
import { useRouter } from 'next/navigation';

const ResetPasswordForm = () => {
      const router = useRouter();
  const initialState:resetPasswordActionType ={
    errors: {},
    success: false,
  }
  const [state, formAction, isPending] = useActionState(resetPasswordServerAction, initialState);

  if(state?.success){

    setTimeout(()=>{
      router.replace('/dashboard/user')
    }, 2000)
  }
   return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <form action={formAction}
        className="w-full max-w-md bg-zinc-900 p-8 rounded-2xl shadow-2xl space-y-6"
      >
        <div className="text-center space-y-2">
          <h2 className="text-2xl font-semibold text-white">
            Reset Password
          </h2>
          <p className="text-sm text-zinc-400">
            Enter your new password below.
          </p>
        </div>

        <Field>
          <FieldLabel htmlFor="newPassword" className="text-zinc-300">
            New Password
          </FieldLabel>
          <Input
            type="password"
            id="newPassword"
            name="newPassword"
            placeholder="Enter a strong password"
            required
            className="mt-2"
          />
         {state.errors?.newPassword&&<p className="text-center text-[16px] text-red-500">{state.errors.newPassword[0]}</p>}
        </Field>

        <Field>
          <FieldLabel htmlFor="confirmPassword" className="text-zinc-300">
            Confirm Password
          </FieldLabel>
          <Input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            placeholder="Re-enter your password"
            required
            className="mt-2"
          />
          {state.errors?.confirmPassword&&<p className="text-center text-[16px] text-red-500">{state.errors.confirmPassword[0]}</p>}
        </Field>

        <Button
          type="submit"
          className="w-full cursor-pointer disabled:cursor-not-allowed bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors"
          disabled={isPending || state.success}
        >
          {isPending? "Updating...": "Update Password"}
        </Button>
        {state?.errors?.message&&<p className="text-center text-[16px] text-red-500">{state.errors.message}</p>}
        {state.success&&<p className="text-center text-[16px] text-green-500">You've successfully updated your password!</p>}
      </form>
    </div>
  )
}

export default ResetPasswordForm