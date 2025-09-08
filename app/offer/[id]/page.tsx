'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCarStore } from '@/store/car-store';
import { mockCars } from '@/data/mock-cars';
import { coerceStatus, STATUS_LABEL, STATUS_VARIANT } from '@/components/Status';
import { Calendar, Gauge, Fuel, Car as CarIcon, Settings, ArrowLeft } from 'lucide-react';
import { FUEL_TYPES, TRANSMISSIONS } from '@/lib/constants';

type Dict<T extends string> = { [K in T]: string };

function fuelLabel(value: string | undefined): string {
  if (!value) return '—';
  try {
    // common shapes: array of strings OR array of {value,label}
    const maybeObj = (FUEL_TYPES as any[])[0];
    if (typeof maybeObj === 'string') {
      return value;
    } else if (maybeObj && typeof maybeObj === 'object' && 'value' in maybeObj && 'label' in maybeObj) {
      const found = (FUEL_TYPES as any[]).find((x: any) => x.value === value);
      return found?.label ?? value;
    }
  } catch {}
  return value;
}

function transmissionLabel(value: string | undefined): string {
  if (!value) return '—';
  try {
    const maybeObj = (TRANSMISSIONS as any[])[0];
    if (typeof maybeObj === 'string') {
      return value;
    } else if (maybeObj && typeof maybeObj === 'object' && 'value' in maybeObj && 'label' in maybeObj) {
      const found = (TRANSMISSIONS as any[]).find((x: any) => x.value === value);
      return found?.label ?? value;
    }
  } catch {}
  return value;
}

function formatMileage(m?: number) {
  return m != null ? `${m.toLocaleString('pl-PL')} km` : '—';
}

export default function OfferPage() {
  const params = useParams();
  const router = useRouter();
  const { cars, addCar } = useCarStore();
  const id = params.id as string;

  useEffect(() => {
    if (!cars || cars.length === 0) {
      mockCars.forEach((c) => addCar(c));
    }
  }, [cars, addCar]);

  const car = cars.find((c) => c.id === id);

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Ogłoszenie nie znalezione</h1>
          <p className="text-zinc-600 mb-6">Sprawdź adres URL albo wróć do listy.</p>
          <Button asChild variant="outline">
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Wróć
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const status = coerceStatus((car as any).status);
  const imgSrc =
    (car as any).images?.[0] ?? 'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg';

  const facts = [
    { icon: Calendar, label: 'Rok produkcji', value: (car as any).year?.toString?.() ?? '—' },
    { icon: Gauge, label: 'Przebieg', value: formatMileage((car as any).mileage) },
    { icon: Fuel, label: 'Paliwo', value: fuelLabel((car as any).fuelType) },
    { icon: CarIcon, label: 'Skrzynia', value: transmissionLabel((car as any).transmission) },
    { icon: Settings, label: 'Moc', value: (car as any).power != null ? `${(car as any).power} KM` : '—' },
    { icon: Settings, label: 'Pojemność', value: (car as any).displacement != null ? `${(car as any).displacement} cm³` : '—' },
  ] as const;

  return (
    <div className="min-h-screen bg-zinc-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="mb-6 flex items-center justify-between">
          <Button variant="outline" asChild>
            <Link href="/dashboard">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Powrót
            </Link>
          </Button>
          <Badge className={STATUS_VARIANT[status]}>{STATUS_LABEL[status]}</Badge>
        </div>

        <Card className="overflow-hidden">
          <div className="relative w-full h-72 md:h-96">
            <Image src={imgSrc} alt={`${(car as any).brand ?? ''} ${(car as any).model ?? ''}`} fill className="object-cover" />
          </div>
          <CardContent className="p-6 space-y-6">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">
                {(car as any).title ?? `${(car as any).brand ?? ''} ${(car as any).model ?? ''} ${(car as any).year ?? ''}`}
              </h1>
              <p className="text-zinc-600">{(car as any).location ?? '—'}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {facts.map(({ icon: Icon, label, value }, idx) => (
                <div key={idx} className="flex items-center gap-3 p-3 rounded border bg-white">
                  <Icon className="h-5 w-5 text-zinc-700" />
                  <div>
                    <div className="text-xs text-zinc-500">{label}</div>
                    <div className="font-medium">{value}</div>
                  </div>
                </div>
              ))}
            </div>

            {(car as any).description && (
              <div className="prose max-w-none">
                <h2 className="text-xl font-semibold mb-2">Opis</h2>
                <p className="whitespace-pre-wrap">{(car as any).description}</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
