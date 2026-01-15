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
  account: Partial<AdapterAccount> & Pick<AdapterAccount, 'provider' | 'type' | 'providerAccountId'>,
) {
  // #region agent log
  fetch('http://127.0.0.1:7243/ingest/1ef3c8d0-a7f7-4f99-ab5e-21dbef65d423',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'lib/auth.ts:27',message:'Inside linkAccountToUser',data:{userId:userId,accountUserId:account.userId,accountProvider:account.provider,mergedUserId:{...account,userId}.userId},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H1,H3,H4'})}).catch(()=>{});
  // #endregion
  await adapter.linkAccount({ ...account, userId } as AdapterAccount);
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
      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/1ef3c8d0-a7f7-4f99-ab5e-21dbef65d423',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'lib/auth.ts:67',message:'signIn event triggered',data:{userId:user?.id,accountProvider:account?.provider,accountKeys:account?Object.keys(account):null},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H1,H2,H3,H5'})}).catch(()=>{});
      // #endregion
      
      if (!user?.id || !account?.provider) {
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/1ef3c8d0-a7f7-4f99-ab5e-21dbef65d423',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'lib/auth.ts:72',message:'Early return - missing user.id or account.provider',data:{hasUserId:!!user?.id,hasAccountProvider:!!account?.provider},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H1'})}).catch(()=>{});
        // #endregion
        return;
      }

      // #region agent log
      fetch('http://127.0.0.1:7243/ingest/1ef3c8d0-a7f7-4f99-ab5e-21dbef65d423',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'lib/auth.ts:79',message:'Before linkAccountToUser',data:{userId:user.id,accountUserId:account.userId,accountType:account.type,accountProvider:account.provider,accountProviderAccountId:account.providerAccountId,hasAccessToken:!!account.access_token,hasRefreshToken:!!account.refresh_token,accountFull:account},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H1,H2,H3,H5'})}).catch(()=>{});
      // #endregion

      try {
        await linkAccountToUser(user.id, account);
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/1ef3c8d0-a7f7-4f99-ab5e-21dbef65d423',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'lib/auth.ts:86',message:'linkAccountToUser succeeded',data:{userId:user.id},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H4'})}).catch(()=>{});
        // #endregion
      } catch (error) {
        // #region agent log
        fetch('http://127.0.0.1:7243/ingest/1ef3c8d0-a7f7-4f99-ab5e-21dbef65d423',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({location:'lib/auth.ts:91',message:'linkAccountToUser failed',data:{error:error instanceof Error?error.message:String(error),errorStack:error instanceof Error?error.stack:null},timestamp:Date.now(),sessionId:'debug-session',hypothesisId:'H1,H2'})}).catch(()=>{});
        // #endregion
        console.error("Failed to persist linked provider", error);
      }
    },
  },
};
