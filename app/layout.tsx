import type { Metadata } from "next";
import { Fraunces, Manrope } from "next/font/google";
import "./globals.css";

const bodyFont = Manrope({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const themeScript = `
(function () {
  try {
    var storageKey = "agencyx-theme";
    var saved = window.localStorage.getItem(storageKey);
    var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    var theme = saved || (prefersDark ? "dark" : "light");
    document.documentElement.classList.toggle("dark", theme === "dark");
  } catch (_) {}
})();
`;

export const metadata: Metadata = {
  title: {
    default: "AgencyX — Launch-ready SaaS landing page",
    template: "%s | AgencyX",
  },
  description:
    "A modern SaaS and agency landing page with animated sections, pricing, dark mode, and a database-backed waitlist.",
  metadataBase: new URL("https://agencyx.example"),
  openGraph: {
    title: "AgencyX — Launch-ready SaaS landing page",
    description:
      "Animated Next.js landing page for teams that need a sharper launch surface.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bodyFont.variable} ${displayFont.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
