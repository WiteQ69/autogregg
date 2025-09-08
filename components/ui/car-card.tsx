'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

// Jeśli masz swój typ, możesz go tu zaimportować zamiast `any`
type Car = {
  id: string;
  brand?: string;
  model?: string;
  year?: number;
  price?: number;
  price_text?: string | null;
  mileage?: number;
  status?: 'active' | 'sold';
  images?: string[];             // <-- może być undefined
  main_image_path?: string | null;
};

export default function CarCard({ car }: { car: Car }) {
  const [imageError, setImageError] = useState(false);

  // ZAWSZE zwróci string
  const primaryImage: string =
    imageError
      ? '/placeholder-car.jpg'
      : car.images?.[0] ??
        car.main_image_path ??
        '/placeholder-car.jpg';

  const isDataURL =
    typeof primaryImage === 'string' && primaryImage.startsWith('data:');

  const title =
    [car.brand, car.model, car.year].filter(Boolean).join(' ') || 'Samochód';

  const priceLabel =
    car.price_text ??
    (typeof car.price === 'number'
      ? new Intl.NumberFormat('pl-PL', {
          style: 'currency',
          currency: 'PLN',
          maximumFractionDigits: 0,
        }).format(car.price)
      : 'Cena do uzgodnienia');

  const mileageLabel =
    typeof car.mileage === 'number'
      ? `${car.mileage.toLocaleString('pl-PL')} km`
      : '—';

  const status = car.status === 'sold' ? 'sold' : 'active';
  const STATUS_LABEL: Record<'active' | 'sold', string> = {
    active: 'Dostępny',
    sold: 'Sprzedany',
  };
  const STATUS_VARIANT: Record<'active' | 'sold', string> = {
    active: 'bg-emerald-100 text-emerald-700',
    sold: 'bg-zinc-200 text-zinc-700',
  };

  return (
    <Link
      href={`/samochod/${car.id}`}
      className="group block rounded-xl overflow-hidden border bg-white hover:shadow-lg transition-shadow"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={primaryImage}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          unoptimized={isDataURL}
          onError={() => setImageError(true)}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          priority={false}
        />

        <div className="absolute left-3 top-3">
          <span
            className={`rounded-md px-2 py-1 text-xs font-medium ${STATUS_VARIANT[status]}`}
          >
            {STATUS_LABEL[status]}
          </span>
        </div>
      </div>

      <div className="p-4 space-y-2">
        <h3 className="text-base font-semibold line-clamp-1">{title}</h3>

        <div className="flex items-center gap-2 text-sm text-zinc-600">
          <span>{mileageLabel}</span>
        </div>

        <div className="flex items-center justify-between pt-1">
          <div className="text-lg font-bold">{priceLabel}</div>
          <Button variant="outline" size="sm">
            Zobacz
          </Button>
        </div>
      </div>
    </Link>
  );
}
