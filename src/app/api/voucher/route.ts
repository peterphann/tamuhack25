import { type NextRequest, NextResponse } from 'next/server';
import { db } from '~/server/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const flightId = searchParams.get('flightId');

  if (!userId || !flightId) {
    return NextResponse.json(
      { error: 'Missing userId or flightId in query params' },
      { status: 400 },
    );
  }

  try {
    let voucherAmount = (
      await db.userFlight.findFirst({
        where: {
          userId,
          flightId,
        },
        select: {
          voucherAmount: true,
        },
      })
    )?.voucherAmount;

    if (voucherAmount == null) {
      voucherAmount = 0;
    }

    return NextResponse.json({ voucherAmount });
  } catch (error) {
    console.error('Error fetching voucher amount:', error);
    return NextResponse.json(
      { error: 'Failed to fetch voucher amount' },
      { status: 500 },
    );
  }
}

interface VoucherUpdateRequest {
  userId: string;
  flightId: string;
  amount: number;
}

export async function PUT(request: NextRequest) {
  const { userId, flightId, amount } =
    (await request.json()) as VoucherUpdateRequest;

  if (!userId || !flightId || !amount) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 },
    );
  }

  const result = await db.userFlight.update({
    where: {
      userId_flightId: {
        userId,
        flightId,
      },
    },
    data: {
      voucherAmount: amount,
    },
  });

  if (!result) {
    return NextResponse.json(
      { error: 'Insufficient credits or invalid request' },
      { status: 400 },
    );
  }

  return NextResponse.json({
    success: true,
    remainingCredits: result.voucherAmount,
  });
}
