import { NextResponse } from "next/server";
import { pool } from "~/lib/db"; // Database connection

export async function POST(request: Request) {
  try {
    const { userId, flightId, amount } = await request.json();

    if (!userId || !flightId || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Update credits in the database
    const result = await pool.query(
      "UPDATE user_flights SET voucher_amount = voucher_amount - $1 WHERE user_id = $2 AND flight_id = $3 AND voucher_amount >= $1 RETURNING voucher_amount",
      [amount, userId, flightId],
    );

    if (result.rowCount === 0) {
      return NextResponse.json(
        { error: "Insufficient credits or invalid request" },
        { status: 400 },
      );
    }

    return NextResponse.json({
      success: true,
      remainingCredits: result.rows[0].voucher_amount,
    });
  } catch (error) {
    console.error("Error using credits:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
