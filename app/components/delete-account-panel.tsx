"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";

const CONFIRMATION_PHRASE = "delete my account";

type DeleteAccountPanelProps = {
	userLabel?: string;
};

export function DeleteAccountPanel({ userLabel }: DeleteAccountPanelProps) {
	const [isDeleting, setIsDeleting] = useState(false);
	const [error, setError] = useState<string | null>(null);
	const [confirmationValue, setConfirmationValue] = useState("");
	const [successMessage, setSuccessMessage] = useState<string | null>(null);

	const isConfirmationMatch =
		confirmationValue.trim().toLowerCase() === CONFIRMATION_PHRASE;
	const canSubmit =
		isConfirmationMatch && !isDeleting && successMessage === null;

	const handleDelete = async () => {
		if (!isConfirmationMatch || successMessage) {
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

			const label = userLabel ?? "your account";
			const message = `Account for ${label} has been deleted.`;
			setSuccessMessage(message);
			setIsDeleting(false);
			void signOut({ redirect: false });
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
			<p className="mt-3 text-xs text-red-800">
				Type &ldquo;{CONFIRMATION_PHRASE}&rdquo; exactly to enable the button.
			</p>
			<input
				type="text"
				aria-label="confirmation text for account deletion"
				className="mt-3 w-full rounded-full border border-red-300 bg-white px-4 py-2 text-sm text-red-900 focus:border-red-500 focus:outline-none"
				value={confirmationValue}
				onChange={(event) => setConfirmationValue(event.target.value)}
				placeholder={CONFIRMATION_PHRASE}
				disabled={Boolean(successMessage)}
			/>
			{error && <p className="mt-3 text-xs font-semibold text-red-700">{error}</p>}
			{successMessage && (
				<p className="mt-3 text-xs font-semibold text-red-900">{successMessage}</p>
			)}
			<button
				type="button"
				onClick={handleDelete}
				disabled={!canSubmit}
				className="mt-4 inline-flex items-center justify-center rounded-full border border-red-600 bg-red-600 px-5 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-red-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600 disabled:cursor-not-allowed disabled:bg-red-300 disabled:text-red-50"
			>
				{isDeleting ? "Deleting…" : "Delete my account"}
			</button>
		</div>
	);
}
