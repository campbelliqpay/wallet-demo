import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "iQpay Wallet Demo",
  description: "iQpay mobile wallet demonstration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
