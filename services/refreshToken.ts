"use server";
import { cookies } from "next/headers";

export const getnewAccessToken = async () => {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get("refreshToken")?.value||null;
  
  if (!refreshToken) {
    return {
      success: false,
      message: "Refresh Token not provided",
    };
  }
  const res = await fetch(`${process.env.BACKEND_URL}/api/auth/refresh-token`, {
    method:"POST",
    headers: {
      cookie: `refreshToken=${refreshToken}`,
    },
     cache : "no-cache",
  });
  const result = await res.json();
  
  return result;
};
