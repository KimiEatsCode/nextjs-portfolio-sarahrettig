import Link from "next/link";
import { getServerSession } from "next-auth";
import { Navigation } from "../components/nav";
import { authOptions } from "@/lib/auth";
import { DeleteAccountPanel } from "../components/delete-account-panel";

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);
  const userLabel =
    session?.user?.name ?? session?.user?.email ?? "your account";
  const expiresAt = session?.user?.expiresAt
    ? new Date(session.user.expiresAt)
    : null;
  const millisecondsInDay = 1000 * 60 * 60 * 24;
  const rawDaysLeft =
    expiresAt != null
      ? Math.ceil((expiresAt.getTime() - Date.now()) / millisecondsInDay)
      : null;
  const daysLeft = rawDaysLeft != null ? Math.max(0, rawDaysLeft) : null;

  return (
    <div className="relative min-h-screen pb-16 bg-white">
      <Navigation />
      <main className="px-6 pt-20 mx-auto max-w-3xl space-y-10 lg:px-8 md:pt-24">
        <div className="space-y-3">
       
          <h1 className="text-3xl font-semibold text-zinc-900">Your account</h1>
          <p className="text-sm text-zinc-500">
            View the profile details you provided and manage linked projects or
            delete your account.
          </p>
        </div>

        {session?.user ? (
          <div className="space-y-8">
            <section className="rounded-2xl border border-zinc-200 bg-white px-6 py-8 shadow-sm shadow-zinc-100">
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-zinc-400">
                Signed in as
              </p>
              <p className="mt-2 text-2xl font-semibold text-zinc-900">
                {session.user.name ?? session.user.email}
              </p>
              {session.user.email && (
                <p className="mt-1 text-sm text-zinc-500">{session.user.email}</p>
              )}
              {daysLeft != null && (
                <p className="mt-3 text-sm text-red-600">
                  Account expires in {daysLeft} day{daysLeft === 1 ? "" : "s"}.
                </p>
              )}
            </section>
            <DeleteAccountPanel userLabel={userLabel} />
          </div>
        ) : (
          <section className="rounded-2xl border border-zinc-200 bg-white px-6 py-8 text-center shadow-sm shadow-zinc-100">
            <p className="text-lg font-semibold text-zinc-900">
              Sign in to manage your account
            </p>
            <p className="mt-2 text-sm text-zinc-500">
              <Link href="/login" className="underline">
                Log in
              </Link>{" "}
              to see profile details and delete account access.
            </p>
          </section>
        )}
      </main>
    </div>
  );
}
