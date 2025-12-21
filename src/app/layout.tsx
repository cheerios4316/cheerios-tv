import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Metadata } from "next";
import { getSettings } from "@/helpers/settings";

export const metadata: Metadata = await (async () => {
  const settingsMeta = (await getSettings())?.metadata;

  return {
    ...settingsMeta,
    title: settingsMeta?.title || "cheerios-tv",
    description: settingsMeta?.description || "default cheerios-tv description",
  };
})();

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
