import Image from "next/image"
import Link from "next/link"

async function getCar(id: string) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || ""}/api/cars`, { cache: "no-store" })
    const cars = await res.json()
    return (cars || []).find((c: any) => c.id === id)
  } catch { return null }
}

export default async function CarDetail({ params }: { params: { id: string } }) {
  const car = await getCar(params.id)
  if (!car) { return (<main className="max-w-4xl mx-auto p-6"><p>Nie znaleziono oferty.</p><Link className="underline" href="/catalog">Wróć</Link></main>) }
  const img = (car.images && car.images[0]) || car.main_image_path || "/placeholder-car.jpg"
  const isData = typeof img === "string" && img.startsWith("data:")
  return (
    <main className="max-w-5xl mx-auto p-6 space-y-6">
      <div className="relative aspect-[16/9] rounded-lg overflow-hidden border">
        <Image src={img} alt="car" fill className="object-cover" unoptimized={isData} />
      </div>
      <h1 className="text-2xl font-bold">{[car.brand, car.model, car.year].filter(Boolean).join(" ")}</h1>
      <p className="text-zinc-700">{car.description || "Brak opisu"}</p>
      <Link className="underline" href="/catalog">Powrót</Link>
    </main>
  )
}
