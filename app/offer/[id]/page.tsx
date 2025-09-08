'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
  ChevronRight, 
  Heart, 
  Share2, 
  Phone, 
  Mail, 
  Fuel, 
  Gauge, 
  Calendar,
  Car as CarIcon,
  Settings,
  MapPin,
  User,
  CheckCircle,
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CarCard } from '@/components/ui/car-card';
import { useCarStore } from '@/store/car-store';
import { 
  formatPrice, 
  formatMileage, 
  getFuelTypeLabel, 
  getTransmissionLabel, 
  getBodyTypeLabel,
  getDrivetrainLabel 
} from '@/lib/format';
import { mockCars } from '@/data/mock-cars';

export default function OfferPage() {
  const params = useParams();
  const id = params.id as string;
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showLightbox, setShowLightbox] = useState(false);
  
  const { 
    cars, 
    addCar, 
    favorites, 
    comparison, 
    toggleFavorite, 
    addToComparison, 
    removeFromComparison 
  } = useCarStore();

  // Initialize with mock data if empty
  useEffect(() => {
    if (cars.length === 0) {
      mockCars.forEach(car => addCar(car));
    }
  }, [cars.length, addCar]);

  const car = cars.find(c => c.id === id);
  const similarCars = cars.filter(c => 
    c.id !== id && 
    c.status === 'active' && 
    (c.brand === car?.brand || c.bodyType === car?.bodyType)
  ).slice(0, 3);

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-zinc-900 mb-2">Oferta nie znaleziona</h1>
          <p className="text-zinc-600 mb-6">Przykro nam, ale ta oferta nie istnieje.</p>
          <Button asChild>
            <Link href="/catalog">Powrót do katalogu</Link>
          </Button>
        </div>
      </div>
    );
  }

  const isFavorite = favorites.includes(car.id);
  const isInComparison = comparison.includes(car.id);

  const specifications = [
    { icon: Calendar, label: 'Rok produkcji', value: car.year.toString() },
    { icon: Gauge, label: 'Przebieg', value: formatMileage(car.mileage) },
    { icon: Fuel, label: 'Paliwo', value: getFuelTypeLabel(car.fuelType) },
    { icon: CarIcon, label: 'Skrzynia', value: getTransmissionLabel(car.transmission) },
    { icon: Settings, label: 'Moc', value: `${car.power} KM` },
    { icon: Settings, label: 'Pojemność', value: `${car.displacement} cm³` },
    { label: 'Nadwozie', value: getBodyTypeLabel(car.bodyType) },
    { label: 'Napęd', value: getDrivetrainLabel(car.drivetrain) },
    { label: 'Kolor', value: car.color },
    { label: 'Właściciele', value: car.owners.toString() },
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumbs */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex items-center space-x-2 text-sm text-zinc-500">
          <Link href="/" className="hover:text-zinc-900 transition-colors">Strona główna</Link>
          <ChevronRight className="h-4 w-4" />
          <Link href="/catalog" className="hover:text-zinc-900 transition-colors">Katalog</Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-zinc-900">{car.brand} {car.model}</span>
        </nav>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Images */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Main Image */}
              <div 
                className="relative aspect-[4/3] mb-4 rounded-2xl overflow-hidden cursor-pointer group"
                onClick={() => setShowLightbox(true)}
              >
                <Image
                  src={car.images[selectedImageIndex]}
                  alt={`${car.brand} ${car.model}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-full p-3">
                    <span className="text-sm font-medium text-zinc-900">Powiększ</span>
                  </div>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-3">
                {car.images.map((image, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ scale: 1.02 }}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-[4/3] rounded-xl overflow-hidden cursor-pointer border-2 transition-all duration-200 ${
                      index === selectedImageIndex 
                        ? 'border-zinc-900' 
                        : 'border-transparent hover:border-zinc-300'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${car.brand} ${car.model} - zdjęcie ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right Column - Details */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {/* Title & Price */}
              <div className="mb-6">
                <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 mb-2 tracking-tight">
                  {car.brand} {car.model}
                </h1>
                <p className="text-5xl font-bold text-zinc-900 mb-4">
                  {formatPrice(car.price)}
                </p>
                <div className="flex items-center space-x-4 text-sm text-zinc-600">
                  <span>{car.year}</span>
                  <span>•</span>
                  <span>{formatMileage(car.mileage)}</span>
                  <span>•</span>
                  <span>{getFuelTypeLabel(car.fuelType)}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col space-y-3 mb-8">
                <Button size="lg" className="bg-zinc-900 hover:bg-zinc-800">
                  <Phone className="h-5 w-5 mr-2" />
                  Zadzwoń: +48 123 456 789
                </Button>
                
                <div className="flex space-x-3">
                  <Button 
                    variant="outline" 
                    className="flex-1"
                    onClick={() => toggleFavorite(car.id)}
                  >
                    <Heart className={`h-4 w-4 mr-2 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
                    {isFavorite ? 'Usuń z ulubionych' : 'Dodaj do ulubionych'}
                  </Button>
                  
                  <Button 
                    variant="outline"
                    onClick={() => {
                      if (isInComparison) {
                        removeFromComparison(car.id);
                      } else if (comparison.length < 3) {
                        addToComparison(car.id);
                      }
                    }}
                    disabled={!isInComparison && comparison.length >= 3}
                  >
                    <span className="sr-only">
                      {isInComparison ? 'Usuń z porównania' : 'Dodaj do porównania'}
                    </span>
                    {isInComparison ? <X className="h-4 w-4" /> : <span>Porównaj</span>}
                  </Button>
                </div>
              </div>

              {/* Key Features */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-bold text-zinc-900 mb-4">Główne cechy</h3>
                  <div className="grid grid-cols-1 gap-4">
                    {car.accidentFree && (
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm text-zinc-700">Bezwypadkowy</span>
                      </div>
                    )}
                    {car.serviceHistory && (
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="h-5 w-5 text-green-500" />
                        <span className="text-sm text-zinc-700">Serwis ASO</span>
                      </div>
                    )}
                    {car.owners === 1 && (
                      <div className="flex items-center space-x-2">
                        <User className="h-5 w-5 text-blue-500" />
                        <span className="text-sm text-zinc-700">Pierwszy właściciel</span>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        {/* Specifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-zinc-900 mb-8">Specyfikacja techniczna</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {specifications.map((spec, index) => (
              <motion.div
                key={spec.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="flex items-center space-x-3 p-4 rounded-xl bg-zinc-50"
              >
                {spec.icon && <spec.icon className="h-5 w-5 text-zinc-600" />}
                <div>
                  <p className="text-xs text-zinc-500 uppercase tracking-wide">{spec.label}</p>
                  <p className="font-semibold text-zinc-900">{spec.value}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <h2 className="text-3xl font-bold text-zinc-900 mb-6">Opis</h2>
          <div className="prose prose-lg max-w-none">
            <p className="text-zinc-700 leading-relaxed">{car.description}</p>
          </div>
        </motion.div>

        {/* Similar Cars */}
        {similarCars.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-16"
          >
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-bold text-zinc-900">Podobne oferty</h2>
              <Link 
                href="/catalog" 
                className="text-zinc-600 hover:text-zinc-900 transition-colors font-medium flex items-center space-x-2"
              >
                <span>Zobacz więcej</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {similarCars.map((similarCar, index) => (
                <CarCard key={similarCar.id} car={similarCar} index={index} />
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Contact Sticky Bar (Mobile) */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-zinc-200 p-4 md:hidden">
        <div className="flex space-x-3">
          <Button size="lg" className="flex-1 bg-zinc-900 hover:bg-zinc-800">
            <Phone className="h-5 w-5 mr-2" />
            Zadzwoń
          </Button>
          <Button variant="outline" size="lg">
            <Mail className="h-5 w-5" />
          </Button>
          <Button variant="outline" size="lg" onClick={() => toggleFavorite(car.id)}>
            <Heart className={`h-5 w-5 ${isFavorite ? 'fill-current text-red-500' : ''}`} />
          </Button>
        </div>
      </div>
    </div>
  );
}