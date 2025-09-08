// app/api/cars/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const runtime = 'nodejs';

function isDev() {
  return process.env.NODE_ENV !== 'production';
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const statusParam = searchParams.get('status');
    const status = statusParam === 'sold' ? 'sold' : statusParam === 'active' ? 'active' : undefined;
    const cars = await prisma.car.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: 'desc' },
    });
    return NextResponse.json(cars);
  } catch (e: any) {
    console.error('[GET /api/cars] ERROR:', e?.code || e?.message || e);
    // DEV fallback: pozwól UI działać lokalnie nawet gdy DB nie gotowa
    if (isDev()) {
      return NextResponse.json([], { status: 200 });
    }
    return NextResponse.json({ error: 'Failed to fetch cars' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const {
      title,
      year,
      engine,
      mileage,
      price_text,
      status,
      main_image_path,
    } = body || {};

    if (!title || !year || !engine || typeof mileage !== 'number') {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }
    const car = await prisma.car.create({
      data: {
        title,
        year: Number(year),
        engine,
        mileage: Number(mileage),
        price_text: price_text ?? null,
        status: status === 'sold' ? 'sold' : 'active',
        main_image_path: main_image_path ?? null,
      },
    });
    return NextResponse.json(car, { status: 201 });
  } catch (e: any) {
    console.error('[POST /api/cars] ERROR:', e?.code || e?.message || e);
    // DEV fallback: zwróć echo, by UI nie pękał lokalnie
    if (isDev()) {
      return NextResponse.json(
        {
          id: crypto.randomUUID(),
          createdAt: new Date(),
          updatedAt: new Date(),
          ...((await req.json().catch(() => ({}))) || {}),
          status: 'active',
        },
        { status: 201 }
      );
    }
    return NextResponse.json({ error: 'Failed to create car' }, { status: 500 });
  }
}
