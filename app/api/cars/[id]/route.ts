import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const memory = { cars: [] as any[] };

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!process.env.DATABASE_URL) {
      const car = memory.cars.find((c) => c.id === id);
      if (!car) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json({ car });
    }
    const car = await prisma.car.findUnique({ where: { id } });
    if (!car) return NextResponse.json({ error: "Not found" }, { status: 404 });
    return NextResponse.json({ car });
  } catch (e) {
    console.error("GET /api/cars/[id] error", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    const body = await req.json();

    if (!process.env.DATABASE_URL) {
      const idx = memory.cars.findIndex((c) => c.id === id);
      if (idx === -1) return NextResponse.json({ error: "Not found" }, { status: 404 });
      memory.cars[idx] = { ...memory.cars[idx], ...body, updatedAt: new Date() };
      return NextResponse.json({ car: memory.cars[idx] });
    }

    const car = await prisma.car.update({
      where: { id },
      data: {
        ...body,
        year: body.year ? Number(body.year) : undefined,
        price: body.price ? Number(body.price) : undefined,
        mileage: body.mileage ? Number(body.mileage) : undefined,
        power: body.power ? Number(body.power) : undefined,
        displacement: body.displacement ? Number(body.displacement) : undefined,
        status: body.status === "sold" ? "sold" : body.status === "active" ? "active" : undefined,
      },
    });
    return NextResponse.json({ car });
  } catch (e) {
    console.error("PATCH /api/cars/[id] error", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = params;
    if (!process.env.DATABASE_URL) {
      const before = memory.cars.length;
      const left = memory.cars.filter((c) => c.id !== id);
      memory.cars.length = 0;
      memory.cars.push(...left);
      if (left.length === before) return NextResponse.json({ error: "Not found" }, { status: 404 });
      return NextResponse.json({ ok: true });
    }
    await prisma.car.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("DELETE /api/cars/[id] error", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}