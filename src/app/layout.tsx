import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "EQMind - Master Your Emotional Intelligence",
  description: "Develop self-awareness, improve relationships, and make better decisions with our science-backed emotional intelligence training platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
