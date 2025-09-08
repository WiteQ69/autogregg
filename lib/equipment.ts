// lib/equipment.ts
// Warstwa kompatybilności: eksportuje EQUIPMENT_LIST i EQUIP_ICONS
// niezależnie od tego, jak są nazwane w '@/lib/constants'.

import * as C from '@/lib/constants';
import { GaugeCircle, Car, CarFront, Navigation, Fuel, Cog, Settings, Camera, CircleCheck } from 'lucide-react';

// Spróbuj wykryć istniejące nazwy:
const listCandidate =
  (C as any).EQUIPMENT_LIST ||
  (C as any).EQUIPMENT ||
  (C as any).EQUIPMENT_ITEMS ||
  (C as any).EQUIPMENT_OPTIONS ||
  null;

const iconsCandidate =
  (C as any).EQUIP_ICONS ||
  (C as any).EQUIPMENT_ICONS ||
  null;

// Domyślna lista (jeśli w constants nic nie ma).
// Użyj kilku najczęstszych kluczy; dopasuj później do swoich.
const DEFAULT_LIST = [
  { key: 'nav', label: 'Nawigacja' },
  { key: 'abs', label: 'ABS' },
  { key: 'esp', label: 'ESP' },
  { key: 'asr', label: 'ASR' },
  { key: 'climate_auto', label: 'Klimatyzacja automatyczna' },
  { key: 'climate_manual', label: 'Klimatyzacja manualna' },
  { key: 'parking_sensors', label: 'Czujniki parkowania' },
  { key: 'rear_camera', label: 'Kamera cofania' },
  { key: 'led', label: 'Reflektory LED' },
  { key: 'xenon', label: 'Reflektory ksenonowe' },
  { key: 'alloy_wheels', label: 'Alufelgi' },
  { key: 'heated_seats', label: 'Podgrzewane fotele' },
  { key: 'heated_wheel', label: 'Podgrzewana kierownica' },
  { key: 'apple_carplay', label: 'Apple CarPlay' },
  { key: 'android_auto', label: 'Android Auto' },
  { key: 'blind_spot', label: 'Martwe pole' },
  { key: 'lane_assist', label: 'Asystent pasa' },
  { key: 'adaptive_cruise', label: 'Aktywny tempomat' },
  { key: 'sunroof', label: 'Szyberdach' },
  { key: 'towbar', label: 'Hak holowniczy' },
  { key: 'hud', label: 'HUD' },
  { key: 'keyless', label: 'Dostęp bezkluczykowy' },
  { key: 'camera360', label: 'Kamera 360°' },
] as const;

type DefaultKeys = typeof DEFAULT_LIST[number]['key'];

// Domyślne ikony (dopasuj pod projekt)
const DEFAULT_ICONS: Record<DefaultKeys, any> = {
  nav: Navigation,
  abs: CircleCheck,
  esp: CircleCheck,
  asr: CircleCheck,
  climate_auto: Cog,
  climate_manual: Cog,
  parking_sensors: CarFront,
  rear_camera: Camera,
  led: Car,
  xenon: Car,
  alloy_wheels: Car,
  heated_seats: Settings,
  heated_wheel: Settings,
  apple_carplay: Car,
  android_auto: Car,
  blind_spot: Car,
  lane_assist: Car,
  adaptive_cruise: Car,
  sunroof: Car,
  towbar: Car,
  hud: Car,
  keyless: Car,
  camera360: Camera,
};

export const EQUIPMENT_LIST: ReadonlyArray<{ key: string; label: string }> =
  Array.isArray(listCandidate) && listCandidate.length
    ? listCandidate
    : DEFAULT_LIST as any;

export const EQUIP_ICONS: Record<string, any> =
  iconsCandidate && typeof iconsCandidate === 'object'
    ? iconsCandidate
    : (DEFAULT_ICONS as Record<string, any>);
