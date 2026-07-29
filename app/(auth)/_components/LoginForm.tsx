"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React, { useActionState, useEffect } from "react";
import { createLogin } from "../_action/authActions";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

function LoginForm() {
  const searchParams = useSearchParams();
  const redirectTo = searchParams.get("redirectTo") ?? "";

  const [state, formAction, isPending] = useActionState(
    createLogin.bind(null, redirectTo),
    null,
  );

  useEffect(() => {
    if (!state) return;
    if (!state.success) {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <form action={formAction} className="space-y-4">
      <Card className="p-5 space-y-4">
        <Input name="email" type="email" placeholder="enter your email" />
        <Input
          name="password"
          type="password"
          placeholder="enter your password"
        />
        <Button variant={"outline"} type="submit">
          {isPending ? "submitting..." : "log in"}
        </Button>
      </Card>
    </form>
  );
}

export default LoginForm;
