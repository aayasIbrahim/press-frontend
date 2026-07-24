
"use client"

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import React from "react";
import { createLogin } from "../_action/action";

function LoginForm() {
  return (
    <form action={createLogin} className="space-y-4">
      <Card className="p-5 space-y-4">
        <Input name="email" type="email" placeholder="enter your email" />
        <Input
          name="password"
          type="password"
          placeholder="enter your password"
        />
        <Button variant={"outline"}type="submit">Log in</Button>
      </Card>
    </form>
  );
}

export default LoginForm;
