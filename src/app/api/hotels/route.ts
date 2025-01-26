import { NextResponse } from "next/server";
import axios from "axios";

const GOOGLE_PLACES_API_URL =
  "https://maps.googleapis.com/maps/api/place/nearbysearch/json";
const GOOGLE_PLACE_DETAILS_API_URL =
  "https://maps.googleapis.com/maps/api/place/details/json";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const latitude = searchParams.get("latitude");
  const longitude = searchParams.get("longitude");
  const apiKey = process.env.GOOGLE_API_KEY;

  if (!latitude || !longitude) {
    return NextResponse.json(
      { error: "latitude and longitude are required parameters." },
      { status: 400 },
    );
  }

  try {
    // Fetch nearby hotels
    const response = await axios.get(GOOGLE_PLACES_API_URL, {
      params: {
        location: `${latitude},${longitude}`,
        radius: 5000, // Search within 5km
        type: "lodging",
        key: apiKey,
      },
    });

    const hotels = await Promise.all(
      response.data.results.map(async (hotel: any) => {
        // Fetch additional details for each hotel using the Place Details API
        const detailsResponse = await axios.get(GOOGLE_PLACE_DETAILS_API_URL, {
          params: {
            place_id: hotel.place_id,
            fields: "name,rating,photos,url,website,vicinity", // Added 'vicinity' to fetch the address
            key: apiKey,
          },
        });

        const details = detailsResponse.data.result;

        // Construct photo URL if photos are available
        const photoUrl =
          details.photos && details.photos.length > 0
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${details.photos[0].photo_reference}&key=${apiKey}`
            : null;

        return {
          name: details.name,
          rating: details.rating || "N/A",
          photo: photoUrl,
          website: details.website || details.url,
          address: details.vicinity || "Address not available", // Address added here
        };
      }),
    );

    return NextResponse.json(hotels);
  } catch (error: any) {
    console.error("Error fetching hotel data:", error.message);
    return NextResponse.json(
      { error: "Failed to fetch hotel data.", details: error.message },
      { status: 500 },
    );
  }
}
