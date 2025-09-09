"use client";
import { GaugeCircle, Navigation, CarFront, Camera, Settings, Car } from "lucide-react";
const EQUIPMENT_LIST = [
  { key: "nav", label: "Nawigacja" }, { key: "abs", label: "ABS" }, { key: "esp", label: "ESP" },
  { key: "parking_sensors", label: "Czujniki parkowania" }, { key: "rear_camera", label: "Kamera cofania" },
  { key: "led", label: "LED" }, { key: "xenon", label: "Xenon" }, { key: "alloy_wheels", label: "Alufelgi" },
  { key: "heated_seats", label: "Podgrzewane fotele" }, { key: "apple_carplay", label: "Apple CarPlay" }, { key: "android_auto", label: "Android Auto" }
] as const;
type EquipmentKey = typeof EQUIPMENT_LIST[number]["key"];
const ICONS: Record<EquipmentKey, any> = { nav: Navigation, abs: GaugeCircle, esp: GaugeCircle, parking_sensors: CarFront, rear_camera: Camera, led: Settings, xenon: Settings, alloy_wheels: Car, heated_seats: Settings, apple_carplay: Settings, android_auto: Settings };
export default function EquipTile({ code }: { code: string }) {
  const isKey = (c: string): c is EquipmentKey => EQUIPMENT_LIST.some(i => i.key === c);
  const key = isKey(code) ? code : undefined;
  const label = EQUIPMENT_LIST.find(i => i.key === key)?.label ?? code;
  const Icon = key ? ICONS[key] : GaugeCircle;
  return (<div className="flex items-center gap-2 text-sm"><Icon className="h-4 w-4 text-zinc-700" /><span>{label}</span></div>);
}
