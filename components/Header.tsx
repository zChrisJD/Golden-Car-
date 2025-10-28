
import React from 'react';
import { CarIcon } from './common/Icons';

const Header = () => {
  return (
    <header className="bg-white dark:bg-gray-800 shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center">
        <CarIcon className="h-8 w-8 text-yellow-500 dark:text-yellow-400" />
        <h1 className="ml-3 text-2xl font-bold text-gray-800 dark:text-white">
          Golden Car - Assistente AI
        </h1>
      </div>
    </header>
  );
};

export default Header;