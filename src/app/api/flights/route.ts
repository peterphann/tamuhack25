import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get("date");
  const flightNumber = searchParams.get("flightNumber");

  if (!date || !flightNumber) {
    return NextResponse.json(
      { error: "Both 'date' and 'flightNumber' are required." },
      { status: 400 },
    );
  }

  const apiUrl = `https://flight-engine-cf28.onrender.com/flights?date=${date}&flightNumber=${flightNumber}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch flight data." },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Something went wrong while fetching flight data." },
      { status: 500 },
    );
  }
}
