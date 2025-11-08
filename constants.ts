import React from 'react';
import { PersonalLoanIcon, BusinessLoanIcon, GoldLoanIcon, VehicleLoanIcon, HomeLoanIcon, EducationLoanIcon } from './components/Icons';

export const indianStates = [
    { "name": "Andhra Pradesh", "abbreviation": "AP" },
    { "name": "Arunachal Pradesh", "abbreviation": "AR" },
    { "name": "Assam", "abbreviation": "AS" },
    { "name": "Bihar", "abbreviation": "BR" },
    { "name": "Chhattisgarh", "abbreviation": "CG" },
    { "name": "Goa", "abbreviation": "GA" },
    { "name": "Gujarat", "abbreviation": "GJ" },
    { "name": "Haryana", "abbreviation": "HR" },
    { "name": "Himachal Pradesh", "abbreviation": "HP" },
    { "name": "Jharkhand", "abbreviation": "JH" },
    { "name": "Karnataka", "abbreviation": "KA" },
    { "name": "Kerala", "abbreviation": "KL" },
    { "name": "Madhya Pradesh", "abbreviation": "MP" },
    { "name": "Maharashtra", "abbreviation": "MH" },
    { "name": "Manipur", "abbreviation": "MN" },
    { "name": "Meghalaya", "abbreviation": "ML" },
    { "name": "Mizoram", "abbreviation": "MZ" },
    { "name": "Nagaland", "abbreviation": "NL" },
    { "name": "Odisha", "abbreviation": "OR" },
    { "name": "Punjab", "abbreviation": "PB" },
    { "name": "Rajasthan", "abbreviation": "RJ" },
    { "name": "Sikkim", "abbreviation": "SK" },
    { "name": "Tamil Nadu", "abbreviation": "TN" },
    { "name": "Telangana", "abbreviation": "TG" },
    { "name": "Tripura", "abbreviation": "TR" },
    { "name": "Uttar Pradesh", "abbreviation": "UP" },
    { "name": "Uttarakhand", "abbreviation": "UT" },
    { "name": "West Bengal", "abbreviation": "WB" },
    { "name": "Andaman and Nicobar Islands", "abbreviation": "AN" },
    { "name": "Chandigarh", "abbreviation": "CH" },
    { "name": "Dadra and Nagar Haveli and Daman and Diu", "abbreviation": "DN" },
    { "name": "Delhi", "abbreviation": "DL" },
    { "name": "Jammu and Kashmir", "abbreviation": "JK" },
    { "name": "Ladakh", "abbreviation": "LA" },
    { "name": "Lakshadweep", "abbreviation": "LD" },
    { "name": "Puducherry", "abbreviation": "PY" }
];

export const loanProducts = [
  { 
    id: 'PERSONAL_LOAN',
    name: 'Personal Loan', 
    rate: '11.99% – 24% p.a.',
    Icon: PersonalLoanIcon,
    description: 'Fulfill your personal aspirations with our flexible personal loans. Whether it\'s for a wedding, vacation, or medical emergency, we offer quick approvals and competitive rates with minimal documentation.'
  },
  { 
    id: 'BUSINESS_LOAN',
    name: 'Business Loan', 
    rate: '12% – 20% p.a.',
    Icon: BusinessLoanIcon,
    description: 'Expand your business operations, purchase new machinery, or manage your working capital with our tailored business loans. We support your entrepreneurial vision with flexible repayment options.'
  },
  { 
    id: 'GOLD_LOAN',
    name: 'Gold Loan', 
    rate: '9% – 16% p.a.',
    Icon: GoldLoanIcon,
    description: 'Leverage the value of your gold for immediate financial needs. Our gold loans offer a secure and swift way to get funds with attractive interest rates and the highest level of security for your assets.'
  },
  { 
    id: 'VEHICLE_LOAN',
    name: 'Vehicle Loan', 
    rate: '8% – 14% p.a.',
    Icon: VehicleLoanIcon,
    description: 'Drive home your dream car or bike with our hassle-free vehicle loans. We provide financing for a wide range of new and pre-owned vehicles with competitive interest rates and a simple application process.'
  },
  { 
    id: 'HOME_LOAN',
    name: 'Home Loan', 
    rate: '8.5% – 11.5% p.a.',
    Icon: HomeLoanIcon,
    description: 'Turn your dream of owning a home into reality. Our home loans cater to various needs, from purchasing a new house to constructing or renovating one, with long tenures and affordable EMIs.'
  },
  { 
    id: 'EDUCATION_LOAN',
    name: 'Education Loan', 
    rate: '9.5% – 14% p.a.',
    Icon: EducationLoanIcon,
    description: 'Invest in your future with our education loans. We provide financial support for higher education in India and abroad, covering tuition fees, accommodation, and other expenses, so you can focus on your studies.'
  },
];


export const loanPurposes = [
    "Debt Consolidation",
    "Credit Card Refinancing",
    "Home Improvement",
    "Major Purchase",
    "Medical Expenses",
    "Moving or Relocation",
    "Vacation",
    "Wedding",
    "Business",
    "Other"
];

export const designationOptions = [
    "Proprietor",
    "Partner",
    "Director",
    "Self-Employed Professional",
    "Other"
];

export const loanFormSteps = ["Loan Details", "Personal Info", "Business Details", "Designation", "Upload Documents", "Submit"];

export const INTEREST_RATE = 14; // Annual Interest Rate in percentage
