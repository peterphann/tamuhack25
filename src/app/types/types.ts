interface Location {
    code: string,
    city: string,
    timezone: string,
    location: {
        latitude: number,
        longitude: number,
    },
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