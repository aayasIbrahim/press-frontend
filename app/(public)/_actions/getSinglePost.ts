"use server";

import { cookies } from "next/headers";

export const getSinglePost = async (id: string) => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value || null;
  if (!accessToken) {
    return {
      success: false,
      message: "Your not accessable this post",
    };
  }
  const res = await fetch(
    `${process.env.BACKEND_URL}/api/posts/${id as string}`,
    {
      headers: { cookie: `accessToken=${accessToken}` },
    },
  );
  const result = await res.json();
  console.log(result);
  return result;
};
