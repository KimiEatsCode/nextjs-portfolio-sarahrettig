import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { NextAuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";
import type { AdapterAccount } from "next-auth/adapters";

// PrismaClient singleton to avoid multiple instances in development
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

const linkedProvidersMap = new Map<string, Set<string>>();

export async function addLinkedProvider(userId: string, providerId: string) {
  if (!linkedProvidersMap.has(userId)) {
    linkedProvidersMap.set(userId, new Set());
  }
  linkedProvidersMap.get(userId)?.add(providerId);
}

export async function getLinkedProviderIds(userId: string) {
  const providers = linkedProvidersMap.get(userId);
  return providers ? Array.from(providers) : [];
}

export function clearLinkedProviders(userId: string) {
  linkedProvidersMap.delete(userId);
}

export async function linkAccountToUser(
  userId: string,
  account: Partial<AdapterAccount> & Pick<AdapterAccount, 'provider' | 'type' | 'providerAccountId'>,
): Promise<void> {
  // The account is already created by NextAuth's PrismaAdapter
  // Just track the linked provider
  await addLinkedProvider(userId, account.provider);
}

const ACCOUNT_EXPIRATION_DAYS = 30;
const ACCOUNT_EXPIRATION_MS = ACCOUNT_EXPIRATION_DAYS * 24 * 60 * 60 * 1000;

export const authOptions: NextAuthOptions = {
  debug: true, // Enable debug mode to see detailed errors
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }

      if (token.id && !token.expiresAt) {
        try {
          const storedUser = await prisma.user.findUnique({
            where: { id: token.id },
            select: { expiresAt: true },
          });

          if (storedUser?.expiresAt) {
            token.expiresAt = storedUser.expiresAt.toISOString();
          }
        } catch (error) {
          console.error("Unable to load user expiration", error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.expiresAt = token.expiresAt ?? null;
      }
      return session;
    },
  },
  events: {
    async signIn({ user, account, isNewUser }) {
      if (!user?.id || !account?.provider) {
        return;
      }

      try {
        await linkAccountToUser(user.id, account);
        if (isNewUser) {
          try {
            const expiresAt = new Date(Date.now() + ACCOUNT_EXPIRATION_MS);
            await prisma.user.update({
              where: { id: user.id },
              data: { expiresAt },
            });
          } catch (expiresAtError) {
            console.error("Failed to set account expiration (column may not exist yet)", expiresAtError);
          }
        }
      } catch (error) {
        console.error("Failed to persist linked provider", error);
      }
    },
  },
};
