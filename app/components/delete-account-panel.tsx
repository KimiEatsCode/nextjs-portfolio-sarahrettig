"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

export function DeleteAccountPanel() {
	const [isDeleting, setIsDeleting] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const handleDelete = async () => {
		const confirmed = window.confirm(
			"Delete your account and all saved favorites? This cannot be undone.",
		);
		if (!confirmed) {
			return;
		}

		setIsDeleting(true);
		setError(null);

		try {
			const response = await fetch("/api/account", { method: "DELETE" });
			if (!response.ok) {
				const payload = await response.json().catch(() => null);
				throw new Error(payload?.error ?? "Unable to delete account.");
			}

			await signOut({ callbackUrl: "/" });
		} catch (err) {
			setError(err instanceof Error ? err.message : "Unable to delete account.");
			setIsDeleting(false);
		}
	};

	return (
		<div className="rounded-2xl border border-red-200 bg-red-50 px-6 py-5 text-sm text-red-900">
			<p className="font-semibold text-red-900">Delete account</p>
			<p className="mt-2 text-red-800">
				This removes your profile, linked sign-in methods, and saved favorites.
			</p>
			{error && <p className="mt-3 text-xs font-semibold text-red-700">{error}</p>}
			<button
				type="button"
				onClick={handleDelete}
				disabled={isDeleting}
				className="mt-4 inline-flex items-center justify-center rounded-full border border-red-600 bg-red-600 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:cursor-not-allowed disabled:bg-red-300 disabled:text-red-50"
			>
				{isDeleting ? "Deleting…" : "Delete my account"}
			</button>
		</div>
	);
}
