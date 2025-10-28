import React, { useState } from 'react';
import type { TradeInCar } from '../../types';
import { estimateTradeInValue } from '../../services/geminiService';
import Spinner from '../common/Spinner';

interface TradeInEstimatorProps {
    targetCarPrice: number;
}

const TradeInEstimator: React.FC<TradeInEstimatorProps> = ({ targetCarPrice }) => {
    const [tradeInCar, setTradeInCar] = useState<Partial<TradeInCar>>({ condition: 'Bom' });
    const [estimate, setEstimate] = useState<{ min: number; max: number; disclaimer: string } | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setTradeInCar(prev => ({ ...prev, [name]: value }));
    };

    const handleEstimate = async () => {
        if (!tradeInCar.make || !tradeInCar.model || !tradeInCar.year || !tradeInCar.mileage || !tradeInCar.condition) {
            setError('Por favor, preencha todos os campos.');
            return;
        }

        setIsLoading(true);
        setError(null);
        setEstimate(null);

        try {
            const result = await estimateTradeInValue(tradeInCar as TradeInCar, targetCarPrice);
            setEstimate({ min: result.estimatedValueMin, max: result.estimatedValueMax, disclaimer: result.disclaimer });
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Ocorreu um erro desconhecido.');
        } finally {
            setIsLoading(false);
        }
    };
    
    const inputClasses = "block w-full rounded-md border border-gray-600 shadow-sm bg-gray-700 text-white p-2 focus:border-amber-500 focus:ring-amber-500 sm:text-sm";


    return (
        <div className="bg-gray-800 rounded-lg shadow-lg p-6">
            <p className="text-gray-300 mb-6">Use nossa ferramenta com IA para obter uma estimativa rápida do valor de troca do veículo do seu cliente.</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" name="make" placeholder="Marca (ex: Fiat)" onChange={handleInputChange} className={inputClasses} />
                <input type="text" name="model" placeholder="Modelo (ex: Uno)" onChange={handleInputChange} className={inputClasses} />
                <input type="number" name="year" placeholder="Ano (ex: 2020)" onChange={handleInputChange} className={inputClasses} />
                <input type="number" name="mileage" placeholder="Quilometragem (ex: 50000)" onChange={handleInputChange} className={inputClasses} />
                <select name="condition" value={tradeInCar.condition} onChange={handleInputChange} className={`${inputClasses} col-span-1 md:col-span-2`}>
                    <option value="Excelente">Excelente</option>
                    <option value="Bom">Bom</option>
                    <option value="Razoável">Razoável</option>
                </select>
            </div>

            <button
                onClick={handleEstimate}
                disabled={isLoading}
                className="mt-6 w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-black bg-amber-500 hover:bg-amber-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 disabled:bg-gray-600 disabled:text-gray-400 disabled:cursor-not-allowed"
            >
                {isLoading ? <Spinner /> : 'Estimar Valor de Troca'}
            </button>

            {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

            {estimate && (
                <div className="mt-6 p-4 bg-gray-900 rounded-lg text-center">
                    <p className="text-sm text-amber-200">Estimativa de Valor para Troca</p>
                    <p className="text-3xl font-bold text-amber-400">
                        R$ {estimate.min.toLocaleString('pt-BR')} - R$ {estimate.max.toLocaleString('pt-BR')}
                    </p>
                    <p className="text-xs text-gray-400 mt-2">{estimate.disclaimer}</p>
                </div>
            )}
        </div>
    );
};

export default TradeInEstimator;