import React from 'react';
import type { Car } from '../types';
import { HeartIcon, HeartSolidIcon } from './common/Icons';

interface CarCardProps {
  car: Car;
  onSelectCar: (vin: string) => void;
  isFavorite: boolean;
  onToggleFavorite: (vin: string) => void;
}

const CarCard: React.FC<CarCardProps> = ({ car, onSelectCar, isFavorite, onToggleFavorite }) => {
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Impede que o clique no coração acione o onSelectCar
    onToggleFavorite(car.vin);
  };

  return (
    <div 
        className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300 cursor-pointer relative"
        onClick={() => onSelectCar(car.vin)}
    >
      <button
        onClick={handleFavoriteClick}
        className="absolute top-3 right-3 z-10 p-2 rounded-full bg-black/30 hover:bg-black/50 transition-colors"
        aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
      >
        {isFavorite ? (
          <HeartSolidIcon className="h-6 w-6 text-red-500" />
        ) : (
          <HeartIcon className="h-6 w-6 text-white" />
        )}
      </button>
      <img className="w-full h-56 object-cover object-center" src={car.imageUrl} alt={`${car.make} ${car.model}`} />
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">{car.make} {car.model}</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">{car.year}</p>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-lg font-semibold text-yellow-600 dark:text-yellow-400">
            R$ {car.price.toLocaleString('pt-BR')}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            {car.mileage.toLocaleString('pt-BR')} km
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarCard;