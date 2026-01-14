---
name: Add Gmail SignIn
overview: Add Google provider to auth flow and expose both GitHub and Gmail sign-in buttons without breaking existing client/server boundaries.
todos:
  - id: auth-update
    content: Update `/app/api/auth/[...nextauth]/route.ts` to register the Google provider alongside GitHub, using existing callback config.
    status: completed
  - id: ui-update
    content: Refresh `SignInPrompt` to offer both GitHub and Gmail sign-in buttons while remaining a client component.
    status: completed
---

## Plan

- Update [`app/components/sign-in-prompt.tsx`](app/components/sign-in-prompt.tsx) to render both GitHub and Gmail buttons (or icons) and call `signIn` with the appropriate provider id while keeping visual styles consistent and non-interactive wrappers minimal.
- Ensure NextAuth knows about the Google provider by adjusting [`app/api/auth/[...nextauth]/route.ts`](app/api/auth/[...nextauth]/route.ts) to import `GoogleProvider` (and any existing GitHub provider configuration) and add it to `NextAuth` providers list, using the same callback URL config if already set for GitHub.
- Verify that any environment variables for Google client ID/secret are defined (e.g., `.env.local` entries) or note in plan summary if they need to be added before running the app.
- Run `npm run dev` (or relevant checks) after updates to confirm client/server boundaries remain correct and no new errors appear.

Todos:

- auth-update: Add Google provider to NextAuth config.
- ui-update: Render Gmail button alongside GitHub button in `SignInPrompt` so users can choose either option.