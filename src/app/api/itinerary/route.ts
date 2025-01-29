import { NextResponse } from "next/server";
import { db } from "~/server/db";

interface ItineraryPostRequest {
    userId: string,
    name: string,
    data: string
}

interface ItineraryDeleteRequest {
    userId: string,
    itineraryId: number
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
        return NextResponse.json(
          { error: "'userId' is required." },
          { status: 400 },
        );
    }

    const result = await db.itinerary.findMany({
        where: {
            userId
        }
    });

    return NextResponse.json(result);
}


export async function POST(request: Request) {
    const { userId, name, data } = await request.json() as ItineraryPostRequest;
    
    const createdItinerary = await db.itinerary.create({
        data: {
            userId,
            name: name,
            itineraryData: data
        }
    })

    return NextResponse.json(createdItinerary)
}

export async function DELETE(request: Request) {
    const { userId, itineraryId } = await request.json() as ItineraryDeleteRequest;
    
    const deletedItinerary = await db.itinerary.delete({
        where: {
            userId,
            itineraryId
        }
    })

    return NextResponse.json(deletedItinerary)
}
  