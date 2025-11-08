
import React, { useState, useEffect, useRef } from 'react';
import { loanProducts } from '../constants';

const PhoneIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-orange-500" viewBox="0 0 20 20" fill="currentColor">
        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.759a11.03 11.03 0 006.364 6.364l.759-1.518a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
    </svg>
);

const ProfileIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
);

const ProductsIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
    </svg>
);

const CIBILIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
    </svg>
);

const HelpIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
    </svg>
);

interface HeaderProps {
    isAuthenticated: boolean;
    onLogoClick: () => void;
    onNavigateToProfile: () => void;
    onLoginClick: () => void;
    onLogoutClick: () => void;
    onProductSelect: (loanId: string) => void;
    onCIBILClick: () => void;
    onHelpClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ isAuthenticated, onLogoClick, onNavigateToProfile, onLoginClick, onLogoutClick, onProductSelect, onCIBILClick, onHelpClick }) => {
    const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
    const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
    
    const productsDropdownRef = useRef<HTMLDivElement>(null);
    const profileDropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (productsDropdownRef.current && !productsDropdownRef.current.contains(event.target as Node)) {
                setIsProductsDropdownOpen(false);
            }
            if (profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
                setIsProfileDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    
    return (
        <header className="bg-slate-900/80 backdrop-blur-sm shadow-sm sticky top-0 z-50 border-b border-slate-700/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-3">
                    <div className="flex-shrink-0">
                        <button onClick={onLogoClick} className="flex items-center space-x-4 text-left focus:outline-none">
                            <svg className="h-12 w-12" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                                <rect width="100" height="100" rx="20" fill="#f97316" />
                                <text x="50" y="50" fontSize="50" fill="white" textAnchor="middle" dy=".3em" fontWeight="bold">PF</text>
                            </svg>
                            <div>
                                <span className="text-4xl font-bold text-white leading-tight">Paynox</span>
                                <span className="block text-lg text-orange-500 leading-tight font-semibold">Finance Private Limited</span>
                            </div>
                        </button>
                    </div>
                    <div className="flex items-center space-x-2">
                        <div className="hidden md:flex items-center mr-4">
                            <PhoneIcon />
                            <span className="text-slate-300 font-medium">Questions? Call <a href="tel:+919149202820" className="text-white hover:text-orange-500 font-semibold">+91 9149202820</a></span>
                        </div>
                        <div className="relative" ref={productsDropdownRef}>
                             <button
                                onClick={() => setIsProductsDropdownOpen(!isProductsDropdownOpen)}
                                className="p-2 rounded-full text-slate-400 hover:bg-slate-800 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-slate-900 transition-colors"
                                aria-label="View Loan Products"
                            >
                                <ProductsIcon />
                            </button>
                            {isProductsDropdownOpen && (
                                <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-md bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-slate-700">
                                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="products-menu">
                                        {loanProducts.map(product => (
                                            <button
                                                key={product.id}
                                                onClick={() => {
                                                    onProductSelect(product.id);
                                                    setIsProductsDropdownOpen(false);
                                                }}
                                                className="w-full text-left text-slate-300 hover:bg-slate-700 hover:text-white block px-4 py-2 text-sm"
                                                role="menuitem"
                                            >
                                                {product.name}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                         <button
                            onClick={onCIBILClick}
                            className="p-2 rounded-full text-slate-400 hover:bg-slate-800 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-slate-900 transition-colors"
                            aria-label="Check CIBIL Score"
                        >
                            <CIBILIcon />
                        </button>
                         <button
                            onClick={onHelpClick}
                            className="p-2 rounded-full text-slate-400 hover:bg-slate-800 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-slate-900 transition-colors"
                            aria-label="Help & Support"
                        >
                            <HelpIcon />
                        </button>
                        <div className="relative" ref={profileDropdownRef}>
                            <button
                                onClick={isAuthenticated ? () => setIsProfileDropdownOpen(!isProfileDropdownOpen) : onLoginClick}
                                className="p-2 rounded-full text-slate-400 hover:bg-slate-800 hover:text-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-slate-900 transition-colors"
                                aria-label="Open Profile"
                            >
                                <ProfileIcon />
                            </button>
                            {isAuthenticated && isProfileDropdownOpen && (
                                 <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-md bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border border-slate-700">
                                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="user-menu">
                                        <button
                                            onClick={() => { onNavigateToProfile(); setIsProfileDropdownOpen(false); }}
                                            className="w-full text-left text-slate-300 hover:bg-slate-700 hover:text-white block px-4 py-2 text-sm"
                                            role="menuitem"
                                        >
                                            My Profile
                                        </button>
                                        <button
                                            onClick={() => { onLogoutClick(); setIsProfileDropdownOpen(false); }}
                                            className="w-full text-left text-slate-300 hover:bg-slate-700 hover:text-white block px-4 py-2 text-sm"
                                            role="menuitem"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;