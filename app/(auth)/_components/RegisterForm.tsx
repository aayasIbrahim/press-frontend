"use client";

import type React from "react";
import { useState, useActionState, useEffect } from "react";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProfilePhotoInput } from "@/app/(auth)/_components/profile-photo-input";
import { createRegister } from "../_action/authActions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export function RegisterForm() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState(createRegister, null);
  const router = useRouter();
  useEffect(() => {
    if (!state) return;

    if (state.success) {
      toast.success(state.message || "Registration successful!");
      router.push("/login");
    } else {
      toast.error(state.message || "Something went wrong!");
    }
  }, [state, router]);
  return (
    <Card className="w-full max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">Create your account</CardTitle>
        <CardDescription>Fill in your details to get started.</CardDescription>
      </CardHeader>
      <form action={formAction}>
        <CardContent className="flex flex-col gap-5">
          <ProfilePhotoInput
            value={photo}
            onChange={setPhoto}
            // fallback={initials}
            // disabled={submitting}
          />

          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Full name</Label>
            <Input
              id="name"
              name="name"
              // onChange={update("name")}
              placeholder="Jane Doe"
              autoComplete="name"
              // disabled={submitting}
              // aria-invalid={!!errors.name}
            />
            {/* {errors.name ? <p className="text-sm text-destructive">{errors.name}</p> : null} */}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              // onChange={update("email")}
              placeholder="jane@example.com"
              autoComplete="email"
              // disabled={submitting}
              // aria-invalid={!!errors.email}
            />
            {/* {errors.email ? <p className="text-sm text-destructive">{errors.email}</p> : null} */}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                // value="password"
                // onChange={update("password")}
                placeholder="••••••••"
                autoComplete="new-password"
                // disabled={submitting}
                // aria-invalid={!!errors.password}
                className="pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((s) => !s)}
                className="absolute right-0 top-0 flex h-full w-10 items-center justify-center text-muted-foreground hover:text-foreground"
                aria-label={showPassword ? "Hide password" : "Show password"}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="size-4" />
                ) : (
                  <Eye className="size-4" />
                )}
              </button>
            </div>
            {/* {errors.password ? (
              <p className="text-sm text-destructive">{errors.password}</p>
            ) : null} */}
          </div>

          <div className="flex flex-col gap-2">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <Input
              id="confirmPassword"
              type={showPassword ? "text" : "password"}
              name="confirmPassword"
              placeholder="••••••••"
              autoComplete="new-password"
              disabled={isPending}
              // aria-invalid={!!errors.confirmPassword}
            />

            {/* {errors.password ? (
              <p className="text-sm text-destructive">{errors.password}</p>
            ) : null} */}
          </div>

          {/* {status ? (
            <p
              role="alert"
              className={
                status.type === "success"
                  ? "text-sm font-medium text-foreground"
                  : "text-sm font-medium text-destructive"
              }
            >
              {status.message}
            </p>
          ) : null} */}
        </CardContent>

        <CardFooter className="flex-col gap-3">
          <Button type="submit" className="w-full" disabled={isPending}>
            {isPending ? (
              <>
                <Loader2 className="size-4 animate-spin" />
                Creating account...
              </>
            ) : (
              "Create account"
            )}
          </Button>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <a
              href="/login"
              className="font-medium text-foreground underline underline-offset-4"
            >
              Log in
            </a>
          </p>
        </CardFooter>
      </form>
    </Card>
  );
}
