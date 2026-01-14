"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { Navigation } from "../components/nav";
import { SignInPrompt } from "../components/sign-in-prompt";

export default function LoginPage() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const error = searchParams.get("error");
  const callbackUrl = searchParams.get("callbackUrl") ?? "/courses";
  const showLinkingCTA = error === "OAuthAccountNotLinked";
  const linkAccountHref = `/link-account?callbackUrl=${encodeURIComponent(
    callbackUrl,
  )}`;

  if (session) {
    return (
      <div className="relative pb-16">
        <Navigation />
        <div className="px-6 pt-20 mx-auto space-y-8 max-w-3xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32 text-center">
          <h1 className="text-3xl font-bold text-black">Already signed in</h1>
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
        <p className="text-black">
          {/* Authenticate with GitHub to track your SCORM courses, progress, and grades. */}
           Authenticate with GitHub to track your favorite projects
        </p>
        {showLinkingCTA && (
          <div className="rounded-2xl border border-orange-200 bg-orange-50 px-5 py-4 text-sm text-orange-900">
            <p>
              It looks like that email already belongs to another provider.{" "}
              <Link className="font-semibold underline" href={linkAccountHref}>
                Link your accounts
              </Link>{" "}
              so you can use either sign-in method.
            </p>
          </div>
        )}
        <SignInPrompt />
        {/* <button
          onClick={() => signIn("github", { callbackUrl: callbackUrl })}
          className="inline-flex items-center justify-center rounded-full border border-zinc-600 bg-zinc-900/80 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Sign in with GitHub
        </button> */}
      </main>
    </div>
  );
}
