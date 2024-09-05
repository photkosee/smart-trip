"use client";

import { NewTripProvider } from "./NewTripContext";

export default function NewTripLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <NewTripProvider>{children}</NewTripProvider>;
}
