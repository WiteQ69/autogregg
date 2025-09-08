export function formatPrice(price: number): string {
  return new Intl.NumberFormat('pl-PL', {
    style: 'currency',
    currency: 'PLN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

export function formatNumber(num: number): string {
  return new Intl.NumberFormat('pl-PL').format(num);
}

export function formatMileage(mileage: number): string {
  return `${formatNumber(mileage)} km`;
}

export function formatYear(year: number): string {
  return year.toString();
}

export function getFuelTypeLabel(fuelType: string): string {
  const labels: Record<string, string> = {
    gasoline: 'Benzyna',
    diesel: 'Diesel',
    hybrid: 'Hybryda',
    electric: 'Elektryczny',
    lpg: 'LPG',
  };
  return labels[fuelType] || fuelType;
}

export function getTransmissionLabel(transmission: string): string {
  const labels: Record<string, string> = {
    manual: 'Manualna',
    automatic: 'Automatyczna',
  };
  return labels[transmission] || transmission;
}

export function getBodyTypeLabel(bodyType: string): string {
  const labels: Record<string, string> = {
    sedan: 'Sedan',
    estate: 'Kombi',
    suv: 'SUV',
    coupe: 'Coupe',
    hatchback: 'Hatchback',
    convertible: 'Cabrio',
  };
  return labels[bodyType] || bodyType;
}

export function getDrivetrainLabel(drivetrain: string): string {
  const labels: Record<string, string> = {
    fwd: 'Na przód',
    rwd: 'Na tył',
    awd: '4x4',
  };
  return labels[drivetrain] || drivetrain;
}