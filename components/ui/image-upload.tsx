"use client"
import { useCallback } from "react"
import { useDropzone } from "react-dropzone"
export function ImageUpload({ images, onImagesChange }: { images: File[]; onImagesChange: (files: File[]) => void }) {
  const onDrop = useCallback((acceptedFiles: File[]) => { onImagesChange([...(images || []), ...acceptedFiles]) }, [images, onImagesChange])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop, accept: { "image/*": [] } })
  return (
    <div {...getRootProps()} className={"border border-dashed rounded-md p-6 text-sm " + (isDragActive ? "bg-zinc-50" : "")}>
      <input {...getInputProps()} />
      <p>Przeciągnij i upuść zdjęcia tutaj, lub kliknij aby wybrać pliki.</p>
      {images?.length ? <p className="mt-2 text-zinc-600">Wybrano: {images.length} plik(ów)</p> : null}
    </div>
  )
}
