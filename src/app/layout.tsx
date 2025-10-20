import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const jetBrains = localFont({
  src: [
    {
      path: "../../public/fonts/jetbrains/JetBrainsMonoNerdFontMono-Regular.ttf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hicham Moulili — Portfolio",
  description: "Developer portfolio in a terminal interface",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jetBrains.variable} antialiased`}>{children}</body>
    </html>
  );
}
