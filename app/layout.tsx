import "../global.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: "Sara",
    template: "%s | sarahrettig.com",
  },
  description: "Co-founder of unkey.dev and founder of sarahkimirettig.com",
  openGraph: {
    title: "sarahrettig.com",
    description:
      "Co-founder of unkey.dev and founder of sarahkimirettig.com",
    url: "https://sarahrettig.com",
    siteName: "sarahrettig.com",
    images: [
      {
        url: "https://sarahrettig.com/og.png",
        width: 1920,
        height: 1080,
      },
    ],
    locale: "en-US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "sarahrettig",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.png",
  },
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const rubikmoonrocks = localFont({
  src: "../app/fonts/rubikmoonrocks-regular-webfont.woff",
  variable: "--font-rubikmoonrocks",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={[inter.variable, rubikmoonrocks.variable].join(" ")}>
      <head>
        <Analytics />
      </head>
      <body
        className={`bg-rose-600 ${process.env.NODE_ENV === "development" ? "debug-screens" : undefined}`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
