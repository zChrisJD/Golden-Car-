import React, { useState, useEffect, useMemo } from 'react';
import type { Car } from './types';
import { carService } from './services/carService';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import CarDetailView from './components/CarDetailView';
import BottomNavBar from './components/common/BottomNavBar';

function App() {
  const [cars, setCars] = useState<Car[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCarVin, setSelectedCarVin] = useState<string | null>(null);
  
  // Initialize favorites from localStorage
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
        const storedFavorites = localStorage.getItem('favoriteCars');
        return storedFavorites ? JSON.parse(storedFavorites) : [];
    } catch (error) {
        console.error("Failed to parse favorites from localStorage", error);
        return [];
    }
  });

  useEffect(() => {
    carService.getAllCars()
      .then(data => {
        setCars(data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Failed to fetch cars:", error);
        setIsLoading(false);
      });
  }, []);
  
  // Save favorites to localStorage whenever they change
  useEffect(() => {
    try {
        localStorage.setItem('favoriteCars', JSON.stringify(favorites));
    } catch (error) {
        console.error("Failed to save favorites to localStorage", error);
    }
  }, [favorites]);

  const handleSelectCar = (vin: string) => {
    setSelectedCarVin(vin);
  };

  const handleBackToList = () => {
    setSelectedCarVin(null);
  };
  
  const handleToggleFavorite = (vin: string) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.includes(vin)) {
        return prevFavorites.filter(favVin => favVin !== vin);
      } else {
        return [...prevFavorites, vin];
      }
    });
  };

  const selectedCar = useMemo(() => {
    if (!selectedCarVin) return null;
    return cars.find(car => car.vin === selectedCarVin) || null;
  }, [selectedCarVin, cars]);

  return (
    <div className="bg-black min-h-screen font-sans">
      <Header />
      {selectedCar ? (
        <CarDetailView car={selectedCar} onBack={handleBackToList} />
      ) : (
        <Dashboard
          cars={cars}
          isLoading={isLoading}
          onSelectCar={handleSelectCar}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
      <div className="pb-16"></div> {/* Spacer for bottom nav */}
      <BottomNavBar favoriteCount={favorites.length} />
    </div>
  );
}

export default App;