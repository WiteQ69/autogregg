"use client"
import Image from "next/image"
export default function Gallery({ images }: { images: string[] }) {
  return (
    <div className="grid grid-cols-2 gap-2">
      {images?.map((src, i) => (
        <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden border">
          <Image src={src || "/placeholder-car.jpg"} alt={"img"+i} fill className="object-cover" unoptimized={src.startsWith("data:")} />
        </div>
      ))}
    </div>
  )
}
