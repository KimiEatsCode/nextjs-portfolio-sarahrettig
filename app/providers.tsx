"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { SessionProvider, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <SessionRefreshListener />
      {children}
    </SessionProvider>
  );
}

type SessionStatusUnion = "loading" | "authenticated" | "unauthenticated";
const SESSION_STATUS_LOADING: SessionStatusUnion = "loading";

function SessionRefreshListener() {
  const router = useRouter();
  const { status } = useSession();
  const previousStatus = useRef<SessionStatusUnion>(SESSION_STATUS_LOADING);
  const hasRefreshed = useRef(false);

  useEffect(() => {
    const isFreshSignIn =
      previousStatus.current === "unauthenticated" && status === "authenticated";

    if (!hasRefreshed.current && isFreshSignIn) {
      router.refresh();
      hasRefreshed.current = true;
    }

    if (status === "unauthenticated") {
      hasRefreshed.current = false;
    }

    previousStatus.current = status;
  }, [router, status]);

  return null;
}
