'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { 
  Plus, 
  Edit, 
  Trash2, 
  CheckCircle,
  Car,
  BarChart3
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCarStore } from '@/store/car-store';
import { Car as CarType } from '@/types/car';
import { formatNumber } from '@/lib/format';

export default function AdminDashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const { cars, setCars } = useCarStore();
  const [loading, setLoading] = useState(true);

  const adminPath = process.env.NEXT_PUBLIC_ADMIN_PATH || '__admin-auto-greg-9c1b7f';

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session) {
      router.push(`/${adminPath}/login`);
      return;
    }

    const fetchCars = async () => {
      try {
        const response = await fetch('/api/cars');
        const data = await response.json();
        setCars(data);
      } catch (error) {
        console.error('Error fetching cars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, [session, status, router, adminPath, setCars]);

  const handleMarkAsSold = async (carId: string) => {
    try {
      const response = await fetch(`/api/cars/${carId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: 'sold' }),
      });

      if (response.ok) {
        const updatedCar = await response.json();
        setCars(cars.map(car => car.id === carId ? updatedCar : car));
      }
    } catch (error) {
      console.error('Error marking car as sold:', error);
    }
  };

  const handleDelete = async (carId: string) => {
    if (!confirm('Czy na pewno chcesz usunąć to auto?')) return;

    try {
      const response = await fetch(`/api/cars/${carId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setCars(cars.filter(car => car.id !== carId));
      }
    } catch (error) {
      console.error('Error deleting car:', error);
    }
  };

  const activeCars = cars.filter(car => car.status === 'active');
  const soldCars = cars.filter(car => car.status === 'sold');

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-zinc-900"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold text-zinc-900 mb-2 tracking-tight">
                Panel administracyjny
              </h1>
              <p className="text-xl text-zinc-600">Zarządzaj samochodami w sprzedaży</p>
            </div>
            
            <Button asChild size="lg" className="bg-zinc-900 hover:bg-zinc-800">
              <Link href={`/${adminPath}/cars/new`} className="flex items-center space-x-2">
                <Plus className="h-5 w-5" />
                <span>Dodaj auto</span>
              </Link>
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8"
        >
          <Card>
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-8 w-8 text-zinc-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-zinc-900">{cars.length}</p>
              <p className="text-sm text-zinc-600">Wszystkich aut</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <Car className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-blue-600">{activeCars.length}</p>
              <p className="text-sm text-zinc-600">Dostępnych</p>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-6 text-center">
              <CheckCircle className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <p className="text-2xl font-bold text-green-600">{soldCars.length}</p>
              <p className="text-sm text-zinc-600">Sprzedanych</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Cars List */}
        {cars.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="space-y-4"
          >
            {cars.map((car, index) => (
              <motion.div
                key={car.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="hover:shadow-md transition-shadow duration-200">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-6">
                      {/* Image */}
                      <div className="relative w-32 h-24 rounded-xl overflow-hidden bg-zinc-100 flex-shrink-0">
                        {car.main_image_path ? (
                          <img
                            src={car.main_image_path}
                            alt={car.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <Car className="h-8 w-8 text-zinc-400" />
                          </div>
                        )}
                      </div>

                      {/* Details */}
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="text-lg font-bold text-zinc-900">
                              {car.title}
                            </h3>
                            <p className="text-zinc-600 text-sm mb-2">
                              {car.year} • {car.engine} • {formatNumber(car.mileage)} km
                            </p>
                            <p className="text-zinc-600 text-sm">
                              {car.price_text || 'Skontaktuj się z nami!'}
                            </p>
                          </div>

                          <div className="flex items-center space-x-3">
                            <Badge 
                              className={car.status === 'active' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}
                            >
                              {car.status === 'active' ? 'Dostępne' : 'Sprzedane'}
                            </Badge>
                            
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm" asChild>
                                <Link href={`/${adminPath}/cars/${car.id}/edit`}>
                                  <Edit className="h-4 w-4" />
                                </Link>
                              </Button>
                              
                              {car.status === 'active' && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  onClick={() => handleMarkAsSold(car.id)}
                                  className="text-green-600 hover:text-green-700"
                                >
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                              )}
                              
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleDelete(car.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-center py-16"
          >
            <div className="max-w-md mx-auto">
              <div className="p-4 rounded-full bg-zinc-100 w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                <Car className="h-8 w-8 text-zinc-400" />
              </div>
              <h3 className="text-xl font-bold text-zinc-900 mb-2">Brak aut</h3>
              <p className="text-zinc-600 mb-6">
                Rozpocznij dodając pierwsze auto do oferty.
              </p>
              <Button asChild size="lg" className="bg-zinc-900 hover:bg-zinc-800">
                <Link href={`/${adminPath}/cars/new`}>
                  <Plus className="h-5 w-5 mr-2" />
                  Dodaj pierwsze auto
                </Link>
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}