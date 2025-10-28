
import React from 'react';
import { CarIcon } from './common/Icons';

const Header = () => {
  return (
    <header className="bg-gray-900 shadow-lg shadow-amber-500/10">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <CarIcon className="h-8 w-8 text-amber-500" />
        <h1 className="ml-3 text-2xl font-bold text-white">
          Golden Car - Assistente AI
        </h1>
      </div>
    </header>
  );
};

export default Header;