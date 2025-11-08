import React from 'react';

interface SubmissionSuccessProps {
    onStartNew: () => void;
}

const SubmissionSuccess: React.FC<SubmissionSuccessProps> = ({ onStartNew }) => {
    return (
        <div className="bg-slate-800 p-8 rounded-lg shadow-2xl text-center max-w-lg mx-auto border border-slate-700">
            <div className="mb-4">
                <svg className="mx-auto h-12 w-12 text-green-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            </div>
            <h2 className="text-3xl font-bold text-white mb-4">Application Submitted!</h2>
            <p className="text-slate-300 mb-6">
                Thank you! We have received your application and documents. Our team will review your submission and get back to you within 2-3 business days.
            </p>
            <button
                onClick={onStartNew}
                className="w-full bg-orange-600 text-white font-bold py-3 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-slate-800 transition-colors"
            >
                Start New Application
            </button>
        </div>
    );
};

export default SubmissionSuccess;