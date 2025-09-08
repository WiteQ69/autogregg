'use client';
import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Gallery from './Gallery';

interface CarForm {
  title: string;
  year: number;
  engine: string;
  mileage: number;
  price_text?: string;
  status: 'active' | 'sold';
  main_image_path?: string | null;
}

export default function EditCarPage() {
  const router = useRouter();
  const params = useParams();
  const [car, setCar] = useState<CarForm | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch(`/api/cars/${params.id}`);
        if (!res.ok) throw new Error('Błąd pobierania auta');
        const data = await res.json();
        setCar(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [params.id]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!car) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch(`/api/cars/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(car),
      });
      if (!res.ok) throw new Error('Błąd zapisu');
      router.push(`/${process.env.NEXT_PUBLIC_ADMIN_PATH}/cars`);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <p>Ładowanie…</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!car) return <p>Nie znaleziono auta.</p>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
      <input
        type="text"
        value={car.title}
        onChange={(e) => setCar({ ...car, title: e.target.value })}
        placeholder="Tytuł"
        className="w-full border p-2 rounded"
      />
      <input
        type="number"
        value={car.year}
        onChange={(e) => setCar({ ...car, year: Number(e.target.value) })}
        placeholder="Rok"
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        value={car.engine}
        onChange={(e) => setCar({ ...car, engine: e.target.value })}
        placeholder="Silnik"
        className="w-full border p-2 rounded"
      />
      <input
        type="number"
        value={car.mileage}
        onChange={(e) => setCar({ ...car, mileage: Number(e.target.value) })}
        placeholder="Przebieg"
        className="w-full border p-2 rounded"
      />
      <input
        type="text"
        value={car.price_text ?? ''}
        onChange={(e) => setCar({ ...car, price_text: e.target.value })}
        placeholder="Cena"
        className="w-full border p-2 rounded"
      />
      <select
        value={car.status}
        onChange={(e) => setCar({ ...car, status: e.target.value as 'active' | 'sold' })}
        className="w-full border p-2 rounded"
      >
        <option value="active">Aktywne</option>
        <option value="sold">Sprzedane</option>
      </select>

      <Gallery value={car.main_image_path} onChange={(url) => setCar({ ...car, main_image_path: url })} />

      <button type="submit" disabled={saving} className="px-4 py-2 bg-blue-600 text-white rounded">
        {saving ? 'Zapisywanie…' : 'Zapisz'}
      </button>
    </form>
  );
}
