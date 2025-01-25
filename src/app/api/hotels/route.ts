import { NextResponse } from "next/server";
import axios from "axios";

const GOOGLE_PLACES_API_URL =
  "https://maps.googleapis.com/maps/api/place/nearbysearch/json";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");
  const maxPrice = searchParams.get("maxPrice");
  const currency = searchParams.get("currency") || "USD";

  if (!latitude || !longitude) {
    return NextResponse.json(
      { error: "latitude and longitude are required parameters." },
      { status: 400 },
    );
  }

  try {
    const apiKey = process.env.GOOGLE_API_KEY;

    if (!apiKey) {
      console.error("Google API Key is missing");
      return NextResponse.json(
        { error: "Server misconfiguration: missing Google API Key." },
        { status: 500 },
      );
    }

    // Fetch hotels near the specified location
    const response = await axios.get(GOOGLE_PLACES_API_URL, {
      params: {
        location: `${latitude},${longitude}`,
        radius: 5000, // Search within 5km
        type: "lodging", // Type for hotels/lodging
        maxprice: maxPrice, // Google's price levels (1–4)
        key: apiKey,
      },
    });

    console.log(response.data.results);
    const hotels = response.data.results.map((hotel: any) => ({
      name: hotel.name,
      address: hotel.vicinity,
      rating: hotel.rating || "N/A",
      priceLevel: hotel.price_level || "N/A",
      link: `https://www.google.com/maps/place/?q=place_id:${hotel.place_id}`,
    }));

    return NextResponse.json(hotels);
  } catch (error: any) {
    console.error("Error fetching hotel data:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch hotel data.", details: error.message },
      { status: 500 },
    );
  }
}
