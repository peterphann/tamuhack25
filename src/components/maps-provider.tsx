'use client';

import { LoadScript } from '@react-google-maps/api';
import type { ReactNode } from 'react';

const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

const MapsProvider = ({ children }: { children: ReactNode }) => {

  if (!GOOGLE_API_KEY) {
    return children;
  }

  return (
    <LoadScript googleMapsApiKey={GOOGLE_API_KEY}>
      {children}
    </LoadScript>
  );
};

export default MapsProvider;
