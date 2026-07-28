import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "./db";

// Auto-detect the app URL — works on Vercel, localhost, and any custom domain
function getAppUrl(): string {
  // Vercel automatically sets VERCEL_URL (without https://)
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  // Use explicitly configured URL if set
  if (process.env.BETTER_AUTH_URL && process.env.BETTER_AUTH_URL !== "http://localhost:3000") {
    return process.env.BETTER_AUTH_URL;
  }
  return "http://localhost:3000";
}

const appUrl = getAppUrl();

export const auth = betterAuth({
  baseURL: appUrl,
  secret: process.env.BETTER_AUTH_SECRET || "ifa-boru-school-fallback-secret-2024",
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  trustedOrigins: [
    // Local development
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",
    "http://192.168.1.9:3000",
    // Vercel deployment — auto-detected
    appUrl,
    // Vercel preview URLs pattern
    "https://ifa-boru-school-lac.vercel.app",
    // Any extra configured URLs
    ...(process.env.NEXT_PUBLIC_APP_URL ? [process.env.NEXT_PUBLIC_APP_URL] : []),
    ...(process.env.BETTER_AUTH_URL ? [process.env.BETTER_AUTH_URL] : []),
  ].filter(Boolean),
  emailAndPassword: {
    enabled: true,
  },
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5, // 5 minutes cache
    },
  },
  user: {
    additionalFields: {
      role: {
        type: "string",
        defaultValue: "admin",
      },
    },
  },
});

export type Session = typeof auth.$Infer.Session;
