import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const bodyFont = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const displayFont = Playfair_Display({
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
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  } catch (_) {}
})();
`;

export const metadata: Metadata = {
  title: {
    default: "AgencyX — Premium Digital Agency",
    template: "%s | AgencyX",
  },
  description:
    "A premium digital agency landing page built with Next.js 14, TypeScript, and modern design principles.",
  metadataBase: new URL("https://agencyx.example"),
  openGraph: {
    title: "AgencyX — Premium Digital Agency",
    description: "Transforming visions into conversion-focused digital experiences.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${bodyFont.variable} ${displayFont.variable} dark`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
        {children}
      </body>
    </html>
  );
}
