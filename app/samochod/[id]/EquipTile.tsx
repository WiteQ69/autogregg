'use client';

import { GaugeCircle, Navigation, CarFront, Camera, Cog, Settings, Car, CheckCircle } from 'lucide-react';

// Samowystarczalne definicje — brak zależności od '@/lib/constants'
export const EQUIPMENT_LIST = [
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

type EquipmentKey = typeof EQUIPMENT_LIST[number]['key'];

const EQUIP_ICONS: Record<EquipmentKey, any> = {
  nav: Navigation,
  abs: CheckCircle,
  esp: CheckCircle,
  asr: CheckCircle,
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

function toEquipmentKey(code: string): EquipmentKey | undefined {
  return EQUIPMENT_LIST.some(i => i.key === (code as EquipmentKey))
    ? (code as EquipmentKey)
    : undefined;
}

export default function EquipTile({ code }: { code: string }) {
  const k = toEquipmentKey(code);
  const labelMap = new Map(EQUIPMENT_LIST.map(i => [i.key, i.label as string]));
  const label = k ? (labelMap.get(k) ?? code) : code;
  const Icon = k ? EQUIP_ICONS[k] : GaugeCircle;

  return (
    <div className="flex items-center gap-2 text-sm">
      <Icon className="h-4 w-4 text-zinc-700" />
      <span>{label}</span>
    </div>
  );
}
