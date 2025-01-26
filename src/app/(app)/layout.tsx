import { SessionProvider } from "next-auth/react";
import { Navbar } from "~/app/_components/navbar";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SessionProvider>
      <Navbar />
      <main>
          {children}
      </main>
    </SessionProvider>
  );
}