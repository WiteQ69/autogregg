// app/api/cars/[id]/route.ts  (WERSJA POD VERCEL BLOB)
import { NextResponse, type NextRequest } from 'next/server'
import { readCars, writeCars, findCarIndex } from '@/lib/cars-db'

export const runtime = 'nodejs'
type Ctx = { params: { id: string } }

export async function GET(_: NextRequest, { params }: Ctx) {
  const cars = await readCars()
  const car = cars.find((c) => String(c.id) === String(params.id))
  if (!car) return NextResponse.json({ error: 'Not found' }, { status: 404 })
  return NextResponse.json(car, { headers: { 'Cache-Control': 'no-store' } })
}

export async function PUT(req: NextRequest, { params }: Ctx) {
  try {
    const patch = await req.json()
    const cars = await readCars()
    const idx = findCarIndex(cars, params.id)
    if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })

    const updated = {
      ...cars[idx],
      ...patch,
      id: cars[idx].id,
      updatedAt: new Date().toISOString(),
    }
    cars[idx] = updated
    await writeCars(cars)
    return NextResponse.json(updated)
  } catch (e) {
    console.error('PUT /api/cars/[id] error:', e)
    return NextResponse.json({ error: 'Update failed' }, { status: 500 })
  }
}

export async function DELETE(_: NextRequest, { params }: Ctx) {
  try {
    const cars = await readCars()
    const idx = findCarIndex(cars, params.id)
    if (idx === -1) return NextResponse.json({ error: 'Not found' }, { status: 404 })
    const [removed] = cars.splice(idx, 1)
    await writeCars(cars)
    return NextResponse.json({ ok: true, removed })
  } catch (e) {
    console.error('DELETE /api/cars/[id] error:', e)
    return NextResponse.json({ error: 'Delete failed' }, { status: 500 })
  }
}
