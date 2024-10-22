'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'
import { LoginErrorResponse } from '@/types'
import {z} from "zod"

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export async function emailLogin(formData: FormData): Promise<LoginErrorResponse> {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  // Validate the form data using the Zod schema
  const validation = loginSchema.safeParse(data);

  // Check if validation failed
  if (!validation.success) {
    // Extract the first error message from the validation result
    const errorMessage = validation.error.issues[0].message;
    return { success: false, message: errorMessage };
  }

   // Proceed with Supabase login if validation is successful
   const { error } = await supabase.auth.signInWithPassword(data);

   if (error) {
     return { success: false, message: "Could not authenticate user" };
   }

   revalidatePath('/', 'layout')
 
   return { success: true };

}

export async function signup(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/login?message=Error signing up')
  }

  revalidatePath('/', 'layout')
  redirect('/login')
}

export async function signout() {
  const supabase = createClient()
  await supabase.auth.signOut()
  redirect('/login')
}
