import React from 'react';

export const PersonalLoanIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M44 40.0001C44 35.5818 40.4182 32.0001 36 32.0001H28C23.5817 32.0001 20 35.5818 20 40.0001V42.0001H44V40.0001Z" fill="#1E3A8A"/>
    <circle cx="32" cy="24" r="8" fill="#FDBA74"/>
  </svg>
);

export const BusinessLoanIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="12" y="20" width="40" height="28" rx="4" fill="#1E3A8A"/>
    <path d="M24 16C24 13.7909 25.7909 12 28 12H36C38.2091 12 40 13.7909 40 16V20H24V16Z" fill="#FDBA74"/>
  </svg>
);

export const GoldLoanIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="12" y="38" width="40" height="8" rx="2" fill="#FDBA74"/>
    <rect x="16" y="28" width="32" height="8" rx="2" fill="#1E3A8A"/>
    <rect x="20" y="18" width="24" height="8" rx="2" fill="#FDBA74"/>
  </svg>
);

export const VehicleLoanIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M52 32H12C10.8954 32 10 32.8954 10 34V42H54V34C54 32.8954 53.1046 32 52 32Z" fill="#1E3A8A"/>
    <path d="M10 36L10 26C10 23.7909 11.7909 22 14 22H50C52.2091 22 54 23.7909 54 26V36H10Z" fill="#FDBA74"/>
    <circle cx="18" cy="46" r="4" fill="#1E3A8A"/>
    <circle cx="46" cy="46" r="4" fill="#1E3A8A"/>
  </svg>
);

export const HomeLoanIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M10 28L32 12L54 28V50H10V28Z" fill="#1E3A8A"/>
    <rect x="24" y="38" width="16" height="12" fill="#FDBA74"/>
  </svg>
);

export const EducationLoanIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <path d="M10 28L32 18L54 28L32 38L10 28Z" fill="#1E3A8A"/>
    <path d="M16 31V42C16 42 22 46 32 46C42 46 48 42 48 42V31L32 37L16 31Z" fill="#FDBA74"/>
  </svg>
);