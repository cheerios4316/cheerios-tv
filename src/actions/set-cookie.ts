"use server";

import { cookies } from "next/headers";

export async function setCookie(
  name: string,
  value: string,
  options?: {
    expires?: Date;
    path?: string;
  }
) {
  const cookieStore = await cookies();
  cookieStore.set(name, value, options);
}
