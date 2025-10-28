
import { CARS_DATA } from '../constants';
import type { Car } from '../types';

export const carService = {
  getAllCars: (): Promise<Car[]> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(CARS_DATA);
      }, 500);
    });
  },
  getCarByVin: (vin: string): Promise<Car | undefined> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const car = CARS_DATA.find((c) => c.vin === vin);
        resolve(car);
      }, 300);
    });
  },
};
