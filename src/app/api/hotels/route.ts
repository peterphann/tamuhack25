import { NextResponse } from "next/server";
import axios from "axios";
import type { PlaceDetailsResponseData, PlacesNearbyResponseData } from "@googlemaps/google-maps-services-js";

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
    
    const data = response.data as PlacesNearbyResponseData;

    const hotels = await Promise.all(
      data.results.map(async (hotel) => {
        // Fetch additional details for each hotel using the Place Details API
        const detailsResponse = await axios.get(GOOGLE_PLACE_DETAILS_API_URL, {
          params: {
            place_id: hotel.place_id,
            fields: "name,rating,photos,url,website,vicinity", // Added 'vicinity' to fetch the address
            key: apiKey,
          },
        });

        const data = detailsResponse.data as PlaceDetailsResponseData;
        const result = data.result;

        // Construct photo URL if photos are available
        const photoUrl =
          result.photos && result.photos.length > 0
            ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${result.photos[0]?.photo_reference}&key=${apiKey}`
            : null;

        return {
          name: result.name,
          rating: result.rating ?? "N/A",
          photo: photoUrl,
          website: result.website ?? result.url,
          address: result.vicinity ?? "Address not available",
          price: 100 // Address added here
        };
      }),
    );

    return NextResponse.json(hotels);
  } catch (error) {
    console.error("Error fetching hotel data:", error);
    return NextResponse.json(
      { error: "Failed to fetch hotel data.", details: error },
      { status: 500 },
    );
  }
}
