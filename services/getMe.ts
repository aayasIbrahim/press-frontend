"use server";


import { cookies } from "next/headers";
export const getMe = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;
  if (!accessToken) {
    return {
      success: false,
      message: "User not logged in",
    };
  }
  const res = await fetch(`${process.env.BACKEND_URL}/api/users/me`, {
    headers: {
      Cookie: `accessToken=${accessToken}`,
    },
    cache: "force-cache",
    next: {
      revalidate: 60 * 60 * 24, //1Days
      tags: ["my-profile"],
    },
  });
  const result= res.json()
  

  return result
};
