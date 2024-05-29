"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

export function SignIn() {
  return <Button onClick={() => signIn()}>Sign In</Button>;
}
