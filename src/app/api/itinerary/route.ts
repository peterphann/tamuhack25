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

    const result = await db.itineraries.findMany({
        where: {
            user_id: userId
        }
    })

    return NextResponse.json(result);
}

export async function POST(request: Request) {
    const { userId, name, data } = await request.json()
    
    const createdItinerary = await db.itineraries.create({
        data: {
            user_id: userId,
            name: name,
            itinerary_data: data
        }
    })

    return NextResponse.json(createdItinerary)
}

export async function DELETE(request: Request) {
    const { userId, itineraryId } = await request.json()
    
    const deletedItinerary = await db.itineraries.delete({
        where: {
            user_id: userId,
            itinerary_id: itineraryId
        }
    })

    return NextResponse.json(deletedItinerary)
}
  