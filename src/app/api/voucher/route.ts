import { NextResponse } from "next/server";
import { pool } from "~/lib/db"; // Replace this with your database connection setup

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  const flightId = searchParams.get("flightId");

  if (!userId || !flightId) {
    return NextResponse.json(
      { error: "Missing userId or flightId in query params" },
      { status: 400 },
    );
  }

  try {
    const result = await pool.query(
      "SELECT voucher_amount FROM user_flights WHERE user_id = $1 AND flight_id = $2 LIMIT 1",
      [userId, flightId],
    );
    console.log(result);
    if (result.rows.length === 0) {
      return NextResponse.json({ voucherAmount: 0 });
    }

    const { voucher_amount } = result.rows[0];
    return NextResponse.json({ voucherAmount: voucher_amount });
  } catch (error) {
    console.error("Error fetching voucher amount:", error);
    return NextResponse.json(
      { error: "Failed to fetch voucher amount" },
      { status: 500 },
    );
  }
}
