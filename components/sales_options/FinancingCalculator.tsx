import React, { useState, useMemo } from 'react';

interface FinancingCalculatorProps {
    carPrice: number;
}

const FinancingCalculator: React.FC<FinancingCalculatorProps> = ({ carPrice }) => {
    const [downPayment, setDownPayment] = useState(Math.round(carPrice * 0.2));
    const [loanTerm, setLoanTerm] = useState(48); // in months
    const [interestRate, setInterestRate] = useState(1.8); // monthly rate

    const monthlyPayment = useMemo(() => {
        const principal = carPrice - downPayment;
        if (principal <= 0) return 0;

        const monthlyRate = interestRate / 100;
        if (monthlyRate === 0) {
            return principal / loanTerm;
        }

        const payment =
            (principal * monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) /
            (Math.pow(1 + monthlyRate, loanTerm) - 1);

        return payment;
    }, [carPrice, downPayment, loanTerm, interestRate]);

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
    }
    
    return (
        <div>
            <p className="text-gray-600 dark:text-gray-300 mb-6">Simule o financiamento e encontre a parcela que cabe no bolso do seu cliente.</p>
            <div className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Valor do Veículo</label>
                    <input type="text" readOnly value={formatCurrency(carPrice)} className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm sm:text-sm bg-gray-100 dark:bg-gray-700" />
                </div>
                 <div>
                    <label htmlFor="downPayment" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Valor de Entrada ({formatCurrency(downPayment)})
                    </label>
                    <input
                        type="range"
                        id="downPayment"
                        min="0"
                        max={carPrice}
                        step={1000}
                        value={downPayment}
                        onChange={(e) => setDownPayment(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                </div>
                 <div>
                    <label htmlFor="loanTerm" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Prazo ({loanTerm} meses)
                    </label>
                    <select
                        id="loanTerm"
                        value={loanTerm}
                        onChange={(e) => setLoanTerm(Number(e.target.value))}
                        className="mt-1 block w-full rounded-md border-gray-300 dark:border-gray-600 shadow-sm focus:border-yellow-500 focus:ring-yellow-500 sm:text-sm bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                        <option value="12">12 meses</option>
                        <option value="24">24 meses</option>
                        <option value="36">36 meses</option>
                        <option value="48">48 meses</option>
                        <option value="60">60 meses</option>
                    </select>
                </div>
                 <div>
                    <label htmlFor="interestRate" className="block text-sm font-medium text-gray-700 dark:text-gray-200">
                        Taxa de Juros Mensal ({interestRate.toFixed(2)}%)
                    </label>
                     <input
                        type="range"
                        id="interestRate"
                        min="0.5"
                        max="3.5"
                        step="0.01"
                        value={interestRate}
                        onChange={(e) => setInterestRate(Number(e.target.value))}
                        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                    />
                </div>
            </div>
            <div className="mt-6 p-4 bg-yellow-50 dark:bg-gray-700 rounded-lg text-center">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">Parcela Mensal Estimada</p>
                <p className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
                    {formatCurrency(monthlyPayment)}
                </p>
            </div>
             <p className="text-xs text-center mt-4 text-gray-500 dark:text-gray-400">Esta é uma simulação. A aprovação e as condições finais estão sujeitas à análise de crédito.</p>
        </div>
    );
};

export default FinancingCalculator;
