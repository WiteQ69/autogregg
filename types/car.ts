// types/car.ts
// ...
export type CarStatus = 'active' | 'sold' | 'draft';  // ← dodajamy 'draft'

export type Car = {
  id: string;
  // podstawowe
  title: string;
  brand?: string;
  model?: string;
  year: number;
  mileage: number;
  engine: string;
  // parametry
  engineCapacityCcm?: number;
  powerKw?: number;
  fuelType?: FuelType;
  transmission?: Transmission;
  drivetrain?: Drivetrain;
  bodyType?: BodyType;
  color?: string;
  doors?: number;
  seats?: number;
  condition?: Condition;
  origin?: Origin;
  registeredIn?: RegisteredIn;
  saleDocument?: SaleDocument;

  // sprzedaż / status / cena
  price_text?: string;
  price?: number;
  status?: CarStatus;              // ← teraz OPTIONAL i z 'draft'
  firstOwner?: boolean;

  // dodatkowe pola
  vin?: string;
  location?: string;
  owners?: number;
  accidentFree?: boolean;
  serviceHistory?: boolean;
  power?: number;
  displacement?: number;
  views?: number;
  favorites?: number;

  // media
  main_image_path?: string;
  images?: string[];
  video_url?: string;

  // opis i daty
  description?: string;
  createdAt?: string;
  updatedAt?: string;

  // wyposażenie
  equipment?: string[];
};
