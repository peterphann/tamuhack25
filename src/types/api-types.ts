export interface FlightEngineLocation {
  code: string;
  city: string;
  timezone: string;
  location: {
    latitude: number;
    longitude: number;
  };
}

export interface FlightEngineAircraft {
  model: string;
  passengerCapacity: {
    total: number;
    main: number;
    first: number;
  };
  speed: number;
}

export interface FlightEngineDuration {
  locale: string;
  hours: number;
  minutes: number;
}

export interface FlightEngineData {
  flightNumber: string;
  origin: FlightEngineLocation;
  destination: FlightEngineLocation;
  distance: number;
  duration: FlightEngineDuration;
  departureTime: string;
  arrivalTime: string;
  aircraft: FlightEngineAircraft;
}

export interface VoucherResponseData {
  voucherAmount: number;
}
