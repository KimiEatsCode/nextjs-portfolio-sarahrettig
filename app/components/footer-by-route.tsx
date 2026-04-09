"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./footer";

export const FooterByRoute: React.FC = () => {
  const pathname = usePathname();

  if (pathname === "/") {
    return null;
  }

  return <Footer />;
};
