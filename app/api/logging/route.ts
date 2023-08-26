import { clickArticle } from '@/app/_lib/client';
import { Request } from 'next/dist/compiled/@edge-runtime/primitives';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const id = parseInt(searchParams.get('id') as string);
  clickArticle(id).catch();
  const response = { id };
  return NextResponse.json(response);
}
