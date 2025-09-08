import {
  CarFront,
  GaugeCircle,
  Snowflake,
  Fan,
  ParkingCircle,
  Camera,
  Map as MapIcon,
  Sun,
  Moon,
  Flame,
  Smartphone,
  MonitorSmartphone,
  Crosshair,
  Eye,
  Route,
  KeyRound,
  Power,
  Baby,
  Lamp,
  Anchor,
  Armchair,
  ScanLine,
  Gauge,
} from "lucide-react";
import { EQUIPMENT_LIST } from '@/lib/schemas';

const EQUIP_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  abs: GaugeCircle,
  esp: GaugeCircle,
  asr: GaugeCircle,
  climate_auto: Snowflake,
  climate_manual: Fan,
  parking_sensors: ParkingCircle,
  rear_camera: Camera,
  nav: MapIcon,
  led: Sun,
  xenon: Moon,
  alloy_wheels: GaugeCircle,
  heated_seats: Flame,
  heated_wheel: Flame,
  apple_carplay: Smartphone,
  android_auto: MonitorSmartphone,
  cruise: Gauge,
  adaptive_cruise: Crosshair,
  blind_spot: Eye,
  lane_assist: Route,
  keyless: KeyRound,
  start_stop: Power,
  el_windows: GaugeCircle,
  el_mirrors: GaugeCircle,
  multisteering: CarFront,
  isofix: Baby,
  fog: Lamp,
  roof_rails: Anchor,
  towbar: Anchor,
  sunroof: Sun,
  leather: Armchair,
  camera360: ScanLine,
};

export default function EquipTile({ code }: { code: string }) {
  const labelMap = new Map(EQUIPMENT_LIST.map((i) => [i.key, i.label]));
  const label = labelMap.get(code) ?? code;
  const Icon = EQUIP_ICONS[code] ?? GaugeCircle;

  return (
    <div className="rounded-2xl border p-6 flex flex-col items-center text-center shadow-sm hover:shadow-md transition">
      <div className="mx-auto mb-3 w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center text-zinc-700">
        <Icon className="h-6 w-6" />
      </div>
      <div className="text-sm text-zinc-500">{label}</div>
    </div>
  );
}