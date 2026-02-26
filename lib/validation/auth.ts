import { z } from "zod";
export const signUpSchema = z.object({
  full_name: z
    .string()
    .regex(
      /^[A-Z][a-z]{1,}\s[A-Z][a-z]{1,}/,
      "Write your full name with space separated and starts in upper case for both name.",
    ),
  email: z.string().email("Invalid imail address"),
  password: z
    .string()
    .min(8, "Minimum password length is '8'")
    .regex(/[A-Z]/, "Password must contain at least one uppercase.")
    .regex(/[a-z]/, "Password must contain at least one lower case.")
    .regex(/[0-9]/, "Password must contain at least one number"),
});
export const signInSchema = z.object({
  email: z.string().email("Invalid imail address"),
  password: z
    .string()
    .min(8, "Minimum password length is '8'")
    .regex(/[A-Z]/, "Password must contain at least one uppercase.")
    .regex(/[a-z]/, "Password must contain at least one lower case.")
    .regex(/[0-9]/, "Password must contain at least one number"),
});

export const resetPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(8, "Minimum password length is '8'")
      .regex(/[A-Z]/, "Password must contain at least one uppercase.")
      .regex(/[a-z]/, "Password must contain at least one lower case.")
      .regex(/[0-9]/, "Password must contain at least one number"),
    confirmPassword: z
      .string()
      .min(8, "Minimum password length is '8'")
      .regex(/[A-Z]/, "Password must contain at least one uppercase.")
      .regex(/[a-z]/, "Password must contain at least one lower case.")
      .regex(/[0-9]/, "Password must contain at least one number"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const emailSchema = z.object({
  email: z.string().min(1, "email is required").email("Invalid email address"),
});

export const contentsSchema = z.object({
  title: z
    .string()
    .min(1, "Title is required")
    .min(4, "The title must have more than 3 characters."),
  description: z
    .string()
    .min(1, "Description is required")
    .min(10, "The description must have more than 9 characters."),
  contentTypeId: z.string().min(1, "Please select content type."),
  categoryId: z.string().min(1, "Please select tech type!"),
  actualContent: z.string().min(10, "Write at least 9 characters"),
  part:z.string().min(1, "please enter part here.")
});

export const newMessageSchema = z.object({
name: z.string().min(1, "Name is required").min(2, "Your name at least must be 2 character."),
email: z.string().min(1, "email is required").email("Invalid email address"),
message: z.string().min(1, "Message is required").min(20, "At least the message must be 20 characters")

})
export type contentsSchemaType = z.infer<typeof contentsSchema>
export type emailSchemaType = z.infer<typeof emailSchema>;
export type resetPasswordType = z.infer<typeof resetPasswordSchema>;
export type signUpType = z.infer<typeof signUpSchema>;
export type signInType = z.infer<typeof signInSchema>;
