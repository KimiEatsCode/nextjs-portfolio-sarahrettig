"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Navigation } from "../components/nav";
import { SignInPrompt } from "../components/sign-in-prompt";

export default function LoginPage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const error = searchParams?.get("error");
  // const callbackUrl = searchParams?.get("callbackUrl") ?? "/courses";
  const callbackUrl =
		process.env.NODE_ENV === "development"
			? "http://localhost:3000/courses"
			: "/courses";
  const showLinkingCTA = error === "OAuthAccountNotLinked";
  const linkAccountHref = `/link-account?callbackUrl=${encodeURIComponent(
    callbackUrl,
  )}`;

  if (session) {
    return (
      <div className="relative pb-16">
        <Navigation />
        <div className="px-6 pt-20 mx-auto space-y-8 max-w-3xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32 text-center">
          <h1 className="text-3xl font-bold text-black">Signed in successfully</h1>
          <p className="text-black">
            You are signed in as {session.user?.name ?? session.user?.email}. Go to{" "}
            <Link className="underline" href="/courses">
              your favorites projects
            </Link>{" "}
        
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative pb-16">
      <Navigation />
      <main className="px-6 pt-20 mx-auto max-w-3xl space-y-6 lg:px-8 md:space-y-10 md:pt-24 lg:pt-32 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-black">User Access</p>
        <h1 className="text-4xl font-bold text-black sm:text-5xl">Log in to your account</h1>
        <SignInPrompt />
        {showLinkingCTA && (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-4 text-sm text-red-900">
            <p className="font-semibold">
              Error: account exists with a different sign-in provider.
            </p>
            <p className="mt-1">
              Sign in using the provider you originally used, or{" "}
              <Link className="font-semibold underline" href={linkAccountHref}>
                link your accounts
              </Link>{" "}
              to continue.
            </p>
          </div>
        )}
        
      
     
      </main>
    </div>
  );
}
