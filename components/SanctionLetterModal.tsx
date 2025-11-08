import React, { useState, useEffect } from 'react';

interface ApplicantDetails {
    name: string;
    address: string;
    email: string;
    phone: string;
}

interface LoanDetails {
    applicationId: string;
    sanctionDate: string;
    loanAmount: number;
    tenure: string;
    interestRate: string;
    emi: string;
    processingFee: number;
    loanPurpose: string;
    firstEmiDate: string;
    disbursementAccount: string;
}

interface SanctionLetterModalProps {
  onClose: () => void;
  applicantDetails: ApplicantDetails;
  loanDetails: LoanDetails;
}

interface ScheduleRow {
    month: number;
    principal: number;
    interest: number;
    totalPayment: number;
    balance: number;
}


const SanctionLetterModal: React.FC<SanctionLetterModalProps> = ({ onClose, applicantDetails, loanDetails }) => {
    const [schedule, setSchedule] = useState<ScheduleRow[]>([]);

    useEffect(() => {
        const loanAmount = loanDetails.loanAmount;
        const tenure = parseInt(loanDetails.tenure, 10);
        const annualRate = parseFloat(loanDetails.interestRate);

        if (loanAmount > 0 && tenure > 0 && annualRate > 0) {
            const monthlyRate = annualRate / 12 / 100;
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
    }, [loanDetails]);
    
    const formatCurrency = (amount: number) => {
        return amount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 2, maximumFractionDigits: 2 });
    };

    const gstAmount = loanDetails.processingFee * 0.18;
    const insuranceAmount = loanDetails.loanAmount * 0.03;
    const stampPaperCharge = loanDetails.loanAmount * 0.015;
    const totalFeesPayable = loanDetails.processingFee + gstAmount + insuranceAmount + stampPaperCharge;
    const netDisbursedAmount = loanDetails.loanAmount - totalFeesPayable;

    const handleDownloadPDF = () => {
        const input = document.getElementById('sanction-letter-content');
        if (!input) return;

        const html2canvas = (window as any).html2canvas;
        const { jsPDF } = (window as any).jspdf;

        if (!html2canvas || !jsPDF) {
            console.error('PDF generation libraries not loaded.');
            alert('Could not download PDF. Please ensure you are connected to the internet and try again.');
            return;
        }

        html2canvas(input, { 
            scale: 2, // Higher resolution for better quality
            useCORS: true,
            backgroundColor: '#ffffff'
        }).then((canvas: HTMLCanvasElement) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'pt', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const canvasWidth = canvas.width;
            const canvasHeight = canvas.height;
            const ratio = canvasWidth / pdfWidth;
            const pdfHeight = canvasHeight / ratio;
            
            let heightLeft = pdfHeight;
            let position = 0;
            const pageHeight = pdf.internal.pageSize.getHeight();

            pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
            heightLeft -= pageHeight;

            while (heightLeft > 0) {
              position = heightLeft - pdfHeight;
              pdf.addPage();
              pdf.addImage(imgData, 'PNG', 0, position, pdfWidth, pdfHeight);
              heightLeft -= pageHeight;
            }
            
            pdf.save(`Sanction_Letter_${loanDetails.applicationId}.pdf`);
        });
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4">
            <div className="bg-slate-800 border border-slate-700 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] flex flex-col">
                <div className="p-4 sm:p-6 flex justify-between items-center border-b border-slate-700">
                    <h2 className="text-xl sm:text-2xl font-bold text-white">Loan Sanction Letter</h2>
                    <button onClick={onClose} className="text-slate-400 hover:text-slate-200" aria-label="Close">
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                <div className="p-4 sm:p-8 overflow-y-auto bg-gray-200">
                    <div id="sanction-letter-content" className="bg-white p-12 text-black shadow-lg mx-auto" style={{width: '210mm'}}>
                        {/* Letter Head */}
                        <div className="flex items-center justify-between pb-6 border-b border-gray-300">
                            <div className="flex items-center space-x-4">
                                <svg className="h-16 w-16" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                    <rect width="100" height="100" rx="20" fill="#f97316" />
                                    <text x="50" y="50" fontSize="50" fill="white" textAnchor="middle" dy=".3em" fontWeight="bold">PF</text>
                                </svg>
                                <div>
                                    <h1 className="text-2xl font-bold text-black">Paynox Finance Private Limited</h1>
                                    <p className="text-sm text-gray-700">3459 Laxmi Industry Complex, Vasai (West), Mumbai</p>
                                </div>
                            </div>
                            <div className="text-right text-sm">
                                <p className="font-semibold">Ref: {loanDetails.applicationId}</p>
                                <p>Date: {loanDetails.sanctionDate}</p>
                            </div>
                        </div>
                        {/* Letter Body */}
                        <div className="mt-8 text-sm text-gray-800">
                            <p className="font-semibold">{applicantDetails.name}</p>
                            <p>{applicantDetails.address}</p>
                            <p>Email: {applicantDetails.email}</p>
                            <p>Phone: {applicantDetails.phone}</p>
                            
                            <p className="mt-8 font-bold underline text-base">Subject: Sanction of Personal Loan Facility</p>

                            <p className="mt-6">Dear {applicantDetails.name},</p>
                            
                            <p className="mt-2 leading-relaxed">
                                We are pleased to inform you that with reference to your loan application, Paynox Finance Private Limited has sanctioned a Personal Loan facility, the details of which are provided below. This offer is subject to the terms and conditions outlined in the final loan agreement.
                            </p>

                            <h3 className="text-lg font-bold my-6 text-center bg-gray-100 py-2 text-black border-y border-gray-300">Loan Details</h3>

                            <div className="overflow-x-auto">
                                <table className="min-w-full text-sm">
                                    <tbody className="text-black">
                                        <tr className="border-b border-gray-200"><td className="px-4 py-3 font-semibold bg-gray-50 w-2/5">Loan Amount Sanctioned</td><td className="px-4 py-3 font-medium">{formatCurrency(loanDetails.loanAmount)}</td></tr>
                                        <tr className="border-b border-gray-200"><td className="px-4 py-3 font-semibold bg-gray-50">Purpose of Loan</td><td className="px-4 py-3 font-medium">{loanDetails.loanPurpose}</td></tr>
                                        <tr className="border-b border-gray-200"><td className="px-4 py-3 font-semibold bg-gray-50">Loan Tenure</td><td className="px-4 py-3 font-medium">{loanDetails.tenure}</td></tr>
                                        <tr className="border-b border-gray-200"><td className="px-4 py-3 font-semibold bg-gray-50">Applicable Interest Rate</td><td className="px-4 py-3 font-medium">{loanDetails.interestRate} (Fixed)</td></tr>
                                        <tr className="border-b border-gray-200"><td className="px-4 py-3 font-semibold bg-gray-50">Equated Monthly Installment (EMI)</td><td className="px-4 py-3 font-medium">{loanDetails.emi}</td></tr>
                                        <tr className="border-b border-gray-200"><td className="px-4 py-3 font-semibold bg-gray-50">First EMI Date</td><td className="px-4 py-3 font-medium">{loanDetails.firstEmiDate}</td></tr>
                                        <tr className="border-b border-gray-200"><td className="px-4 py-3 font-semibold bg-gray-50">Processing Fees (Non-refundable)</td><td className="px-4 py-3 font-medium">{formatCurrency(loanDetails.processingFee)}</td></tr>
                                        <tr className="border-b border-gray-200"><td className="px-4 py-3 font-semibold bg-gray-50">GST on Processing Fees (18%)</td><td className="px-4 py-3 font-medium">{formatCurrency(gstAmount)}</td></tr>
                                        <tr className="border-b border-gray-200"><td className="px-4 py-3 font-semibold bg-gray-50">Insurance Charges (3%)</td><td className="px-4 py-3 font-medium">{formatCurrency(insuranceAmount)}</td></tr>
                                        <tr className="border-b border-gray-200"><td className="px-4 py-3 font-semibold bg-gray-50">Stamp Paper Charges (1.5%)</td><td className="px-4 py-3 font-medium">{formatCurrency(stampPaperCharge)}</td></tr>
                                        <tr className="border-b border-gray-200"><td className="px-4 py-3 font-bold bg-gray-100">Total Fees Payable</td><td className="px-4 py-3 font-bold">{formatCurrency(totalFeesPayable)}</td></tr>
                                    </tbody>
                                </table>
                            </div>
                            
                            <p className="mt-6">
                                <strong className="text-black">Disbursement Details:</strong> The sanctioned loan amount, after deduction of total applicable fees of {formatCurrency(totalFeesPayable)}, an amount of <strong className="text-black">{formatCurrency(netDisbursedAmount)}</strong> will be disbursed to your registered bank account: <span className="font-medium">{loanDetails.disbursementAccount}</span>.
                            </p>

                            <p className="mt-8 text-xs text-gray-600">
                                <strong className="text-black">Terms & Conditions:</strong> 
                                This is an in-principle sanction and is not to be construed as a final loan agreement. The final disbursal is subject to the completion of all documentation, successful verification, and execution of the loan agreement. Please read the loan agreement carefully before signing.
                            </p>

                            <div className="mt-16 pt-6 border-t border-dashed border-gray-400">
                                <p className="font-semibold">Sincerely,</p>
                                <p className="mt-1">Authorised Signatory</p>
                                <p className="font-bold text-black">Paynox Finance Private Limited</p>
                            </div>
                            <p className="text-center text-xs text-gray-500 mt-8">This is a computer-generated document and does not require a signature.</p>
                        </div>
                        
                        {/* Amortization Schedule Section */}
                        <div style={{ pageBreakBefore: 'always' }} className="pt-12">
                             <h3 className="text-lg font-bold mb-6 text-center bg-gray-100 py-2 text-black border-y border-gray-300">EMI Amortization Schedule</h3>
                             <table className="min-w-full border-collapse border border-gray-300 text-xs">
                                <thead className="bg-gray-100 text-black">
                                    <tr>
                                        <th className="border border-gray-300 px-2 py-1">Month</th>
                                        <th className="border border-gray-300 px-2 py-1">Principal</th>
                                        <th className="border border-gray-300 px-2 py-1">Interest</th>
                                        <th className="border border-gray-300 px-2 py-1">Total Payment (EMI)</th>
                                        <th className="border border-gray-300 px-2 py-1">Remaining Balance</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-800">
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
                             <p className="text-center text-xs text-gray-500 mt-4">This is a computer-generated schedule and is for illustrative purposes only.</p>
                        </div>

                    </div>
                </div>
                <div className="p-4 flex justify-end space-x-3 border-t border-slate-700">
                    <button onClick={onClose} className="bg-slate-600 text-slate-100 font-bold py-2 px-4 rounded-md hover:bg-slate-500 transition-colors">Close</button>
                    <button onClick={handleDownloadPDF} className="bg-orange-600 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-700 transition-colors inline-flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                        </svg>
                        Download PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SanctionLetterModal;