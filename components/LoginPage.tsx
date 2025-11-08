
import React, { useState, useEffect } from 'react';

interface LoginPageProps {
    onLogin: () => void;
    onNavigateToSignUp: () => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onNavigateToSignUp }) => {
    const [mobile, setMobile] = useState('');
    const [otp, setOtp] = useState('');
    const [otpSent, setOtpSent] = useState(false);
    const [timer, setTimer] = useState(60);
    const [isTimerActive, setIsTimerActive] = useState(false);

    useEffect(() => {
        // Fix: Changed NodeJS.Timeout to number, as setInterval in the browser returns a number.
        let interval: number | undefined;
        if (isTimerActive && timer > 0) {
            interval = window.setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            setIsTimerActive(false);
        }
        return () => clearInterval(interval);
    }, [isTimerActive, timer]);

    const startTimer = () => {
        setTimer(60);
        setIsTimerActive(true);
    };

    const handleSendOtp = (e: React.FormEvent) => {
        e.preventDefault();
        if (mobile.length === 10 && /^\d{10}$/.test(mobile)) {
            console.log('Sending OTP to:', mobile);
            setOtpSent(true);
            startTimer();
        } else {
            alert('Please enter a valid 10-digit mobile number.');
        }
    };

    const handleResendOtp = () => {
        console.log('Resending OTP to:', mobile);
        startTimer();
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        console.log('Verifying OTP:', otp);
        if (otp.length === 6 && /^\d{6}$/.test(otp)) {
            onLogin();
        } else {
            alert('Please enter a valid 6-digit OTP.');
        }
    };
    
    const handleChangeNumber = () => {
        setOtpSent(false);
        setIsTimerActive(false);
        setTimer(60);
        setOtp('');
    };

    return (
        <div className="max-w-md mx-auto">
            <div className="bg-slate-800/50 p-8 rounded-lg shadow-2xl border border-slate-700">
                <h2 className="text-3xl font-bold text-white text-center mb-6">Customer Login</h2>
                
                {!otpSent ? (
                    <form onSubmit={handleSendOtp} className="space-y-6">
                        <div>
                            <label htmlFor="mobile" className="block text-sm font-medium text-slate-300">
                                Mobile Number
                            </label>
                            <div className="mt-1 relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-slate-400 text-sm">+91</span>
                                </div>
                                <input
                                    id="mobile"
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
                                Send OTP
                            </button>
                        </div>
                    </form>
                ) : (
                    <form onSubmit={handleLogin} className="space-y-6">
                         <div>
                            <label htmlFor="mobile-display" className="block text-sm font-medium text-slate-300">
                                Mobile Number
                            </label>
                            <div className="mt-1">
                                <input
                                    id="mobile-display"
                                    type="text"
                                    value={`+91 ${mobile}`}
                                    disabled
                                    className="block w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-md shadow-sm text-slate-300 sm:text-sm"
                                />
                            </div>
                         </div>
                         <div>
                            <label htmlFor="otp" className="block text-sm font-medium text-slate-300">
                                Enter OTP
                            </label>
                            <div className="mt-1">
                                <input
                                    id="otp"
                                    name="otp"
                                    type="text"
                                    maxLength={6}
                                    required
                                    value={otp}
                                    onChange={(e) => setOtp(e.target.value)}
                                    className="block w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                                    placeholder="6-digit code"
                                />
                            </div>
                         </div>
                         <div className="flex items-center justify-between text-sm">
                             <button type="button" onClick={handleChangeNumber} className="font-medium text-orange-500 hover:text-orange-400">
                                Change Number
                            </button>
                             <button 
                                type="button" 
                                onClick={handleResendOtp} 
                                disabled={isTimerActive} 
                                className="font-medium text-slate-400 hover:text-slate-200 disabled:text-slate-500 disabled:cursor-not-allowed transition-colors"
                            >
                                {isTimerActive ? `Resend OTP in ${timer}s` : 'Resend OTP'}
                            </button>
                        </div>
                         <div>
                            <button
                                type="submit"
                                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-bold text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-slate-800"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>
                )}

                <div className="mt-6 text-center">
                    <p className="text-sm text-slate-400">
                        Don't have an account?{' '}
                        <button onClick={onNavigateToSignUp} className="font-medium text-orange-500 hover:text-orange-400">
                            Sign Up
                        </button>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;