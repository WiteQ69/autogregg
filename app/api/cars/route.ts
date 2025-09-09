import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

const memory = { cars: [] as any[] };

export async function GET() {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ cars: memory.cars }, { status: 200 });
    }
    const cars = await prisma.car.findMany({ orderBy: { createdAt: "desc" } });
    return NextResponse.json({ cars });
  } catch (e) {
    console.error("GET /api/cars error", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const payload = {
      title: body.title ?? `${body.brand} ${body.model} ${body.year}`,
      brand: body.brand,
      model: body.model,
      year: Number(body.year),
      engine: body.engine ?? null,
      price: Number(body.price),
      mileage: Number(body.mileage),
      fuelType: body.fuelType,
      transmission: body.transmission,
      bodyType: body.bodyType ?? null,
      drivetrain: body.drivetrain ?? null,
      power: body.power ? Number(body.power) : null,
      displacement: body.displacement ? Number(body.displacement) : null,
      color: body.color ?? null,
      owners: body.owners ? Number(body.owners) : null,
      accidentFree: Boolean(body.accidentFree),
      serviceHistory: Boolean(body.serviceHistory),
      vin: body.vin ?? null,
      location: body.location,
      status: body.status === "sold" ? "sold" : "active",
      images: Array.isArray(body.images) ? body.images : [],
    };

    if (!process.env.DATABASE_URL) {
      const car = { ...payload, id: crypto.randomUUID(), createdAt: new Date(), updatedAt: new Date() };
      memory.cars.unshift(car);
      return NextResponse.json({ car }, { status: 201 });
    }

    const car = await prisma.car.create({ data: payload });
    return NextResponse.json({ car }, { status: 201 });
  } catch (e) {
    console.error("POST /api/cars error", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}