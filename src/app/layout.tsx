import type { Metadata } from "next";
import "./globals.css";
import PriceTicker from "@/components/PriceTicker";

export const metadata: Metadata = {
  title: "DRIP | Premium Jewelry POS",
  description: "Next-Gen Jewelry Shop Management System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased dark" style={{ display: 'flex', flexDirection: 'column' }}>
        <PriceTicker />
        {children}
      </body>
    </html>
  );
}
