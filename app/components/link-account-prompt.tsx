"use client";

import { useState } from "react";
import { signIn, useSession } from "next-auth/react";
import { authProviders } from "./auth-providers";

type LinkAccountPromptProps = {
	linkedProviders: string[];
};

export function LinkAccountPrompt({ linkedProviders }: LinkAccountPromptProps) {
	const { status } = useSession();
	const [pendingProvider, setPendingProvider] = useState<string | null>(null);

	const isAuthenticating = status === "loading" || pendingProvider !== null;
	const statusMessage = pendingProvider
		? `Linking with ${pendingProvider}…`
		: "Link another provider to keep all your sign-in options in sync.";

	return (
		<div className="flex flex-col items-center gap-3 text-center">
			<p className="text-sm font-semibold text-black">{statusMessage}</p>
			<div className="flex flex-col gap-2 w-full max-w-sm">
				{authProviders.map((provider) => {
					const alreadyLinked = linkedProviders.includes(provider.id);

					return (
						<button
							key={provider.id}
							type="button"
							onClick={() => {
								setPendingProvider(provider.linkLabel);
								void signIn(provider.id, {
									callbackUrl: `/link-account/callback?provider=${encodeURIComponent(
										provider.id,
									)}`,
								});
							}}
							disabled={isAuthenticating || alreadyLinked}
							className="flex w-full items-center justify-center rounded-full border border-black bg-white px-6 py-3 text-sm font-semibold uppercase tracking-wide text-black transition hover:bg-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:border-zinc-400 disabled:text-zinc-400"
						>
							{alreadyLinked ? `${provider.linkLabel} (Linked)` : provider.linkLabel}
						</button>
					);
				})}
			</div>
		</div>
	);
}
