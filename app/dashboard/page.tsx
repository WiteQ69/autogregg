'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCarStore } from '@/store/car-store';
import { mockCars } from '@/data/mock-cars';
import { coerceStatus, STATUS_LABEL, STATUS_VARIANT } from '@/components/Status';
import { Pencil, Trash2, Eye } from 'lucide-react';

export default function DashboardPage() {
  const router = useRouter();
  const { cars, addCar, deleteCar } = useCarStore();

  // wypełnij danymi demo przy pierwszym uruchomieniu (jeśli pusto)
  useEffect(() => {
    if (!cars || cars.length === 0) {
      mockCars.forEach((c) => addCar(c));
    }
  }, [cars, addCar]);

  function handleDelete(id: string) {
    if (confirm('Czy na pewno chcesz usunąć tę ofertę?')) {
      deleteCar(id);
    }
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-2xl">Panel ogłoszeń</CardTitle>
            <Button asChild>
              <Link href="/dashboard/new">Dodaj ofertę</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {(!cars || cars.length === 0) ? (
              <p className="text-sm text-zinc-600">Brak ofert. Dodaj pierwszą.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b">
                      <th className="py-3 pr-4">Zdjęcie</th>
                      <th className="py-3 pr-4">Tytuł</th>
                      <th className="py-3 pr-4">Cena</th>
                      <th className="py-3 pr-4">Przebieg</th>
                      <th className="py-3 pr-4">Status</th>
                      <th className="py-3 pr-4 text-right">Akcje</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cars.map((car) => {
                      const s = coerceStatus((car as any).status); // gwarantuje 'active' | 'sold'
                      const imgSrc =
                        (car as any).images?.[0] ??
                        'https://images.pexels.com/photos/112460/pexels-photo-112460.jpeg';

                      return (
                        <tr key={car.id} className="border-b last:border-0">
                          <td className="py-3 pr-4">
                            <div className="relative h-16 w-28 overflow-hidden rounded">
                              <Image
                                src={imgSrc}
                                alt={`${car.brand ?? ''} ${car.model ?? ''}`}
                                fill
                                sizes="112px"
                                className="object-cover"
                              />
                            </div>
                          </td>
                          <td className="py-3 pr-4">
                            <div className="flex flex-col">
                              <span className="font-medium">
                                {car.title ?? `${car.brand} ${car.model} ${car.year ?? ''}`}
                              </span>
                              <span className="text-xs text-zinc-500">
                                {car.brand} {car.model} • {car.year}
                              </span>
                            </div>
                          </td>
                          <td className="py-3 pr-4">
                            {typeof (car as any).price === 'number'
                              ? `${(car as any).price.toLocaleString('pl-PL')} zł`
                              : (car as any).price ?? '—'}
                          </td>
                          <td className="py-3 pr-4">
                            {(car as any).mileage != null
                              ? `${(car as any).mileage.toLocaleString('pl-PL')} km`
                              : '—'}
                          </td>
                          <td className="py-3 pr-4">
                            <Badge className={STATUS_VARIANT[s]}>{STATUS_LABEL[s]}</Badge>
                          </td>
                          <td className="py-3 pr-0">
                            <div className="flex justify-end gap-2">
                              <Button variant="outline" size="icon" asChild>
                                <Link href={`/cars/${car.id}`}>
                                  <Eye className="h-4 w-4" />
                                </Link>
                              </Button>
                              <Button variant="outline" size="icon" asChild>
                                <Link href={`/dashboard/${car.id}/edit`}>
                                  <Pencil className="h-4 w-4" />
                                </Link>
                              </Button>
                              <Button variant="destructive" size="icon" onClick={() => handleDelete(car.id)}>
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
