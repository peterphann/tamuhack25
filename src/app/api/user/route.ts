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
    const result = await db.User.findMany({
      where: {
        id: userId,
      },
      select: {
        name: true,
        image: true,
      },
    });

    const user = result;
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user data:", error);
    return NextResponse.json(
      { error: "Something went wrong while fetching user data." },
      { status: 500 },
    );
  }
}
