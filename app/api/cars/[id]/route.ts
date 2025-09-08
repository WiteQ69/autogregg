// app/api/cars/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export const runtime = 'nodejs';

export async function GET(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const car = await prisma.car.findUnique({ where: { id: params.id } });
    if (!car) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(car);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to fetch car' }, { status: 500 });
  }
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  try {
    const body = await req.json();
    const car = await prisma.car.update({
      where: { id: params.id },
      data: {
        title: body.title,
        year: body.year != null ? Number(body.year) : undefined,
        engine: body.engine,
        mileage: body.mileage != null ? Number(body.mileage) : undefined,
        price_text: body.price_text ?? undefined,
        status: body.status === 'sold' ? 'sold' : body.status === 'active' ? 'active' : undefined,
        main_image_path: body.main_image_path ?? undefined,
      },
    });
    return NextResponse.json(car);
  } catch (e) {
    return NextResponse.json({ error: 'Failed to update car' }, { status: 500 });
  }
}

export async function DELETE(_req: NextRequest, { params }: { params: { id: string } }) {
  try {
    await prisma.car.delete({ where: { id: params.id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: 'Failed to delete car' }, { status: 500 });
  }
}
