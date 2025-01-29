import type { UserFlight } from "@prisma/client";
import { NextResponse } from "next/server";
import { db } from "~/server/db";
import type { FlightEngineData } from "~/types/api-types";

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
    const result: UserFlight[] = await db.userFlight.findMany({
      where: {
        userId
      }
    });

    // Fetch additional details from the flight engine for each flight
    const flights = await Promise.all(
      result.map(async (flight: UserFlight) => {
        const apiUrl = `https://flight-engine-cf28.onrender.com/flights?date=${flight.date}&flightNumber=${flight.flightId}`;
        const response = await fetch(apiUrl);

        if (!response.ok) {
          console.error(
            `Failed to fetch details for flight ID ${flight.flightId}`,
          );
          return {
            flightNumber: flight.flightId,
            error: "Failed to fetch flight details",
          };
        }

        const flightData: FlightEngineData[] = await response.json() as FlightEngineData[];
        const firstFlight = flightData[0];

        return {
          isCanceled: flight.isCanceled,
          date: flight.date,
          ...firstFlight,
        };
      }),
    );

    return NextResponse.json(flights, { status: 200 });
    
  } catch (error) {
    console.error("Error fetching flight data:", error);
    return NextResponse.json(
      { error: "Something went wrong while fetching flight data." },
      { status: 500 },
    );
  }
}
