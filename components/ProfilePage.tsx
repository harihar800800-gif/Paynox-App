import React, { useState } from 'react';
import SanctionLetterModal from './SanctionLetterModal';

// Mock data - in a real app, this would come from an API
const userDetails = {
  name: 'Ravi Kumar',
  email: 'ravi.kumar@example.com',
  phone: '9876543210',
  address: '123, MG Road, Bengaluru, Karnataka, 560001',
};

const applicationStatusSteps = [
  { name: 'Application Submitted', status: 'complete' },
  { name: 'Documents Verified', status: 'complete' },
  { name: 'Credit Review', status: 'complete' },
  { name: 'Loan Approved', status: 'complete' },
  { name: 'Disbursal', status: 'current' },
];

const loanSummary = {
  loanType: 'Personal Loan',
  loanAmount: 500000,
  emi: '₹14,874',
  tenure: '36 Months',
  interestRate: '14% p.a.',
  paidInstallments: 12,
  remainingInstallments: 24,
  applicationId: 'PF-2024-84371',
  sanctionDate: new Date().toLocaleDateString('en-GB'),
  processingFee: 5000,
  loanPurpose: 'Business Expansion',
  firstEmiDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString('en-GB'),
  disbursementAccount: 'A/C No. XXXXXXXX1234 (HDFC Bank)',
};


const ProfilePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState('status');
  const [isSanctionLetterOpen, setIsSanctionLetterOpen] = useState(false);

  const renderTabContent = () => {
    switch (activeTab) {
      case 'status':
        return <ApplicationStatus onOpenSanctionLetter={() => setIsSanctionLetterOpen(true)} />;
      case 'summary':
        return <LoanSummary />;
      case 'details':
      default:
        return <MyDetails />;
    }
  };

  return (
    <>
      <div className="bg-slate-800/50 p-6 sm:p-8 rounded-lg shadow-2xl max-w-4xl mx-auto border border-slate-700">
        <h1 className="text-3xl font-bold text-white mb-6">My Profile</h1>
        
        <div className="border-b border-slate-700 mb-6">
          <nav className="-mb-px flex space-x-8" aria-label="Tabs">
            <button onClick={() => setActiveTab('details')} className={`${activeTab === 'details' ? 'border-orange-500 text-orange-500' : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-500'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
              My Details
            </button>
            <button onClick={() => setActiveTab('status')} className={`${activeTab === 'status' ? 'border-orange-500 text-orange-500' : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-500'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
              Application Status
            </button>
            <button onClick={() => setActiveTab('summary')} className={`${activeTab === 'summary' ? 'border-orange-500 text-orange-500' : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-500'} whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}>
              Loan Summary
            </button>
          </nav>
        </div>

        <div>
          {renderTabContent()}
        </div>
      </div>
      {isSanctionLetterOpen && (
        <SanctionLetterModal 
            onClose={() => setIsSanctionLetterOpen(false)}
            applicantDetails={userDetails}
            loanDetails={loanSummary}
        />
      )}
    </>
  );
};

// Sub-components for each tab
const MyDetails = () => {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-semibold text-slate-100">Personal Information</h2>
            <div className="border-t border-slate-700">
                <dl className="divide-y divide-slate-700">
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-slate-400">Full name</dt>
                        <dd className="mt-1 text-sm text-slate-100 sm:mt-0 sm:col-span-2">{userDetails.name}</dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-slate-400">Email address</dt>
                        <dd className="mt-1 text-sm text-slate-100 sm:mt-0 sm:col-span-2">{userDetails.email}</dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-slate-400">Phone number</dt>
                        <dd className="mt-1 text-sm text-slate-100 sm:mt-0 sm:col-span-2">{userDetails.phone}</dd>
                    </div>
                    <div className="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4">
                        <dt className="text-sm font-medium text-slate-400">Address</dt>
                        <dd className="mt-1 text-sm text-slate-100 sm:mt-0 sm:col-span-2">{userDetails.address}</dd>
                    </div>
                </dl>
            </div>
             <div className="flex justify-end pt-4">
                <button className="bg-orange-600 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-700 transition-colors">
                    Update Details
                </button>
            </div>
        </div>
    );
}

interface ApplicationStatusProps {
    onOpenSanctionLetter: () => void;
}

const ApplicationStatus: React.FC<ApplicationStatusProps> = ({ onOpenSanctionLetter }) => {
    const isApproved = applicationStatusSteps.some(step => step.name === 'Loan Approved' && step.status === 'complete');

    return (
        <div>
            <h2 className="text-xl font-semibold text-slate-100 mb-4">Your Application Status</h2>
            <ol className="relative border-l border-slate-700">                  
                {applicationStatusSteps.map((step, index) => (
                    <li className="mb-10 ml-6" key={index}>
                        <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 ring-8 ring-slate-800 ${step.status === 'complete' ? 'bg-green-500' : step.status === 'current' ? 'bg-orange-500' : 'bg-slate-600'}`}>
                            {step.status === 'complete' && <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>}
                        </span>
                        <h3 className={`font-semibold ${step.status === 'current' ? 'text-orange-500' : 'text-slate-100'}`}>{step.name}</h3>
                        <p className="text-sm text-slate-400">Status: <span className="font-medium capitalize">{step.status}</span></p>

                        {step.name === 'Loan Approved' && step.status === 'complete' && (
                             <div className="mt-3">
                                <button
                                    onClick={onOpenSanctionLetter}
                                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-orange-600 border border-transparent rounded-md shadow-sm hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-slate-800"
                                >
                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
                                    </svg>
                                    Download Sanction Letter
                                </button>
                            </div>
                        )}
                    </li>
                ))}
            </ol>
        </div>
    );
}

const LoanSummary = () => {
    const progress = (loanSummary.paidInstallments / (loanSummary.paidInstallments + loanSummary.remainingInstallments)) * 100;
    return (
        <div>
            <h2 className="text-xl font-semibold text-slate-100 mb-4">{loanSummary.loanType} - Summary</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="bg-slate-700/50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-slate-400">Loan Amount</p>
                    <p className="text-lg font-bold text-slate-100">
                        {loanSummary.loanAmount.toLocaleString('en-IN', { style: 'currency', currency: 'INR', minimumFractionDigits: 0 })}
                    </p>
                </div>
                <div className="bg-slate-700/50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-slate-400">Monthly EMI</p>
                    <p className="text-lg font-bold text-slate-100">{loanSummary.emi}</p>
                </div>
                 <div className="bg-slate-700/50 p-4 rounded-lg">
                    <p className="text-sm font-medium text-slate-400">Interest Rate</p>
                    <p className="text-lg font-bold text-slate-100">{loanSummary.interestRate}</p>
                </div>
            </div>
            <div className="mt-6">
                <h3 className="font-semibold text-slate-100">Repayment Progress</h3>
                <div className="w-full bg-slate-700 rounded-full h-2.5 mt-2">
                    <div className="bg-orange-500 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="flex justify-between text-sm text-slate-400 mt-1">
                    <span>{loanSummary.paidInstallments} of {loanSummary.paidInstallments + loanSummary.remainingInstallments} EMIs paid</span>
                    <span>{loanSummary.remainingInstallments} remaining</span>
                </div>
            </div>
        </div>
    );
}


export default ProfilePage;