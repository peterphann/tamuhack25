import type { FlightEngineData } from './api-types';

export interface Event {
  time: string;
  activity: string;
  description: string;
  location: string;
  website: string | null;
}

export interface Car {
  make: string;
  model: string;
  year: string;
  rating: string;
  price: string;
  image: string;
}

export interface Flight extends FlightEngineData {
  isCanceled: boolean;
  date: string;
}

export interface HotelResponseData {
  name: string;
  rating: number;
  photo: string;
  website: string;
  address: string;
  price: number;
}
