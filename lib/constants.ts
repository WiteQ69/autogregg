export const CAR_BRANDS = ["Audi", "BMW", "Mercedes", "Volkswagen", "Toyota", "Kia", "Hyundai"] as const;
export const CAR_MODELS: Record<string, string[]> = {
  Audi: ["A3", "A4", "A6"],
  BMW: ["1", "3", "5"],
  Mercedes: ["C", "E", "S"],
  Volkswagen: ["Golf", "Passat", "Tiguan"],
  Toyota: ["Corolla", "Camry", "RAV4"],
  Kia: ["Ceed", "Sportage", "Sorento"],
  Hyundai: ["i30", "Tucson", "Santa Fe"]
};
export const FUEL_TYPES = ["benzyna", "diesel", "hybryda", "elektryczny"] as const;
export const TRANSMISSIONS = ["manualna", "automatyczna"] as const;
export const BODY_TYPES = ["sedan", "kombi", "hatchback", "suv"] as const;
export const DRIVETRAINS = ["FWD", "RWD", "AWD"] as const;
export const CAR_COLORS = ["czarny", "biały", "szary", "czerwony", "niebieski", "srebrny"] as const;
