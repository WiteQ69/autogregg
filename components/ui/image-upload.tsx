// components/ui/image-upload.tsx
'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

export function ImageUpload({
  images,
  onImagesChange,
}: {
  images: File[];
  onImagesChange: (files: File[]) => void;
}) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      onImagesChange([...(images || []), ...acceptedFiles]);
    },
    [images, onImagesChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: true,
  });

  async function uploadAll() {
    setUploading(true);
    setError(null);
    try {
      // wyślij po kolei; API akceptuje "file" lub "files[]"
      for (const file of images) {
        const fd = new FormData();
        fd.append('file', file); // KLUCZ "file" — zgodny z API
        const res = await fetch('/api/upload', { method: 'POST', body: fd });
        if (!res.ok) {
          const j = await res.json().catch(() => ({}));
          throw new Error(j?.error || 'Upload failed');
        }
        const data = await res.json();
        // jeśli chcesz: zamień lokalny File na URL od Blob (opcjonalnie)
        // tutaj tylko pokazuję, że upload przeszedł
        console.log('Uploaded:', data.url || data.urls);
      }
    } catch (e: any) {
      setError(e?.message || 'Upload error');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      <div
        {...getRootProps()}
        className={`border rounded p-4 text-sm ${isDragActive ? 'bg-zinc-50' : ''}`}
      >
        <input {...getInputProps()} />
        {isDragActive ? 'Upuść tutaj...' : 'Przeciągnij i upuść obrazy lub kliknij, aby wybrać'}
      </div>

      {images?.length ? (
        <div className="text-sm text-zinc-600">{images.length} plik(i) w kolejce</div>
      ) : (
        <div className="text-sm text-zinc-500">Brak plików</div>
      )}

      <div className="flex gap-2">
        <button
          type="button"
          onClick={uploadAll}
          disabled={uploading || !images?.length}
          className="px-3 py-1 rounded bg-zinc-900 text-white disabled:opacity-50"
        >
          {uploading ? 'Wysyłanie...' : 'Wyślij'}
        </button>
        <button
          type="button"
          onClick={() => onImagesChange([])}
          className="px-3 py-1 rounded border"
        >
          Wyczyść
        </button>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
