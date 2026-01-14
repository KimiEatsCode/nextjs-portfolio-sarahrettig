import { Redis } from "@upstash/redis";
import { UpstashRedisAdapter } from "@next-auth/upstash-redis-adapter";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import { NextAuthOptions } from "next-auth";
import type { AdapterAccount } from "next-auth/adapters";

const redis = Redis.fromEnv();
const adapter = UpstashRedisAdapter(redis);

const linkedProvidersKeyPrefix = "user:linked-providers:";
const buildLinkedProvidersKey = (userId: string) =>
  `${linkedProvidersKeyPrefix}${userId}`;

export async function addLinkedProvider(userId: string, providerId: string) {
  await redis.sadd(buildLinkedProvidersKey(userId), providerId);
}

export async function getLinkedProviderIds(userId: string) {
  const providers = await redis.smembers(buildLinkedProvidersKey(userId));
  return providers ?? [];
}

export async function linkAccountToUser(
  userId: string,
  account: AdapterAccount,
) {
  await adapter.linkAccount({ ...account, userId });
  await addLinkedProvider(userId, account.provider);
}

export const authOptions: NextAuthOptions = {
  adapter,
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
