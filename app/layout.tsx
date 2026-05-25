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
    default: "AgencyX — Digital Development Studio",
    template: "%s | AgencyX",
  },
  description:
    "A digital development studio building custom websites, web applications, and UI/UX design for teams that value speed and quality.",
  metadataBase: new URL("https://agencyx.example"),
  openGraph: {
    title: "AgencyX — Digital Development Studio",
    description: "Custom websites, web apps, and design systems built for teams who ship fast.",
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
