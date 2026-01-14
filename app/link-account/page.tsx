import Link from "next/link";
import { redirect } from "next/navigation";
import { Navigation } from "@/app/components/nav";
import { LinkAccountPrompt } from "@/app/components/link-account-prompt";
import { authProviders } from "@/app/components/auth-providers";
import { getServerSession } from "next-auth";
import { authOptions, getLinkedProviderIds } from "@/lib/auth";

type SearchParams = {
	status?: string;
	provider?: string;
	error?: string;
};

export default async function LinkAccountPage({
	searchParams,
}: {
	searchParams?: SearchParams;
}) {
	const session = await getServerSession(authOptions);
	if (!session?.user?.id) {
		return redirect("/login");
	}

	const linkedProviders = await getLinkedProviderIds(session.user.id);
	const rawStatus = searchParams?.status;
	const providerId = searchParams?.provider;
	const errorParam = searchParams?.error;
	const providerLabel =
		providerId &&
		authProviders.find((provider) => provider.id === providerId)?.linkLabel;

	let statusMessage = "Choose another provider to keep both sign-in methods linked.";
	let statusIntent: "neutral" | "success" | "error" = "neutral";

	if (rawStatus === "linked" && providerLabel) {
		statusMessage = `${providerLabel} linked successfully.`;
		statusIntent = "success";
	} else if (rawStatus === "error" && errorParam) {
		statusMessage = `Linking failed: ${decodeURIComponent(errorParam)}.`;
		statusIntent = "error";
	}

	return (
		<div className="relative pb-16">
			<Navigation />
			<main className="px-6 pt-20 mx-auto max-w-3xl space-y-6 lg:px-8 md:space-y-10 md:pt-24 lg:pt-32">
				<div className="space-y-1 text-center">
					<p className="text-xs uppercase tracking-[0.4em] text-black">Account Linking</p>
					<h1 className="text-3xl font-bold text-black sm:text-4xl">
						Link another sign-in method
					</h1>
					<p className="text-sm text-zinc-600">
						You are signed in as{" "}
						<span className="font-semibold text-black">
							{session.user?.name ?? session.user?.email}
						</span>
						. Use the buttons below to attach another OAuth provider to this account.
					</p>
				</div>

				<div
					className={`rounded-2xl border px-6 py-5 ${
						statusIntent === "success"
							? "border-green-200 bg-green-50 text-green-800"
							: statusIntent === "error"
							? "border-red-200 bg-red-50 text-red-800"
							: "border-zinc-200 bg-zinc-50 text-zinc-900"
					}`}
				>
					<p className="text-sm font-semibold">{statusMessage}</p>
				</div>

				<div className="rounded-2xl border border-dashed border-black bg-white px-8 py-10 text-center text-sm text-black">
					<LinkAccountPrompt linkedProviders={linkedProviders} />
				</div>

				{linkedProviders.length > 0 && (
					<div className="rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-4 text-sm text-black">
						<p className="font-semibold">Already linked providers</p>
						<ul className="mt-2 flex flex-wrap gap-2">
							{linkedProviders.map((providerId) => {
								const info = authProviders.find(
									(provider) => provider.id === providerId,
								);
								return (
									<li
										key={providerId}
										className="rounded-full border border-black/10 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-black"
									>
										{info?.linkLabel ?? providerId}
									</li>
								);
							})}
						</ul>
					</div>
				)}

				<p className="text-center text-xs text-zinc-500">
					Once linked, you can sign in with any of the listed providers and still land in the same favorites account.
					{" "}
					<Link href="/courses" className="font-semibold underline">
						Back to favorites
					</Link>
				</p>
			</main>
		</div>
	);
}
