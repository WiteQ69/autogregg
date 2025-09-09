"use client"
import { useEffect } from "react"
import Link from "next/link"
import { useCarStore } from "@/store/car-store"
import { mockCars } from "@/data/mock-cars"
import CarCard from "@/components/ui/car-card"

export default function AdminHome() {
  const { cars, setCars } = useCarStore()
  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/cars"); const data = await res.json()
        if (Array.isArray(data) && data.length) setCars(data)
        else if (cars.length === 0) setCars(mockCars as any)
      } catch { if (cars.length === 0) setCars(mockCars as any) }
    }
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <main className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Panel admina</h1>
        <Link className="underline" href="/admin/cars/new">Dodaj samochód</Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.map((car) => <CarCard key={car.id} car={car as any} />)}
      </div>
    </main>
  )
}
