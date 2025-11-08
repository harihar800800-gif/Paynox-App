import React from 'react';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: string[];
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps, steps }) => {
  return (
    <nav aria-label="Progress">
      <ol role="list" className="flex items-center">
        {steps.map((step, stepIdx) => (
          <li key={step} className={`relative ${stepIdx !== totalSteps - 1 ? 'pr-8 sm:pr-20' : ''}`}>
            {stepIdx < currentStep ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-orange-500" />
                </div>
                <div
                  className="relative flex h-8 w-8 items-center justify-center bg-orange-500 rounded-full"
                >
                  <svg className="h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                   <span className="absolute top-10 w-max text-center text-xs text-slate-300 font-semibold">{step}</span>
                </div>
              </>
            ) : stepIdx === currentStep ? (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-slate-700" />
                </div>
                <div
                  className="relative flex h-8 w-8 items-center justify-center bg-slate-800 border-2 border-orange-500 rounded-full"
                >
                  <span className="h-2.5 w-2.5 bg-orange-500 rounded-full" aria-hidden="true" />
                   <span className="absolute top-10 w-max text-center text-xs text-orange-500 font-semibold">{step}</span>
                </div>
              </>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="h-0.5 w-full bg-slate-700" />
                </div>
                <div
                  className="relative flex h-8 w-8 items-center justify-center bg-slate-800 border-2 border-slate-600 rounded-full"
                >
                    <span className="absolute top-10 w-max text-center text-xs text-slate-400">{step}</span>
                </div>
              </>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default StepIndicator;