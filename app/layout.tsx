import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Muni On the Go",
  description: "Bus and train tracker for MUNI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="p-6">{children}</body>
    </html>
  );
}
