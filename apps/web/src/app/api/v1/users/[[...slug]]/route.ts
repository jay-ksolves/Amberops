// This file is deprecated and can be removed.
// All API logic is now handled by the standalone backend service.
import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({ message: 'This API endpoint is deprecated.' }, { status: 410 });
}

export async function POST() {
    return NextResponse.json({ message: 'This API endpoint is deprecated.' }, { status: 410 });
}
