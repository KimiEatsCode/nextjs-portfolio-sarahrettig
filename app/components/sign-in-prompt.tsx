"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";

const providers = [
	{
		id: "github",
		label: "Sign in with GitHub",
	},
	{
		id: "google",
		label: "Sign in with Gmail",
	},
];

export function SignInPrompt() {
	const { status } = useSession();
	const [pendingProvider, setPendingProvider] = useState<string | null>(null);
	const callbackUrl =
		process.env.NODE_ENV === "development"
			? "http://localhost:3000/courses"
			: "/courses";

	const isAuthenticating = status === "loading" || pendingProvider !== null;
	const statusMessage =
		status === "authenticated"
			? "Sign in successful — redirecting to favorites…"
			: pendingProvider
			? `Signing in with ${pendingProvider}…`
			: "Sign in to view saved favorite projects";

	return (
		<div className="flex flex-col items-center gap-3 text-center">
			<p className="text-sm font-semibold text-black">{statusMessage}</p>
			<div className="flex flex-col gap-2 w-full max-w-sm">
				{providers.map((provider) => (
					<button
						key={provider.id}
						type="button"
						onClick={() => {
							setPendingProvider(provider.label);
							void signIn(provider.id, { callbackUrl });
						}}
						disabled={isAuthenticating}
						className="flex w-full items-center justify-center rounded-full border border-black bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:border-zinc-400 disabled:text-zinc-400"
					>
						{provider.label}
					</button>
				))}
			</div>
		</div>
	);
}
