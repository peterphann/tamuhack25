import { query } from "~/lib/db";
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
      },
    });
    console.log(result);

    const userFlights = result;

    // Fetch additional details from the flight engine for each flight
    const flightDetails = await Promise.all(
      userFlights.map(async (flight) => {
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
        console.log(flightData);
        return { ...flight, ...flightData }; // Merge local flight and fetched details
      }),
    );

    return NextResponse.json(flightDetails);
  } catch (error) {
    console.error("Error fetching flight data:", error);
    return NextResponse.json(
      { error: "Something went wrong while fetching flight data." },
      { status: 500 },
    );
  }
}
