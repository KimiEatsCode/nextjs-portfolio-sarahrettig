import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions, addLinkedProvider } from "@/lib/auth";

type CallbackSearchParams = {
	provider?: string;
	error?: string;
};

export default async function LinkAccountCallbackPage({
	searchParams,
}: {
	searchParams?: CallbackSearchParams;
}) {
	const session = await getServerSession(authOptions);

	if (!session?.user?.id) {
		return redirect("/login");
	}

	const providerId = searchParams?.provider;
	const errorParam = searchParams?.error;

	if (!errorParam && providerId) {
		await addLinkedProvider(session.user.id, providerId);
		return redirect(
			`/link-account?status=linked&provider=${encodeURIComponent(
				providerId,
			)}`,
		);
	}

	const targetUrl = errorParam
		? `/link-account?status=error&error=${encodeURIComponent(errorParam)}`
		: "/link-account";

	return redirect(targetUrl);
}
