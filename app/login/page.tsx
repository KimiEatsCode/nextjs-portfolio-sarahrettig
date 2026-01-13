"use client";

import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { Navigation } from "../components/nav";

export default function LoginPage() {
  const { data: session } = useSession();

  if (session) {
    return (
      <div className="relative pb-16">
        <Navigation />
        <div className="px-6 pt-20 mx-auto space-y-8 max-w-3xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32 text-center">
          <h1 className="text-3xl font-bold text-zinc-100">Already signed in</h1>
          <p className="text-zinc-400">
            You are signed in as {session.user?.name ?? session.user?.email}. Go to the{" "}
            <Link className="underline" href="/courses">
              courses
            </Link>{" "}
            dashboard or explore projects.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative pb-16">
      <Navigation />
      <main className="px-6 pt-20 mx-auto max-w-3xl space-y-6 lg:px-8 md:space-y-10 md:pt-24 lg:pt-32 text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">Member access</p>
        <h1 className="text-4xl font-bold text-white sm:text-5xl">Log in to your learning workspace</h1>
        <p className="text-zinc-400">
          Authenticate with GitHub to track your SCORM courses, progress, and grades.
        </p>
        <button
          onClick={() => signIn("github", { callbackUrl: "/courses" })}
          className="inline-flex items-center justify-center rounded-full border border-zinc-600 bg-zinc-900/80 px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:bg-zinc-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Sign in with GitHub
        </button>
      </main>
    </div>
  );
}
