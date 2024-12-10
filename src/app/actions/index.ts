"use client";
import { signIn } from "next-auth/react";
export async function LoginData(formData: any): Promise<any> {
  const action: string | any = formData.get("action");
  await signIn(action, { redirectTo: "/" });
}
