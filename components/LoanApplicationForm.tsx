import React, { useState, useEffect } from 'react';
import FormField from './FormField';
import StepIndicator from './StepIndicator';
import { loanPurposes, loanFormSteps, designationOptions, INTEREST_RATE } from '../constants';
import IndianStateSelector from './IndianStateSelector';
import LoanRates from './LoanRates';
import DocumentUploadField, { CheckCircleIcon } from './DocumentUploadField';
import SubmissionSuccess from './SubmissionSuccess';
import LivePhotoCapture from './LivePhotoCapture';
import AmortizationModal from './AmortizationModal';

interface FormData {
  // Loan Details
  loanAmount: string;
  loanPurpose: string;
  tenure: string;
  // Personal Info
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  // Business Details
  businessName: string;
  businessType: string;
  annualTurnover: string;
  businessVintage: string;
  businessAddress: string;
  businessCity: string;
  businessState: string;
  businessPinCode: string;
  // Designation
  designation: string;
  // Submit
  dob: string;
  pan: string;
  agreeTerms: boolean;
}

const initialFormData: FormData = {
  loanAmount: '100000',
  loanPurpose: '',
  tenure: '12',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  pinCode: '',
  businessName: '',
  businessType: '',
  annualTurnover: '',
  businessVintage: '',
  businessAddress: '',
  businessCity: '',
  businessState: '',
  businessPinCode: '',
  designation: '',
  dob: '',
  pan: '',
  agreeTerms: false,
};

const initialFiles: { [key: string]: File | null } = {
    aadhaar: null,
    pan: null,
    livePhoto: null,
    businessPhoto: null,
    gstLicense: null,
    udyamAadhaar: null,
    gumastaLicense: null,
    lightBill: null,
    rentAgreement: null,
    fssaiLicense: null,
    bankStatement: null,
};


const LockIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2 inline-block text-gray-400" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 2a4 4 0 00-4 4v2H4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V10a2 2 0 00-2-2h-2V6a4 4 0 00-4-4zm-2 4V6a2 2 0 114 0v2H8z" clipRule="evenodd" />
    </svg>
);

interface LoanApplicationFormProps {
    onSelectLoan: (loanId: string) => void;
}

const LoanApplicationForm: React.FC<LoanApplicationFormProps> = ({ onSelectLoan }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [files, setFiles] = useState<{ [key: string]: File | null }>(initialFiles);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [calculatedEmi, setCalculatedEmi] = useState<string>('');
  const [isLivePhotoModalOpen, setIsLivePhotoModalOpen] = useState(false);
  const [isAmortizationModalOpen, setIsAmortizationModalOpen] = useState(false);

  const steps = loanFormSteps;

  useEffect(() => {
    const principal = parseFloat(formData.loanAmount);
    const tenureMonths = parseInt(formData.tenure, 10);
    const annualRate = INTEREST_RATE;

    if (principal > 0 && tenureMonths > 0 && annualRate > 0) {
        const monthlyRate = annualRate / 12 / 100;
        const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, tenureMonths)) / (Math.pow(1 + monthlyRate, tenureMonths) - 1);
        setCalculatedEmi(emi.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 }));
    } else {
        setCalculatedEmi('0');
    }
  }, [formData.loanAmount, formData.tenure]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const isCheckbox = type === 'checkbox';
    setFormData(prev => ({
      ...prev,
      [name]: isCheckbox ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files: inputFiles } = e.target;
    if (inputFiles && inputFiles.length > 0) {
      setFiles(prev => ({ ...prev, [name]: inputFiles[0] }));
    }
  };
  
  const handleLivePhotoCapture = (file: File) => {
    setFiles(prev => ({ ...prev, livePhoto: file }));
  };

  const handleNextStep = () => {
    // Add validation for each step if needed
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const handlePrevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreeTerms) {
        alert('You must agree to the terms and conditions to submit the application.');
        return;
    }
    console.log("Form Submitted", formData);
    console.log("Files Submitted", files);
    setIsSubmitted(true);
  };

  const handleStartNew = () => {
      setFormData(initialFormData);
      setFiles(initialFiles);
      setCurrentStep(0);
      setIsSubmitted(false);
  }

  if (isSubmitted) {
      return <SubmissionSuccess onStartNew={handleStartNew} />;
  }
  
  const formattedLoanAmount = parseFloat(formData.loanAmount).toLocaleString('en-IN', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
  });

  return (
    <>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
      <div className="lg:col-span-2">
        <div className="bg-slate-800/50 p-6 sm:p-8 rounded-lg shadow-2xl border border-slate-700">
            <div className="mb-10">
                <StepIndicator currentStep={currentStep} totalSteps={steps.length} steps={steps} />
            </div>

            <form onSubmit={handleSubmit}>
                {currentStep > 0 && (
                    <div className="mb-8 p-4 bg-slate-900 rounded-lg border border-slate-700">
                        <div className="flex justify-around items-center text-center">
                            <div>
                                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Loan Amount</p>
                                <p className="text-lg font-bold text-white mt-1">₹{formattedLoanAmount}</p>
                            </div>
                            <div className="h-10 border-l border-slate-700"></div>
                            <div>
                                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Tenure</p>
                                <p className="text-lg font-bold text-white mt-1">{formData.tenure} <span className="text-sm font-medium text-slate-400">Months</span></p>
                            </div>
                            <div className="h-10 border-l border-slate-700"></div>
                            <div>
                                <p className="text-xs font-medium text-slate-400 uppercase tracking-wider">Estimated EMI</p>
                                <p className="text-lg font-bold text-orange-500 mt-1">₹{calculatedEmi}</p>
                            </div>
                        </div>
                    </div>
                )}
                
                {/* Step 0: Loan Details */}
                {currentStep === 0 && (
                    <div className="space-y-6">
                         <h2 className="text-2xl font-bold text-white">How much do you need?</h2>
                        <div>
                            <label htmlFor="loanAmount" className="block text-sm font-medium text-slate-300">Loan Amount</label>
                            <div className="mt-1 relative rounded-md shadow-sm">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                    <span className="text-slate-400 sm:text-sm">₹</span>
                                </div>
                                <input type="number" name="loanAmount" id="loanAmount" value={formData.loanAmount} onChange={handleInputChange} className="block w-full rounded-md border-slate-600 bg-slate-700 text-white pl-7 pr-12 focus:border-orange-500 focus:ring-orange-500 sm:text-lg py-3" placeholder="e.g., 50000" min="1000" max="10000000" />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="tenure" className="block text-sm font-medium text-slate-300">
                                Loan Tenure (Months): <span className="font-bold text-orange-500">{formData.tenure}</span>
                            </label>
                            <input
                                type="range"
                                name="tenure"
                                id="tenure"
                                min="6"
                                max="60"
                                step="6"
                                value={formData.tenure}
                                onChange={handleInputChange}
                                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer mt-2"
                            />
                            <div className="flex justify-between text-xs text-slate-400 px-1">
                                <span>6</span>
                                <span>12</span>
                                <span>18</span>
                                <span>24</span>
                                <span>30</span>
                                <span>36</span>
                                <span>42</span>
                                <span>48</span>
                                <span>54</span>
                                <span>60</span>
                            </div>
                        </div>

                        <FormField label="Purpose of Loan" name="loanPurpose" type="select" value={formData.loanPurpose} onChange={handleInputChange} required>
                            <option value="">Select a purpose</option>
                            {loanPurposes.map(p => <option key={p} value={p}>{p}</option>)}
                        </FormField>

                        <div className="space-y-4 pt-4">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="bg-slate-700/50 p-4 rounded-lg text-center">
                                    <p className="text-sm font-medium text-slate-300">Interest Rate</p>
                                    <p className="text-xl font-bold text-white">{INTEREST_RATE}% p.a.</p>
                                </div>
                                <div className="bg-orange-500/10 p-4 rounded-lg text-center border border-orange-500/30">
                                    <p className="text-sm font-medium text-orange-400">Estimated Monthly EMI</p>
                                    <p className="text-2xl font-bold text-orange-400">₹{calculatedEmi}</p>
                                </div>
                            </div>
                             <div className="text-center">
                                <button 
                                type="button" 
                                onClick={() => setIsAmortizationModalOpen(true)}
                                disabled={!formData.loanAmount || !formData.tenure}
                                className="text-sm font-semibold text-orange-500 hover:text-orange-400 disabled:text-slate-500 disabled:cursor-not-allowed"
                                >
                                View Amortization Schedule
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 1: Personal Info */}
                {currentStep === 1 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white">Personal Information</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField label="First Name" name="firstName" type="text" value={formData.firstName} onChange={handleInputChange} required />
                            <FormField label="Last Name" name="lastName" type="text" value={formData.lastName} onChange={handleInputChange} required />
                        </div>
                        <FormField label="Email Address" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
                        <FormField label="Phone Number" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />
                        <FormField label="Street Address" name="address" type="text" value={formData.address} onChange={handleInputChange} required />
                         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FormField label="City" name="city" type="text" value={formData.city} onChange={handleInputChange} required />
                            <IndianStateSelector name="state" value={formData.state} onChange={handleInputChange} required />
                            <FormField label="PIN Code" name="pinCode" type="text" value={formData.pinCode} onChange={handleInputChange} required />
                         </div>
                    </div>
                )}
                
                {/* Step 2: Business Details */}
                {currentStep === 2 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white">Business Details</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField label="Business Name" name="businessName" type="text" value={formData.businessName} onChange={handleInputChange} required />
                            <FormField label="Business Type" name="businessType" type="text" placeholder="e.g., Retail, Service" value={formData.businessType} onChange={handleInputChange} required />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField label="Annual Turnover" name="annualTurnover" type="number" placeholder="in INR" value={formData.annualTurnover} onChange={handleInputChange} required />
                             <FormField label="Business Vintage (Establishment Date)" name="businessVintage" type="date" value={formData.businessVintage} onChange={handleInputChange} required />
                        </div>
                        
                        <FormField label="Business Address" name="businessAddress" type="text" value={formData.businessAddress} onChange={handleInputChange} required />
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <FormField label="City" name="businessCity" type="text" value={formData.businessCity} onChange={handleInputChange} required />
                            <IndianStateSelector name="businessState" value={formData.businessState} onChange={handleInputChange} required />
                            <FormField label="PIN Code" name="businessPinCode" type="text" value={formData.businessPinCode} onChange={handleInputChange} required />
                        </div>

                        <DocumentUploadField label="Business Photo (Shop/Office)" name="businessPhoto" fileName={files.businessPhoto?.name || null} onChange={handleFileChange} required />
                    </div>
                )}
                
                {/* Step 3: Designation */}
                {currentStep === 3 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white">Select Your Designation</h2>
                        <FormField label="Your Designation" name="designation" type="select" value={formData.designation} onChange={handleInputChange} required>
                            <option value="">Select Designation</option>
                            {designationOptions.map(d => <option key={d} value={d}>{d}</option>)}
                        </FormField>
                    </div>
                )}

                {/* Step 4: Document Upload */}
                {currentStep === 4 && (
                     <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white">Upload Documents</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                           <DocumentUploadField label="Aadhaar Card" name="aadhaar" fileName={files.aadhaar?.name || null} onChange={handleFileChange} required />
                           <DocumentUploadField label="PAN Card" name="pan" fileName={files.pan?.name || null} onChange={handleFileChange} required />
                           
                           <div>
                                <label className="block text-sm font-medium text-slate-300">Live Photo *</label>
                                <div className="mt-1">
                                    {files.livePhoto ? (
                                        <div className="flex items-center justify-between text-sm text-slate-300 w-full border-2 border-dashed border-green-500/50 bg-green-500/10 rounded-lg p-4 text-center">
                                            <div className="flex items-center">
                                                <CheckCircleIcon />
                                                <span className="truncate">{files.livePhoto.name}</span>
                                            </div>
                                            <button type="button" onClick={() => setIsLivePhotoModalOpen(true)} className="ml-4 text-sm font-medium text-orange-500 hover:text-orange-400 flex-shrink-0">Retake</button>
                                        </div>
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() => setIsLivePhotoModalOpen(true)}
                                            className="w-full border-2 border-dashed border-slate-600 rounded-lg p-4 text-center hover:border-orange-500/50 transition-colors"
                                        >
                                            <div className="flex items-center justify-center text-sm text-slate-300">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
                                                    <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zm4 3a2 2 0 100 4 2 2 0 000-4z" />
                                                    <path d="M8 9a2 2 0 100-4 2 2 0 000 4z" />
                                                </svg>
                                                <span>Open Camera & Capture Photo</span>
                                            </div>
                                        </button>
                                    )}
                                </div>
                            </div>

                           <DocumentUploadField label="GST License" name="gstLicense" fileName={files.gstLicense?.name || null} onChange={handleFileChange} />
                           <DocumentUploadField label="Udyam Aadhaar" name="udyamAadhaar" fileName={files.udyamAadhaar?.name || null} onChange={handleFileChange} />
                           <DocumentUploadField label="Gumasta License" name="gumastaLicense" fileName={files.gumastaLicense?.name || null} onChange={handleFileChange} />
                           <DocumentUploadField label="Light Bill" name="lightBill" fileName={files.lightBill?.name || null} onChange={handleFileChange} required/>
                           <DocumentUploadField label="Shop/Home Rent Agreement" name="rentAgreement" fileName={files.rentAgreement?.name || null} onChange={handleFileChange} />
                           <DocumentUploadField label="FSSAI License" name="fssaiLicense" fileName={files.fssaiLicense?.name || null} onChange={handleFileChange} />
                        </div>
                        <DocumentUploadField label="Bank Statement (Last 12 months)" name="bankStatement" fileName={files.bankStatement?.name || null} onChange={handleFileChange} required />
                    </div>
                )}

                {/* Step 5: Submit */}
                {currentStep === 5 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white">Verification & Disclosures</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <FormField label="Date of Birth" name="dob" type="date" value={formData.dob} onChange={handleInputChange} required />
                            <FormField label="PAN Number" name="pan" type="text" value={formData.pan} onChange={handleInputChange} placeholder="ABCDE1234F" required />
                        </div>
                        <div className="bg-slate-700/50 p-4 rounded-md text-sm text-slate-300 space-y-2">
                             <p>By checking the box below, you agree to the Terms of Use and Privacy Policy. You also authorize Paynox Finance Private Limited and its partners to obtain your credit report and other information from one or more consumer reporting agencies.</p>
                        </div>
                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input id="agreeTerms" name="agreeTerms" type="checkbox" checked={formData.agreeTerms} onChange={handleInputChange} className="focus:ring-orange-500 h-4 w-4 text-orange-600 bg-slate-700 border-slate-500 rounded" />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="agreeTerms" className="font-medium text-slate-200">I agree to the terms and conditions.</label>
                            </div>
                        </div>
                    </div>
                )}

                <div className="mt-10 flex justify-between">
                    {currentStep > 0 && (
                        <button type="button" onClick={handlePrevStep} className="bg-slate-600 text-slate-100 font-bold py-3 px-6 rounded-md hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 focus:ring-offset-slate-800 transition-colors">
                            Back
                        </button>
                    )}
                    {currentStep < steps.length - 1 && (
                         <button type="button" onClick={handleNextStep} className="ml-auto bg-orange-600 text-white font-bold py-3 px-6 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-slate-800 transition-colors">
                            Continue
                        </button>
                    )}
                     {currentStep === steps.length - 1 && (
                         <button type="submit" className="ml-auto bg-orange-600 text-white font-bold py-3 px-6 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-slate-800 transition-colors disabled:bg-slate-500 disabled:cursor-not-allowed" disabled={!formData.agreeTerms}>
                            Submit Application
                        </button>
                    )}
                </div>
            </form>
        </div>
      </div>
      <aside className="lg:col-span-1">
        <div className="sticky top-28 space-y-6">
            <div className="bg-slate-800/50 p-6 rounded-lg shadow-2xl border border-slate-700">
                <h3 className="text-lg font-bold text-white border-b border-slate-700 pb-3 mb-4">Why choose us?</h3>
                <ul className="space-y-4 text-sm text-slate-300">
                    <li className="flex items-start">
                        <svg className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        <span><span className="font-semibold text-white">Fast Application:</span> Complete your application in minutes.</span>
                    </li>
                    <li className="flex items-start">
                        <svg className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        <span><span className="font-semibold text-white">Quick Decisions:</span> Get a decision often within the same business day.</span>
                    </li>
                    <li className="flex items-start">
                         <svg className="h-5 w-5 text-orange-500 mr-3 flex-shrink-0 mt-0.5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                        <span><span className="font-semibold text-white">Funds Direct Deposited:</span> Money sent right to your bank account.</span>
                    </li>
                </ul>
            </div>
            <LoanRates onSelectLoan={onSelectLoan} />
             <div className="bg-slate-800/50 p-6 rounded-lg shadow-2xl border border-slate-700">
                <h3 className="text-lg font-bold text-white mb-3">Check Your Loan Eligibility</h3>
                <p className="text-sm text-slate-300 mb-4">Get your free CIBIL score to understand your credit-worthiness and improve your loan approval chances.</p>
                <a 
                    href="https://myscore.cibil.com/CreditView/enrollShort_new.page?enterprise=CIBIL&offer=FACRA" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full block text-center bg-orange-200/20 text-orange-400 font-bold py-3 px-4 rounded-md hover:bg-orange-200/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-slate-900 transition-colors"
                >
                    Get Free CIBIL Report
                </a>
            </div>
            <div className="text-center text-sm text-slate-400">
                <LockIcon />
                <span>We use 256-bit encryption to protect your data.</span>
            </div>
        </div>
      </aside>
    </div>
    {isLivePhotoModalOpen && (
      <LivePhotoCapture 
        onCapture={handleLivePhotoCapture}
        onClose={() => setIsLivePhotoModalOpen(false)}
      />
    )}
    {isAmortizationModalOpen && (
        <AmortizationModal
            loanAmount={parseFloat(formData.loanAmount)}
            tenure={parseInt(formData.tenure, 10)}
            interestRate={INTEREST_RATE}
            onClose={() => setIsAmortizationModalOpen(false)}
        />
    )}
    </>
  );
};

export default LoanApplicationForm;