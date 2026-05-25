import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const bodyFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: "AgencyX — AI SaaS Launch Studio",
    template: "%s | AgencyX",
  },
  description:
    "A modern AI SaaS agency landing page blending technical clarity, bento product storytelling, and conversion-ready forms.",
  metadataBase: new URL("https://agencyx.example"),
  openGraph: {
    title: "AgencyX — AI SaaS Launch Studio",
    description: "Technical landing pages, AI workflow visuals, and conversion systems for ambitious teams.",
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={bodyFont.variable}>
      <body>{children}</body>
    </html>
  );
}
