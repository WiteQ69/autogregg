// app/api/cars/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const runtime = 'nodejs'; // wymagane, bo używamy Node/Prisma

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get('status') as 'active' | 'sold' | null;
    const where = status ? { status } : {};
    const cars = await prisma.car.findMany({ where, orderBy: { createdAt: 'desc' } });
    return NextResponse.json(cars);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch cars' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { title, year, engine, mileage, price_text, status, main_image_path } = body;

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
  } catch (e) {
    return NextResponse.json({ error: 'Failed to create car' }, { status: 500 });
  }
}
