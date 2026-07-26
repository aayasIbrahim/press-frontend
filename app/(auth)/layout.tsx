import { Navbar } from "@/components/shared/navber";
import { getMe } from "@/services/getMe";
import React from "react";

async function AuthLayoutPage({ children }: { children: React.ReactNode }) {
  const user = await getMe();
  return (
    <div>
      <Navbar user={user} />
      {children}
    </div>
  );
}

export default AuthLayoutPage;
