import React, { useState } from 'react';
import type { Car } from '../types';
import SalesPitchGenerator from './SalesPitchGenerator';
import { ArrowLeftIcon } from './common/Icons';
import FinancingCalculator from './sales_options/FinancingCalculator';
import TradeInEstimator from './sales_options/TradeInEstimator';
import WarrantyInfo from './sales_options/WarrantyInfo';

interface CarDetailViewProps {
  car: Car;
  onBack: () => void;
}

type ActiveTab = 'pitch' | 'financing' | 'trade-in' | 'warranty';

const CarDetailView: React.FC<CarDetailViewProps> = ({ car, onBack }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('pitch');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'financing':
        return <FinancingCalculator carPrice={car.price} />;
      case 'trade-in':
        return <TradeInEstimator targetCarPrice={car.price} />;
      case 'warranty':
        return <WarrantyInfo />;
      case 'pitch':
      default:
        return <SalesPitchGenerator car={car} />;
    }
  };
  
  const TabButton: React.FC<{tabName: ActiveTab, label: string}> = ({tabName, label}) => (
    <button
        onClick={() => setActiveTab(tabName)}
        className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            activeTab === tabName
            ? 'bg-amber-500 text-black font-bold'
            : 'text-gray-400 hover:bg-gray-800 hover:text-amber-400'
        }`}
    >
        {label}
    </button>
  )

  return (
    <div className="bg-black min-h-screen">
       <div className="container mx-auto px-4 py-6">
         <button onClick={onBack} className="flex items-center text-gray-300 hover:text-white mb-4">
             <ArrowLeftIcon className="h-5 w-5 mr-2" />
             Voltar para a lista
         </button>

         <div className="bg-gray-900 rounded-lg shadow-lg overflow-hidden">
             <img className="w-full h-64 object-cover object-center" src={car.imageUrl} alt={`${car.make} ${car.model}`} />
             <div className="p-6">
                <h1 className="text-3xl font-bold text-white">{car.make} {car.model}</h1>
                <p className="text-lg text-gray-400">{car.year} - {car.exteriorColor}</p>
                <div className="mt-4 flex justify-between items-center">
                    <p className="text-2xl font-semibold text-amber-400">
                        R$ {car.price.toLocaleString('pt-BR')}
                    </p>
                    <p className="text-md text-gray-300">
                        {car.mileage.toLocaleString('pt-BR')} km
                    </p>
                </div>

                <div className="mt-6 border-t border-gray-700 pt-6">
                    <h3 className="text-xl font-semibold text-white">Detalhes</h3>
                    <ul className="mt-4 grid grid-cols-2 gap-4 text-gray-300">
                        <li><strong>Motor:</strong> {car.engine}</li>
                        <li><strong>Transmissão:</strong> {car.transmission}</li>
                        <li><strong>Tração:</strong> {car.drivetrain}</li>
                        <li><strong>Combustível:</strong> {car.fuelType}</li>
                    </ul>
                </div>
                 <div className="mt-6 border-t border-gray-700 pt-6">
                    <h3 className="text-xl font-semibold text-white">Destaques</h3>
                    <ul className="mt-4 list-disc list-inside space-y-1 text-gray-300">
                        {car.features.map(feature => <li key={feature}>{feature}</li>)}
                    </ul>
                </div>
             </div>
         </div>

        <div className="mt-8">
            <div className="mb-4 border-b border-gray-700">
                <nav className="flex flex-wrap gap-2" aria-label="Tabs">
                   <TabButton tabName='pitch' label='Proposta de Vendas AI' />
                   <TabButton tabName='financing' label='Simulador de Financiamento' />
                   <TabButton tabName='trade-in' label='Avaliação de Troca AI' />
                   <TabButton tabName='warranty' label='Garantia Estendida' />
                </nav>
            </div>
            <div>
              {renderTabContent()}
            </div>
        </div>

       </div>
    </div>
  );
};

export default CarDetailView;