import React from 'react';
import type { Car } from '../types';
import CarCard from './CarCard';
import Spinner from './common/Spinner';

interface DashboardProps {
  cars: Car[];
  isLoading: boolean;
  onSelectCar: (vin: string) => void;
  favorites: string[];
  onToggleFavorite: (vin: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ cars, isLoading, onSelectCar, favorites, onToggleFavorite }) => {
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner />
      </div>
    );
  }
  
  return (
    <main className="container mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">Veículos em Destaque</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car) => (
          <CarCard
            key={car.vin}
            car={car}
            onSelectCar={onSelectCar}
            isFavorite={favorites.includes(car.vin)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </main>
  );
};

export default Dashboard;
