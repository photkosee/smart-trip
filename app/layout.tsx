import dynamic from "next/dynamic";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { GoogleOAuthProvider } from "@react-oauth/google";

import "@/app/globals.css";
import { Toaster } from "@/components/ui/toaster";
import StoreProvider from "@/app/StoreProvider";

const Header = dynamic(() => import("@/app/components/Header"), {
  ssr: false, // Disable SSR for this component
});
const Footer = dynamic(() => import("@/app/components/Footer"), {
  ssr: false,
});

const inter = Outfit({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Smart Trip",
  description:
    "Create, customize, and optimize your itineraries with this free AI trip planner. Perfect for vacations, workations, and everyday adventures.",
  authors: [{ name: "Phot Koseekrainiramon" }],
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
