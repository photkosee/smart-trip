import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "@/app/globals.css";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import StoreProvider from "@/app/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Trip",
  description:
    "Create, customize, and optimize your itineraries with this free AI trip planner. Perfect for vacations, workations, and everyday adventures.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <GoogleOAuthProvider
            clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}
          >
            <Header />
            {children}
            <Footer />
          </GoogleOAuthProvider>
        </StoreProvider>
        <Toaster />
      </body>
    </html>
  );
}
