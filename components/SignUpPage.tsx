
import React, { useState } from 'react';

interface SignUpPageProps {
    onSignUp: () => void;
    onNavigateToLogin: () => void;
}

const SignUpPage: React.FC<SignUpPageProps> = ({ onSignUp, onNavigateToLogin }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you'd perform registration here
        console.log('Signing up with:', { name, email, mobile });
        // Typically, you would send an OTP to the mobile number for verification before completing the signup
        onSignUp();
    };

    return (
        <div className="max-w-md mx-auto">
            <div className="bg-slate-800/50 p-8 rounded-lg shadow-2xl border border-slate-700">
                <h2 className="text-3xl font-bold text-white text-center mb-6">Create an Account</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-300">
                            Full Name
                        </label>
                        <div className="mt-1">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="block w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="email-signup" className="block text-sm font-medium text-slate-300">
                            Email address
                        </label>
                        <div className="mt-1">
                            <input
                                id="email-signup"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="block w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="mobile-signup" className="block text-sm font-medium text-slate-300">
                           Mobile Number
                        </label>
                        <div className="mt-1 relative">
                             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <span className="text-slate-400 text-sm">+91</span>
                            </div>
                            <input
                                id="mobile-signup"
                                name="mobile"
                                type="tel"
                                autoComplete="tel"
                                required
                                value={mobile}
                                onChange={(e) => setMobile(e.target.value)}
                                className="block w-full pl-12 pr-4 py-3 bg-slate-700 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                placeholder="9876543210"
                            />
                        </div>
                    </div>


                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-slate-800"
                        >
                            Sign Up
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-sm text-slate-400">
                        Already have an account?{' '}
                        <button onClick={onNavigateToLogin} className="font-medium text-orange-500 hover:text-orange-400">
                            Sign In
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUpPage;
