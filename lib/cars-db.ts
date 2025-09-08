// lib/cars-db.ts  (WERSJA POD VERCEL BLOB)
import { put } from '@vercel/blob'

const KEY = 'cars.json'

// Odczyt całej bazy aut z BLOB
export async function readCars(): Promise<any[]> {
  try {
    const url = `${process.env.BLOB_URL}/${KEY}`
    const res = await fetch(url, { cache: 'no-store' })
    if (res.ok) {
      return (await res.json()) as any[]
    }
    return []
  } catch (e) {
    console.error('readCars error:', e)
    return []
  }
}

// Zapis (nadpisanie) całej tablicy aut do BLOB
export async function writeCars(cars: any[]) {
  await put(KEY, JSON.stringify(cars, null, 2), {
    access: 'public',
    contentType: 'application/json',
    token: process.env.BLOB_READ_WRITE_TOKEN, // Vercel dodał ją automatycznie
  })
}

export function findCarIndex(cars: any[], id: string) {
  return cars.findIndex((c) => String(c.id) === String(id))
}
