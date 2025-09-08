'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { SimpleCarCard } from '@/components/ui/simple-car-card';
import { Car } from '@/types/car';
import { Car as CarIcon } from 'lucide-react';

export default function KatalogPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await fetch('/cars.json', { cache: 'no-store' });
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const activeCars = cars.filter(car => car.status === 'active');

  if (loading) {
    return (
      <div className="min-h-screen bg-white pt-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-12 bg-zinc-200 rounded mb-4 max-w-md"></div>
            <div className="h-6 bg-zinc-200 rounded mb-8 max-w-lg"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-zinc-200 rounded-2xl h-80"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4 tracking-tight">
            Nasze samochody
          </h1>
          <p className="text-xl text-zinc-600">
            Znajdź swój wymarzony samochód z naszej oferty
          </p>
        </motion.div>

        {/* Cars Grid */}
        {activeCars.length > 0 ? (
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16"
          >
            {activeCars.map((car, index) => (
              <motion.div key={car.id} layout>
                <SimpleCarCard car={car} index={index} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="max-w-md mx-auto">
              <div className="p-4 rounded-full bg-zinc-100 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <CarIcon className="h-8 w-8 text-zinc-400" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-2">Brak dostępnych aut</h3>
              <p className="text-zinc-600">
                Aktualnie wszystkie nasze samochody zostały sprzedane. Sprawdź ponownie wkrótce lub zobacz nasze ostatnie sprzedaże.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}