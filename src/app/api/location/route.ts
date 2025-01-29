import type { GeocodeResponseData } from '@googlemaps/google-maps-services-js';
import { NextResponse } from 'next/server';

const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
        return NextResponse.json(
            { error: 'query is required.' },
            { status: 400 },
        );
    }

    const location = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${GOOGLE_API_KEY}`)
        .then(res => res.json())
        .then((data: GeocodeResponseData) => {
          console.log(`https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${GOOGLE_API_KEY}`)
            return data.results[0]?.geometry.location;
        })
        .catch(err => console.error(err));

    return NextResponse.json(location);
}
