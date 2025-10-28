import React from 'react';
import { ShieldCheckIcon } from '../common/Icons';

const WarrantyInfo = () => {
  return (
    <div>
        <p className="text-gray-600 dark:text-gray-300 mb-6">Ofereça mais segurança e tranquilidade ao seu cliente com nossos planos de garantia estendida. Proteção completa contra imprevistos.</p>

        <div className="space-y-6">
            <div className="p-4 border rounded-lg border-gray-300 dark:border-gray-600">
                <h4 className="font-bold text-lg text-gray-900 dark:text-white">Garantia Ouro - 1 Ano</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Cobertura Essencial</p>
                <ul className="mt-2 list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                    <li>Cobertura de motor e transmissão.</li>
                    <li>Assistência 24h em todo o território nacional.</li>
                    <li>Carro reserva por até 7 dias.</li>
                </ul>
            </div>
            <div className="p-4 border rounded-lg border-yellow-500 dark:border-yellow-400 bg-yellow-50 dark:bg-gray-700/50">
                <h4 className="font-bold text-lg text-yellow-600 dark:text-yellow-400">Garantia Diamante - 2 Anos</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">Cobertura Completa (Mais Vendida)</p>
                <ul className="mt-2 list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300 text-sm">
                    <li>Todos os itens da Garantia Ouro.</li>
                    <li>Cobertura completa de componentes elétricos e eletrônicos.</li>
                    <li>Sistema de arrefecimento e ar-condicionado.</li>
                    <li>Carro reserva por até 15 dias e hospedagem.</li>
                </ul>
            </div>
        </div>
        <p className="text-xs text-center mt-6 text-gray-500 dark:text-gray-400">Consulte os termos e condições completos de cada plano para mais detalhes.</p>
    </div>
  );
};

export default WarrantyInfo;