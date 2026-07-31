import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "./db";

// Prefer the custom domain over the Vercel preview URL
function getAppUrl(): string {
  if (process.env.BETTER_AUTH_URL) {
    return process.env.BETTER_AUTH_URL;
  }

  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }

  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }

  return "http://localhost:3000";
}

const appUrl = getAppUrl();

export const auth = betterAuth({
  baseURL: appUrl,

  secret:
    process.env.BETTER_AUTH_SECRET ||
    "ifa-boru-school-fallback-secret-2024",

  database: prismaAdapter(db, {
    provider: "postgresql",
  }),

  trustedOrigins: [
    // Production
    "https://haramayaifaboruschool.xyz",
    "https://www.haramayaifaboruschool.xyz",

    // Local development
    "http://localhost:3000",
    "http://localhost:3001",
    "http://127.0.0.1:3000",

    // Current detected app URL
    appUrl,

    // Optional env URLs
    ...(process.env.BETTER_AUTH_URL
      ? [process.env.BETTER_AUTH_URL]
      : []),

    ...(process.env.NEXT_PUBLIC_APP_URL
      ? [process.env.NEXT_PUBLIC_APP_URL]
      : []),
  ].filter(Boolean),

  emailAndPassword: {
    enabled: true,
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7,
    updateAge: 60 * 60 * 24,
    cookieCache: {
      enabled: true,
      maxAge: 60 * 5,
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
