export interface Car {
  vin: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  engine: string;
  transmission: string;
  drivetrain: string;
  fuelType: string;
  exteriorColor: string;
  interiorColor: string;
  features: string[];
  imageUrl: string;
}

export interface TradeInCar {
  make: string;
  model: string;
  year: number;
  mileage: number;
  condition: 'Excelente' | 'Bom' | 'Razoável';
}
