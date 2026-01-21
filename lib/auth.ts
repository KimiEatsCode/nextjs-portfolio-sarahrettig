import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { NextAuthOptions } from "next-auth";
import { PrismaClient } from "@prisma/client";
import type { AdapterAccount } from "next-auth/adapters";

const prisma = new PrismaClient();

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

export async function linkAccountToUser(
  userId: string,
  account: Partial<AdapterAccount> & Pick<AdapterAccount, 'provider' | 'type' | 'providerAccountId'>,
) {
  // The account is already created by NextAuth's PrismaAdapter
  // Just track the linked provider
  await addLinkedProvider(userId, account.provider);
}

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
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
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  events: {
    async signIn({ user, account }) {
      if (!user?.id || !account?.provider) {
        return;
      }

      try {
        await linkAccountToUser(user.id, account);
      } catch (error) {
        console.error("Failed to persist linked provider", error);
      }
    },
  },
};
