'use client';
import { useState } from 'react';
import Image from 'next/image';

export default function Gallery({ value, onChange }: { value?: string | null; onChange: (url: string | null) => void }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const fd = new FormData();
      fd.append('file', file);
      const res = await fetch('/api/upload', { method: 'POST', body: fd });
      if (!res.ok) throw new Error('Upload failed');
      const { url } = await res.json();
      onChange(url);
    } catch (err: any) {
      setError(err.message ?? 'Upload error');
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="space-y-3">
      {value ? (
        <div className="relative w-full max-w-sm aspect-video">
          <Image src={value} alt="car" fill className="object-cover rounded-md" />
        </div>
      ) : (
        <p className="text-sm text-gray-500">Brak obrazu</p>
      )}
      <div className="flex items-center gap-2">
        <input type="file" accept="image/*" onChange={handleFile} disabled={uploading} />
        {value && (
          <button type="button" className="px-3 py-1 rounded-md border" onClick={() => onChange(null)}>
            Usuń obraz
          </button>
        )}
      </div>
      {uploading && <p className="text-sm">Wysyłanie…</p>}
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
}
