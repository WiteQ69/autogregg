// types/car.ts

export type CarStatus = 'active' | 'sold' | 'draft';

export type FuelType =
  | 'benzyna'
  | 'diesel'
  | 'benzyna_lpg'
  | 'hybryda'
  | 'elektryczny';

export type Transmission = 'manualna' | 'automatyczna';
export type Drivetrain = 'przód' | 'tył' | '4x4';
export type BodyType =
  | 'hatchback'
  | 'sedan'
  | 'kombi'
  | 'suv'
  | 'crossover'
  | 'coupe'
  | 'kabriolet'
  | 'van'
  | 'dostawczy';

export type Condition = 'bezwypadkowy' | 'nieuszkodzony';
export type Origin =
  | 'EU'
  | 'Salon Polska'
  | 'Niemcy'
  | 'Belgia'
  | 'Holandia'
  | 'Włochy'
  | 'Austria'
  | 'Norwegia'
  | 'Szwecja'
  | 'Szwajcaria'
  | 'Polska'
  | 'Francja';

export type RegisteredIn = 'EU' | 'PL';
export type SaleDocument = 'umowa' | 'vat_marza' | 'vat23';

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
  status?: CarStatus;     // optional + dopuszcza 'draft'
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
