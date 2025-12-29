import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/navbar";
import { Footer } from "@/components/shared/footer";
import { CartSidebar } from "@/components/cart/cart-sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StyleStore - Modern E-commerce",
  description: "A premium shopping experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Navbar />
        <CartSidebar />
        <main className="min-h-screen bg-muted/20">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
