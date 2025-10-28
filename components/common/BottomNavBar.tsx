import React from 'react';
import { HeartIcon } from './Icons';

interface BottomNavBarProps {
  favoriteCount: number;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ favoriteCount }) => {
  return (
    <footer className="fixed bottom-0 left-0 right-0 bg-gray-900 shadow-lg border-t border-gray-700">
      <div className="flex justify-around items-center h-16">
        {/* Placeholder for other nav items */}
        <button className="flex flex-col items-center justify-center text-gray-400">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
            <span className="text-xs">Início</span>
        </button>
         <button className="relative flex flex-col items-center justify-center text-amber-400">
            <HeartIcon className="h-6 w-6"/>
            {favoriteCount > 0 && (
                <span className="absolute -top-1 -right-2 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">{favoriteCount}</span>
            )}
            <span className="text-xs">Favoritos</span>
        </button>
         <button className="flex flex-col items-center justify-center text-gray-400">
             <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
            <span className="text-xs">Perfil</span>
        </button>
      </div>
    </footer>
  );
};

export default BottomNavBar;