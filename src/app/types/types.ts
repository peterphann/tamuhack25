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