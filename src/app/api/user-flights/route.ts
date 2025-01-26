import { NextResponse } from "next/server";
import { db } from "~/server/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("user_id");

  if (!userId) {
    return NextResponse.json(
      { error: "'user_id' is required." },
      { status: 400 },
    );
  }

  try {
    const result = await db.user_flights.findMany({
      where: {
        user_id: userId,
      },
      select: {
        flight_id: true,
        date: true,
        canceled: true,
      },
    });

    const userFlights = result;
    let hasCanceled = false;

    // Fetch additional details from the flight engine for each flight
    const flightDetails = await Promise.all(
      userFlights.map(async (flight: any) => {
        const apiUrl = `https://flight-engine-cf28.onrender.com/flights?date=${flight.date}&flightNumber=${flight.flight_id}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          console.error(
            `Failed to fetch details for flight ID ${flight.flight_id}`,
          );
          return {
            flight_id: flight.flight_id,
            error: "Failed to fetch flight details",
          };
        }

        const flightData = await response.json();

        // Extract only the first flight for the given flight ID
        const firstFlight = flightData[0];

        if (flight.canceled) hasCanceled = true;

        // Merge the basic flight info with the first detailed flight info
        return {
          flight_id: flight.flight_id,
          date: flight.date,
          flightNumber: firstFlight.flightNumber,
          origin: firstFlight.origin,
          destination: firstFlight.destination,
          departureTime: firstFlight.departureTime,
          arrivalTime: firstFlight.arrivalTime,
          distance: firstFlight.distance,
          duration: firstFlight.duration,
          aircraft: firstFlight.aircraft,
          canceled: flight.canceled,
        };
      }),
    );

    return NextResponse.json({
      flights: flightDetails,
      canceled: hasCanceled,
    });
  } catch (error) {
    console.error("Error fetching flight data:", error);
    return NextResponse.json(
      { error: "Something went wrong while fetching flight data." },
      { status: 500 },
    );
  }
}
