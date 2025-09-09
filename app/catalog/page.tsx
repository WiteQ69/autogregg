"use client"
import * as React from "react"
import { useEffect } from "react"
import CarCard from "@/components/ui/car-card"
export default function CatalogPage() {
  const [cars, setCars] = React.useState<any[]>([] as any)
  useEffect(() => {
    const load = async () => {
      try { const res = await fetch("/api/cars"); const data = await res.json(); setCars(data || []) }
      catch { setCars([]) }
    }
    load()
  }, [])
  return (
    <main className="max-w-6xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Katalog</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.map((car) => <CarCard key={car.id} car={car} />)}
      </div>
    </main>
  )
}
