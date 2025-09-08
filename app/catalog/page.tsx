'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Grid, List } from 'lucide-react';
import { CarFilters } from '@/components/ui/car-filters';
import { CarCard } from '@/components/ui/car-card';
import { Button } from '@/components/ui/button';
import { useCarStore } from '@/store/car-store';
import { mockCars } from '@/data/mock-cars';

export default function CatalogPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const { cars, addCar, getFilteredCars } = useCarStore();

  // Initialize with mock data if empty
  useEffect(() => {
    if (cars.length === 0) {
      mockCars.forEach(car => addCar(car));
    }
  }, [cars.length, addCar]);

  // Get filtered cars (filters are applied via CarFilters component)
  const filteredCars = getFilteredCars();

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
            Katalog samochodów
          </h1>
          <p className="text-xl text-zinc-600">
            Przeglądaj najlepsze oferty samochodów premium
          </p>
        </motion.div>

        {/* Filters */}
        <CarFilters />

        {/* View Toggle */}
        <div className="flex items-center justify-end mb-8">
          <div className="flex items-center bg-zinc-100 rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="h-8 px-3"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="h-8 px-3"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Cars Grid */}
        {filteredCars.length > 0 ? (
          <motion.div
            layout
            className={`grid gap-6 mb-16 ${
              viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1 max-w-4xl mx-auto'
            }`}
          >
            {filteredCars.map((car, index) => (
              <motion.div key={car.id} layout>
                <CarCard car={car} index={index} />
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
                <Grid className="h-8 w-8 text-zinc-400" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-2">Brak wyników</h3>
              <p className="text-zinc-600 mb-6">
                Nie znaleźliśmy samochodów spełniających Twoje kryteria. Spróbuj zmienić filtry.
              </p>
              <Button onClick={() => window.location.reload()}>
                Wyczyść filtry
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}