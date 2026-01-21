import "../global.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { Metadata } from "next";
import { Analytics } from "./components/analytics";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: {
    default: "Sarah Kimi Rettig",
    template: "%s | sarahkimirettig.com",
  },
  description: "Portfolio of Sarah Kimi Rettig",
  openGraph: {
    title: "sarahrettig.com",
    description:
      "Web Developer and Designer",
    url: "https://sarahrettig.com",
    siteName: "sarahrettig.com",
    images: [
      {
        url: "https://sarahkimirettig.com/og.png",
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

  icons: {
    shortcut: "/favicon.png",
  },
};
const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const rubikmoonrocks = localFont({
  src: "../public/fonts/Lexend-VariableFont_wght.ttf",
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
        className={` ${process.env.NODE_ENV === "development" ? "debug-screens" : undefined}`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
