"use client"

import { LoadScript } from "@react-google-maps/api";
import { SessionProvider } from "next-auth/react";
import { Navbar } from "~/app/_components/navbar";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SessionProvider>
      <Navbar />
      <main>
        <LoadScript googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_API_KEY}>
          {children}
        </LoadScript>
      </main>
    </SessionProvider>
  );
}
