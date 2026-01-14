export type AuthProviderInfo = {
	id: string;
	signInLabel: string;
	linkLabel: string;
};

export const authProviders: AuthProviderInfo[] = [
	{
		id: "github",
		signInLabel: "Sign in with GitHub",
		linkLabel: "Link GitHub account",
	},
	{
		id: "google",
		signInLabel: "Sign in with Gmail",
		linkLabel: "Link Gmail account",
	},
];
