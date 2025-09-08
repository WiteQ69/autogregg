// app/api/cars/route.ts  (WERSJA POD VERCEL BLOB)
import { NextResponse } from 'next/server'
import { readCars, writeCars } from '@/lib/cars-db'

export const runtime = 'nodejs'

export async function GET() {
  const cars = await readCars()
  return NextResponse.json(cars, { headers: { 'Cache-Control': 'no-store' } })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const cars = await readCars()

    const now = new Date().toISOString()
    const newCar = {
      id: crypto.randomUUID(),
      status: 'active',
      createdAt: now,
      updatedAt: now,
      ...body,
    }

    cars.unshift(newCar)
    await writeCars(cars)
    return NextResponse.json(newCar, { status: 201 })
  } catch (e) {
    console.error('POST /api/cars error:', e)
    return NextResponse.json({ error: 'Invalid request data' }, { status: 400 })
  }
}
