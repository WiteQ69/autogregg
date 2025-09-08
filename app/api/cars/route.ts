// app/api/cars/route.ts
import { NextResponse } from "next/server";
import { readCars, writeCars } from "@/lib/cars-db";
export const runtime = "nodejs";

export async function GET() {
  const cars = await readCars();
  return NextResponse.json(cars);
}

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const cars = await readCars();
    const id = Date.now().toString();
    const newCar = { id, ...payload };
    cars.push(newCar);
    await writeCars(cars);
    return NextResponse.json(newCar, { status: 201 });
  } catch (e: any) {
    console.error("POST /api/cars error:", e);
    return NextResponse.json({ error: "Create failed", detail: e?.message ?? String(e) }, { status: 500 });
  }
}