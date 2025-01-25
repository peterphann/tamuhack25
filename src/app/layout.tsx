import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { Afacad } from "next/font/google";

import { type Metadata } from "next";

import { TRPCReactProvider } from "~/trpc/react";
import { SessionProvider } from "next-auth/react";

const afacad = Afacad({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-afacad",
});

export const metadata: Metadata = {
  title: "Flock",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SessionProvider>
      <html lang="en" className={`${GeistSans.variable} ${afacad.variable}`}>
        <body>
          <TRPCReactProvider>{children}</TRPCReactProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
