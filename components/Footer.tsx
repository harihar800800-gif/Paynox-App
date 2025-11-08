import React from 'react';

interface FooterProps {
    onComplaintClick: () => void;
    onAboutUsClick: () => void;
}

const Footer: React.FC<FooterProps> = ({ onComplaintClick, onAboutUsClick }) => {
    return (
        <footer className="bg-slate-800 text-slate-400">
            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-sm">
                <div className="space-y-4">
                    <p>
                        IMPORTANT INFORMATION ABOUT PROCEDURES FOR OPENING A NEW ACCOUNT: To help the government fight the funding of terrorism and money laundering activities, Federal law requires all financial institutions to obtain, verify, and record information that identifies each person who opens an account. What this means for you: When you open an account, we will ask for your name, address, date of birth, and other information that will allow us to identify you. We may also ask to see your driver's license or other identifying documents.
                    </p>
                    <p>
                        *Your loan agreement will identify the loan originator. Loan proceeds may not be used for post-secondary educational expenses, for any illegal purpose, or for the purchase of securities.
                    </p>
                </div>
                <div className="mt-8 border-t border-slate-700 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p>&copy; {new Date().getFullYear()} Paynox Finance Private Limited. All rights reserved.</p>
                    <div className="flex space-x-4 mt-4 md:mt-0">
                        <button onClick={onComplaintClick} className="hover:text-white bg-transparent border-none cursor-pointer p-0">File a Complaint</button>
                        <button onClick={onAboutUsClick} className="hover:text-white bg-transparent border-none cursor-pointer p-0">About Us</button>
                        <a href="#" className="hover:text-white">Terms of Use</a>
                        <a href="#" className="hover:text-white">Privacy Policy</a>
                    </div>
                </div>
                <div className="mt-8 border-t border-slate-700 pt-8 text-center">
                    <p className="font-semibold text-slate-300">Registered Office Address</p>
                    <p className="mt-2">
                        3459 Laxmi Industry Complex, Vasai (West), Dist - Palghar, Mumbai, Maharashtra 401208
                    </p>
                    <div className="mt-4 flex flex-col sm:flex-row justify-center items-center space-y-2 sm:space-y-0 sm:space-x-6">
                        <a href="mailto:paynoxltd@gmail.com" className="hover:text-white transition-colors flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                            paynoxltd@gmail.com
                        </a>
                        <a href="tel:+919149202820" className="hover:text-white transition-colors flex items-center">
                           <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" viewBox="0 0 20 20" fill="currentColor"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.518.759a11.03 11.03 0 006.364 6.364l.759-1.518a1 1 0 011.06-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                            +91 9149202820
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;