"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signOut() {
  cookies().delete("next-auth.session-token");
  redirect("/auth/signin");
}
