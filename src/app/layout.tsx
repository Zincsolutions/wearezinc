import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

// This layout only wraps app-router pages (blog routes, not-found).
// The ported static pages in public/_wf/ are complete HTML documents
// served via rewrites and never touch this tree.
export const metadata: Metadata = {
  title: "ZINC | AI-Driven Digital Strategy & Design Agency",
  description:
    "ZINC brings 25+ years of strategy, design, and technology together to help brands stay visible in the AI era.",
  icons: {
    icon: {
      url: "/wf/695bda13c7c5d5a8fcdb45fc_zinc_fav.png",
      type: "image/png",
      sizes: "32x32",
    },
    shortcut: "/wf/695bda13c7c5d5a8fcdb45fc_zinc_fav.png",
    apple: "/wf/695bda13c7c5d5a8fcdb45fd_zinc_webclip.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
