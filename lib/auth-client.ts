"use client";
import { createAuthClient } from "better-auth/react";

// In the browser, always use the current window origin — works on any domain
function getBaseURL(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  // Server-side fallback
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "http://localhost:3000";
}

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
});

export const { signIn, signOut, signUp, useSession } = authClient;
