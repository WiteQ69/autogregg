"use client";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type Car = {
  id: string;
  brand?: string; model?: string; year?: number; price?: number; mileage?: number;
  status?: "active" | "sold"; images?: string[]; main_image_path?: string | null; description?: string;
};

type State = {
  cars: Car[];
  setCars: (cars: Car[]) => void;
  addCar: (car: Car) => void;
  updateCar: (id: string, data: Partial<Car>) => void;
  deleteCar: (id: string) => void;
};

export const useCarStore = create<State>()(persist((set, get) => ({
  cars: [],
  setCars: (cars) => set({ cars }),
  addCar: (car) => set({ cars: [car, ...get().cars] }),
  updateCar: (id, data) => set({ cars: get().cars.map(c => c.id === id ? { ...c, ...data } : c) }),
  deleteCar: (id) => set({ cars: get().cars.filter(c => c.id !== id) })
}), { name: "cars-store" }))
