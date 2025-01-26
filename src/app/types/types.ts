interface Location {
    code: string,
    city: string,
    timezone: string,
    location: {
        latitude: number,
        longitude: number,
    },
}

export interface Event {
    time: string,
    activity: string,
    description: string,
    location: string,
    website: string | null
}

export interface Itinerary {
    city: string,
    date: string,
    itinerary: Event[]
}

export interface Flight {
    flightNumber: string,
    origin: Location,
    destination: Location,
    distance: number,
    departureTime: string,
    arrivalTime: string,
    aircraft: {
        model: string,
        passengerCapacity: {
            total: number,
            main: number,
            first: number
        },
        speed: number
    }
}

export interface Car {
    make: string,
    model: string,
    year: string,
    rating: string,
    price: string,
    image: string
}

export interface FlightLocation {
    code: string,
    city: string,
    timezone: string,
    location: {
        latitude: number,
        longitude: number
    },
}

export interface AggregateFlightDetails {
    flight_id: string,
    date: string,
    flightNumber: string,
    origin: FlightLocation,
    destination: FlightLocation,
    distance: number,
    duration: {
        locale: string,
        hours: number,
        minutes: number
    },
    departureTime: string,
    arrivalTime: string,
    aircraft: {
        model: string,
        passengerCapacity: {
            total: number,
            main: number,
            first: number
        },
        speed: number
    }
    canceled: boolean
}

export interface UserFlightInfo {
    flights: AggregateFlightDetails[],
    canceled: boolean
}

export interface Flight {
    flightNumber: string,
    origin: FlightLocation,
    destination: FlightLocation,
    distance: number,
    duration: {
        locale: string,
        hours: number,
        minutes: number
    },
    departureTime: string,
    arrivalTime: string,
    aircraft: {
        model: string,
        passengerCapacity: {
            total: number,
            main: number,
            first: number
        },
        speed: number
    }
}

export interface Hotel {
    name: string,
    rating: number,
    photo: string,
    website: string,
    address: string
}