'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight, Car, Star, Shield, Clock, Mail } from 'lucide-react';
import { HeroSection } from '@/components/ui/hero-section';

import {
  ClipboardCheck,
  Clock3,
  Users,
  FileCheck,
  Gauge,
  Wrench,
} from 'lucide-react';

const features = [
  {
    icon: ClipboardCheck,
    title: 'Pewne i sprawdzone pojazdy',
    description: 'Każdy samochód jest dokładnie zweryfikowany pod kątem technicznym i prawnym',
  },
  {
    icon: Clock3,
    title: 'Możliwość rezerwacji pojazdu',
    description: 'Zarezerwuj samochód na 24h i miej pewność, że nikt inny go nie kupi',
  },
  {
    icon: Users,
    title: 'Masa zadowolonych klientów',
    description: 'Dołącz do grona osób, które zaufały naszej jakości i obsłudze',
  },
  {
    icon: FileCheck,
    title: 'Legalne pochodzenie pojazdu',
    description: 'Każdy samochód posiada sprawdzone i udokumentowane pochodzenie',
  },
  {
    icon: Gauge,
    title: 'Autentyczny przebieg pojazdów',
    description: 'Gwarantujemy prawdziwy przebieg — zero cofania liczników',
  },
  {
    icon: Wrench,
    title: 'Sprawdzenie na stacji diagnostycznej',
    description: 'Masz możliwość dokładnego sprawdzenia pojazdu przed zakupem',
  },
];


export default function HomePage() {
  return (
    <div>
      <HeroSection />

      {/* Features Section */}
      <section className="py-20 bg-zinc-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-6 tracking-tight">
              Dlaczego AutoGreg?
            </h2>
            <p className="text-xl text-zinc-600 max-w-2xl mx-auto">
              Oferujemy wyjątkowe doświadczenie zakupu samochodów premium
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="inline-flex p-4 rounded-2xl bg-white shadow-sm group-hover:shadow-md transition-shadow duration-300 mb-6">
                  <feature.icon className="h-8 w-8 text-zinc-600" />
                </div>
                <h3 className="text-xl font-bold text-zinc-900 mb-3">{feature.title}</h3>
                <p className="text-zinc-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Navigation Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-zinc-900 mb-4 tracking-tight">
                Przeglądaj nasze auta
              </h2>
              <p className="text-xl text-zinc-600">
                Znajdź swój wymarzony samochód
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/auta"
                className="block p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-zinc-100"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 rounded-xl bg-zinc-900">
                    <Car className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900">Dostępne auta</h3>
                </div>
                <p className="text-zinc-600 mb-4">
                  Przeglądaj wszystkie nasze samochody - dostępne i sprzedane
                </p>
                <div className="flex items-center text-zinc-900 font-medium">
                  <span>Zobacz auta</span>
                  <ArrowRight className="h-5 w-5 ml-2" />
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Link
                href="/kontakt"
                className="block p-8 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-zinc-100"
              >
                <div className="flex items-center space-x-4 mb-4">
                  <div className="p-3 rounded-xl bg-green-600">
                    <Mail className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-zinc-900">Kontakt</h3>
                </div>
                <p className="text-zinc-600 mb-4">
                  Skontaktuj się z nami w sprawie zakupu samochodu
                </p>
                <div className="flex items-center text-zinc-900 font-medium">
                  <span>Napisz do nas</span>
                  <ArrowRight className="h-5 w-5 ml-2" />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}