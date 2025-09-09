"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectItem } from "@/components/ui/select"
import { ImageUpload } from "@/components/ui/image-upload"
import { CAR_BRANDS, CAR_MODELS } from "@/lib/constants"

export default function NewCarPage() {
  const router = useRouter()
  const [brand, setBrand] = useState<string>("")
  const [model, setModel] = useState<string>("")
  const [year, setYear] = useState<number | undefined>(undefined)
  const [price, setPrice] = useState<number | undefined>(undefined)
  const [mileage, setMileage] = useState<number | undefined>(undefined)
  const [description, setDescription] = useState<string>("")
  const [images, setImages] = useState<File[]>([])

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const uploaded: string[] = []
    for (const f of images) {
      const buf = await f.arrayBuffer()
      const base64 = `data:${f.type};base64,${Buffer.from(buf).toString("base64")}`
      uploaded.push(base64)
    }
    const res = await fetch("/api/cars", {
      method: "POST", headers: { "content-type": "application/json" },
      body: JSON.stringify({ id: crypto.randomUUID(), brand, model, year, price, mileage, description, images: uploaded })
    })
    if (!res.ok) { alert("Nie udało się dodać samochodu"); return }
    router.push("/admin/page")
  }

  return (
    <main className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Nowy samochód</h1>
      <form className="space-y-4" onSubmit={onSubmit}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div><Label>Marka</Label><Select value={brand} onValueChange={setBrand} placeholder="Wybierz markę">{CAR_BRANDS.map(b => <SelectItem key={b} value={b}>{b}</SelectItem>)}</Select></div>
          <div><Label>Model</Label><Select value={model} onValueChange={setModel} placeholder="Wybierz model">{(CAR_MODELS[brand] || []).map(m => <SelectItem key={m} value={m}>{m}</SelectItem>)}</Select></div>
          <div><Label>Rok</Label><Input type="number" value={year ?? ""} onChange={e => setYear(e.target.value ? Number(e.target.value) : undefined)} /></div>
          <div><Label>Cena (PLN)</Label><Input type="number" value={price ?? ""} onChange={e => setPrice(e.target.value ? Number(e.target.value) : undefined)} /></div>
          <div><Label>Przebieg (km)</Label><Input type="number" value={mileage ?? ""} onChange={e => setMileage(e.target.value ? Number(e.target.value) : undefined)} /></div>
        </div>
        <div><Label>Opis</Label><Textarea value={description} onChange={e => setDescription(e.target.value)} rows={5} /></div>
        <div><Label>Zdjęcia</Label><ImageUpload images={images} onImagesChange={setImages} /></div>
        <div className="pt-4"><Button type="submit">Zapisz</Button></div>
      </form>
    </main>
  )
}
