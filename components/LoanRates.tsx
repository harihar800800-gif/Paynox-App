import React from 'react';
import { loanProducts } from '../constants';

interface LoanRatesProps {
    onSelectLoan: (loanId: string) => void;
}

const LoanRates: React.FC<LoanRatesProps> = ({ onSelectLoan }) => {
  return (
    <div className="bg-slate-800/50 p-6 rounded-lg shadow-2xl border border-slate-700">
      <h3 className="text-xl font-bold text-white mb-6">Explore Our Loan Products</h3>
      <div className="flex flex-col space-y-3">
        {loanProducts.map((loan) => (
          <button
            key={loan.id}
            onClick={() => onSelectLoan(loan.id)}
            className="group w-full p-3 bg-slate-700/50 rounded-md border border-slate-600 hover:bg-slate-700 hover:border-orange-500/50 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-slate-800 transition-all duration-200 flex items-center text-left"
          >
            <div className="flex-shrink-0 mr-4 bg-slate-800 p-2 rounded-md">
                <loan.Icon className="h-8 w-8" />
            </div>
            <div className="flex-grow">
                <h4 className="font-semibold text-md text-slate-100 leading-tight">{loan.name}</h4>
                <p className="text-xs text-slate-400 font-medium">{loan.rate}</p>
            </div>
            <div className="ml-auto text-slate-500 group-hover:text-orange-500 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                </svg>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default LoanRates;