import React, { useState, useEffect } from 'react';

interface AmortizationModalProps {
  onClose: () => void;
  loanAmount: number;
  tenure: number; // in months
  interestRate: number; // annual percentage
}

interface ScheduleRow {
    month: number;
    principal: number;
    interest: number;
    totalPayment: number;
    balance: number;
}

const AmortizationModal: React.FC<AmortizationModalProps> = ({ onClose, loanAmount, tenure, interestRate }) => {
    const [schedule, setSchedule] = useState<ScheduleRow[]>([]);

    useEffect(() => {
        if (loanAmount > 0 && tenure > 0 && interestRate > 0) {
            const monthlyRate = interestRate / 12 / 100;
            const emi = (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, tenure)) / (Math.pow(1 + monthlyRate, tenure) - 1);
            
            let balance = loanAmount;
            const newSchedule: ScheduleRow[] = [];

            for (let i = 1; i <= tenure; i++) {
                const interestPayment = balance * monthlyRate;
                const principalPayment = emi - interestPayment;
                balance -= principalPayment;
                
                newSchedule.push({
                    month: i,
                    principal: principalPayment,
                    interest: interestPayment,
                    totalPayment: emi,
                    balance: balance > 0 ? balance : 0,
                });
            }
            setSchedule(newSchedule);
        }
    }, [loanAmount, tenure, interestRate]);
    
    const formatCurrency = (amount: number) => {
        return amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const handlePrint = () => {
        window.print();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4">
             <style>
                {`
                @media print {
                    body * {
                        visibility: hidden;
                    }
                    #amortization-content, #amortization-content * {
                        visibility: visible;
                    }
                    #amortization-content {
                        position: absolute;
                        left: 0;
                        top: 0;
                        width: 100%;
                        height: 100%;
                        margin: 0;
                        padding: 20px;
                        font-size: 10px;
                        color: black !important;
                        background: white !important;
                    }
                    .no-print {
                        display: none !important;
                    }
                     .print-text-black * {
                        color: black !important;
                    }
                }
                `}
            </style>
            <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="p-4 sm:p-6 flex justify-between items-center border-b border-slate-700 no-print">
                    <h2 className="text-xl sm:text-2xl font-bold text-white">EMI Amortization Table</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-200" aria-label="Close">
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-4 sm:p-6 overflow-y-auto bg-white text-gray-800 print-text-black" id="amortization-content">
                    <div className="text-center mb-4">
                        <h3 className="text-lg font-bold">EMI Amortization Table – Paynox Finance Private Limited</h3>
                        <p className="text-sm">Loan Amount: {formatCurrency(loanAmount)} | Tenure: {tenure} Months | Interest Rate: {interestRate}% p.a.</p>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border border-gray-300 text-xs">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border border-gray-300 px-2 py-1">Month</th>
                                    <th className="border border-gray-300 px-2 py-1">Principal</th>
                                    <th className="border border-gray-300 px-2 py-1">Interest</th>
                                    <th className="border border-gray-300 px-2 py-1">Total Payment (EMI)</th>
                                    <th className="border border-gray-300 px-2 py-1">Remaining Balance</th>
                                </tr>
                            </thead>
                            <tbody>
                                {schedule.map(row => (
                                    <tr key={row.month} className="text-center">
                                        <td className="border border-gray-300 px-2 py-1">{row.month}</td>
                                        <td className="border border-gray-300 px-2 py-1">{formatCurrency(row.principal)}</td>
                                        <td className="border border-gray-300 px-2 py-1">{formatCurrency(row.interest)}</td>
                                        <td className="border border-gray-300 px-2 py-1">{formatCurrency(row.totalPayment)}</td>
                                        <td className="border border-gray-300 px-2 py-1">{formatCurrency(row.balance)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <p className="text-center text-xs text-gray-500 mt-4">This is a computer-generated schedule and is for illustrative purposes only.</p>
                </div>
                <div className="p-4 flex justify-end space-x-3 border-t border-slate-700 no-print">
                    <button onClick={onClose} className="bg-slate-600 text-slate-100 font-bold py-2 px-4 rounded-md hover:bg-slate-500 transition-colors">Close</button>
                    <button onClick={handlePrint} className="bg-orange-600 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-700 transition-colors inline-flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M5 4v3H4a2 2 0 00-2 2v6a2 2 0 002 2h1v-4a1 1 0 011-1h8a1 1 0 011 1v4h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm-8 8v4h12v-4H5z" clipRule="evenodd" />
                        </svg>
                        Print Schedule
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AmortizationModal;