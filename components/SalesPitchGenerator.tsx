
import React, { useState } from 'react';
import type { Car } from '../types';
import { generateSalesPitch } from '../services/geminiService';
import { SparklesIcon } from './common/Icons';
import Spinner from './common/Spinner';

interface SalesPitchGeneratorProps {
  car: Car;
}

const SalesPitchGenerator: React.FC<SalesPitchGeneratorProps> = ({ car }) => {
  const [customerProfile, setCustomerProfile] = useState('');
  const [pitch, setPitch] = useState<{ title: string; pitch: string; } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGeneratePitch = async () => {
    if (!customerProfile.trim()) {
      setError('Por favor, descreva o perfil do cliente.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setPitch(null);

    try {
      const result = await generateSalesPitch(car, customerProfile);
      setPitch(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-lg p-6 mt-8">
      <h3 className="text-2xl font-bold text-white flex items-center">
        <SparklesIcon className="h-7 w-7 mr-3 text-amber-500" />
        Gerador de Proposta de Vendas AI
      </h3>
      <p className="text-gray-300 mt-2">
        Descreva o cliente para gerar uma proposta personalizada e persuasiva.
      </p>

      <div className="mt-4">
        <label htmlFor="customerProfile" className="block text-sm font-medium text-gray-200">
          Perfil do Cliente (ex: família com 2 filhos, jovem profissional, entusiasta de performance)
        </label>
        <textarea
          id="customerProfile"
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-600 shadow-sm focus:border-amber-500 focus:ring-amber-500 sm:text-sm bg-gray-700 text-white"
          value={customerProfile}
          onChange={(e) => setCustomerProfile(e.target.value)}
          placeholder="Ex: Casal jovem procurando por um carro seguro e tecnológico para viagens de fim de semana."
        />
      </div>

      <button
        onClick={handleGeneratePitch}
        disabled={isLoading}
        className="mt-4 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-black bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
      >
        {isLoading ? <Spinner /> : 'Gerar Proposta'}
      </button>

      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

      {pitch && (
        <div className="mt-6 p-4 border-l-4 border-amber-500 bg-gray-900/50 rounded-r-lg">
          <h4 className="text-xl font-bold text-white">{pitch.title}</h4>
          <p className="mt-2 text-gray-200 whitespace-pre-wrap">{pitch.pitch}</p>
        </div>
      )}
    </div>
  );
};

export default SalesPitchGenerator;