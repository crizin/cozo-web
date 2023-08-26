import { sendMessage } from '@/app/_lib/client';
import { Request } from 'next/dist/compiled/@edge-runtime/primitives';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { token, message } = await request.json();
  const response = await sendMessage(token, message);
  const body = await response.json();
  return NextResponse.json(body);
}
