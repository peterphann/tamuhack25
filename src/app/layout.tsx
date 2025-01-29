import '~/styles/globals.css';

import { GeistSans } from 'geist/font/sans';
import { type Metadata } from 'next';

import { TRPCReactProvider } from '~/trpc/react';
import AuthProvider from '../components/auth-provider';
import { Navbar } from '../components/navbar';
import MapsProvider from '../components/maps-provider';

export const metadata: Metadata = {
  title: 'Flock',
  description: 'Turn delays into fun days!',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <AuthProvider>
          <TRPCReactProvider>
            <MapsProvider>
              <Navbar />

              <main>{children}</main>
            </MapsProvider>
          </TRPCReactProvider>
        </AuthProvider>
      </body>
    </html>
  );
};

export default RootLayout;
