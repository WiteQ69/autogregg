'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { Save, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { carFormSchema, CarFormData } from '@/lib/schemas';

export default function NewCarPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const adminPath = process.env.NEXT_PUBLIC_ADMIN_PATH || '__admin-auto-greg-9c1b7f';

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CarFormData>({
    resolver: zodResolver(carFormSchema),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (data: CarFormData) => {
    try {
      let imagePath = '';
      
      // Upload image if provided
      if (image) {
        const formData = new FormData();
        formData.append('image', image);
        
        const uploadResponse = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        if (uploadResponse.ok) {
          const uploadResult = await uploadResponse.json();
          imagePath = uploadResult.path;
        }
      }

      // Create car
      const carData = {
        ...data,
        main_image_path: imagePath,
        status: 'active' as const,
      };

      const response = await fetch('/api/cars', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(carData),
      });

      if (response.ok) {
        router.push(`/${adminPath}`);
      }
    } catch (error) {
      console.error('Error creating car:', error);
    }
  };

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-zinc-50 py-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-4 mb-4">
            <Button variant="outline" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Powrót
            </Button>
          </div>
          
          <h1 className="text-4xl font-bold text-zinc-900 mb-2 tracking-tight">
            Dodaj nowe auto
          </h1>
          <p className="text-xl text-zinc-600">
            Wypełnij formularz, aby dodać nową ofertę
          </p>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Podstawowe informacje</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <Label htmlFor="title">Tytuł oferty *</Label>
                  <Input
                    id="title"
                    placeholder="np. BMW X3 xDrive20d M Sport"
                    {...register('title')}
                  />
                  {errors.title && <p className="text-sm text-red-500 mt-1">{errors.title.message}</p>}
                </div>

                <div>
                  <Label htmlFor="year">Rok produkcji *</Label>
                  <Input
                    id="year"
                    type="number"
                    min="1950"
                    max="2025"
                    {...register('year', { valueAsNumber: true })}
                  />
                  {errors.year && <p className="text-sm text-red-500 mt-1">{errors.year.message}</p>}
                </div>

                <div>
                  <Label htmlFor="mileage">Przebieg (km) *</Label>
                  <Input
                    id="mileage"
                    type="number"
                    min="0"
                    {...register('mileage', { valueAsNumber: true })}
                  />
                  {errors.mileage && <p className="text-sm text-red-500 mt-1">{errors.mileage.message}</p>}
                </div>

                <div>
                  <Label htmlFor="engine">Silnik *</Label>
                  <Input
                    id="engine"
                    placeholder="np. 2.0 TDI, 1.4 TSI, 3.0 V6"
                    {...register('engine')}
                  />
                  {errors.engine && <p className="text-sm text-red-500 mt-1">{errors.engine.message}</p>}
                </div>

                <div>
                  <Label htmlFor="price_text">Cena (opcjonalnie)</Label>
                  <Input
                    id="price_text"
                    placeholder="np. 150 000 PLN, Cena do negocjacji"
                    {...register('price_text')}
                  />
                  {errors.price_text && <p className="text-sm text-red-500 mt-1">{errors.price_text.message}</p>}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Image Upload */}
          <Card>
            <CardHeader>
              <CardTitle>Zdjęcie główne</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="image">Wybierz zdjęcie</Label>
                  <Input
                    id="image"
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    onChange={handleImageChange}
                    className="mt-1"
                  />
                  <p className="text-sm text-zinc-500 mt-1">
                    Obsługiwane formaty: JPG, JPEG, PNG. Maksymalny rozmiar: 5MB
                  </p>
                </div>

                {imagePreview && (
                  <div className="relative w-full max-w-md">
                    <img
                      src={imagePreview}
                      alt="Podgląd"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-6">
            <Button
              type="submit"
              size="lg"
              disabled={isSubmitting}
              className="flex-1 bg-zinc-900 hover:bg-zinc-800"
            >
              <Save className="h-5 w-5 mr-2" />
              {isSubmitting ? 'Dodawanie...' : 'Dodaj auto'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}