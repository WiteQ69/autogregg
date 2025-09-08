// app/api/cars/route.ts — obsługa listy aut
import { NextResponse } from "next/server";
import { readCars, writeCars } from "@/lib/cars-db";

export const runtime = "nodejs";

export async function GET() {
  const cars = await readCars();
  return NextResponse.json(cars, { headers: { "Cache-Control": "no-store" } });
}

function nowISO() {
  return new Date().toISOString();
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const cars = await readCars();

    const id = body.id ?? String(Date.now());
    const newCar = {
      id,
      title: body.title ?? "Nowa oferta",
      year: Number(body.year) || null,
      mileage: body.mileage ?? null,
      engine: body.engine ?? null,
      price_text: body.price_text ?? null,
      status: body.status ?? "active",
      main_image_path: body.main_image_path ?? null,
      images: Array.isArray(body.images) ? body.images : [],
      video_url: body.video_url ?? null,
      firstOwner: Boolean(body.firstOwner),
      createdAt: nowISO(),
      updatedAt: nowISO(),
      ...body,
    };

    cars.unshift(newCar);
    await writeCars(cars);
    return NextResponse.json(newCar, { status: 201 });
  } catch (e) {
    console.error("POST /api/cars error:", e);
    return NextResponse.json({ error: "Invalid request data" }, { status: 400 });
  }
}
