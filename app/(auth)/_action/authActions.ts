"use server";

import { IUser } from "@/lib/type";
import { cookies } from "next/headers";
import jwt, { JwtPayload } from "jsonwebtoken";
import { redirect } from "next/navigation";
// import { redirect } from "next/navigation";

export type loginState = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};
export const createLogin = async (
  prevState: loginState | null,
  formData: FormData,
) => {
  const email = formData.get("email");
  const password = formData.get("password");
  const payload = {
    email,
    password,
  };
  const res = await fetch(`${process.env.BACKEND_URL}/api/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const result: loginState = await res.json();

  if (result.success) {
    const cookieStore = await cookies();
    cookieStore.set("accessToken", result.data.accessToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
      sameSite: "lax",
    });

    cookieStore.set("refreshToken", result.data.refreshToken, {
      httpOnly: true,
      maxAge: 60 * 60 * 24 * 7,
      sameSite: "lax",
    });
  }
  const decodeaccsseToken = jwt.decode(result.data.accessToken) as JwtPayload;
  if (decodeaccsseToken.role === "USER") {
    redirect("/dashboard");
  } else if (decodeaccsseToken.role === "AUTHOR") {
    redirect("/author-dashboard");
  } else if (decodeaccsseToken.role === "ADMIN") {
    redirect("/admin-dashboard");
  }
  return result;
};

export const createRegister = async (
  prevState: IUser | null,
  formData: FormData,
) => {
  const name = formData.get("name");
  const email = formData.get("email");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  //password matching logic
  if (password !== confirmPassword) {
    return {
      success: false,
      statusCode: 400,
      message: "Passwords do not match",
    };
  }

  const payload = {
    name,
    email,
    password,
  };
  const res = await fetch(`${process.env.BACKEND_URL}/api/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });
  const result = await res.json();
  return result;
};
