import React from 'react';

interface Loan {
    id: string;
    name: string;
    rate: string;
    Icon: React.ElementType;
    description: string;
}

interface LoanDetailPageProps {
    loan: Loan;
    onBack: () => void;
}

const LoanDetailPage: React.FC<LoanDetailPageProps> = ({ loan, onBack }) => {
    return (
        <div className="bg-slate-800 p-6 sm:p-8 rounded-lg shadow-2xl max-w-4xl mx-auto border border-slate-700">
            <div className="mb-6">
                <button onClick={onBack} className="text-sm font-semibold text-orange-500 hover:text-orange-400 flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    Back to Application
                </button>
            </div>

            <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left">
                <div className="w-24 h-24 bg-slate-700/50 rounded-full flex items-center justify-center mb-4 md:mb-0 md:mr-8 flex-shrink-0">
                    <loan.Icon className="h-12 w-12 text-orange-500" />
                </div>
                <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white">{loan.name}</h1>
                    <p className="mt-2 text-lg text-orange-500 font-semibold">{loan.rate}</p>
                    <p className="mt-4 text-slate-300 leading-relaxed">
                        {loan.description}
                    </p>
                </div>
            </div>

            <div className="mt-8 border-t border-slate-700 pt-6 text-center">
                 <button 
                    onClick={onBack}
                    className="bg-orange-600 text-white font-bold py-3 px-8 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-slate-800 transition-colors text-lg"
                 >
                    Apply Now
                </button>
            </div>
        </div>
    );
};

export default LoanDetailPage;