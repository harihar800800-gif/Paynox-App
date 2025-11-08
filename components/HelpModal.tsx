import React from 'react';

interface HelpModalProps {
  onClose: () => void;
}

const faqs = [
    {
        q: 'What is the interest rate?',
        a: 'The interest rate varies depending on the loan product and your credit profile. You can see the indicative rates on our loan products page.'
    },
    {
        q: 'How long does the approval process take?',
        a: 'We strive for quick decisions, often within the same business day, once all required documents are submitted and verified.'
    },
    {
        q: 'What documents are required?',
        a: 'Commonly required documents include Aadhaar Card, PAN Card, Bank Statements, and business-related documents for business loans. The final step of the application form will list all required documents.'
    },
    {
        q: 'How can I check my application status?',
        a: 'You can check your application status by logging into your profile and navigating to the "Application Status" tab.'
    }
]

const HelpModal: React.FC<HelpModalProps> = ({ onClose }) => {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4"
      aria-labelledby="help-modal-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="bg-slate-800 border border-slate-700 rounded-lg shadow-xl w-full max-w-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 id="help-modal-title" className="text-2xl font-bold text-white">
              Help & Support
            </h2>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-200"
              aria-label="Close"
            >
              <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

            <div className="mt-4 space-y-6 text-slate-300">
                <div>
                    <h3 className="text-lg font-semibold text-slate-100 mb-2">Frequently Asked Questions</h3>
                     <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index}>
                                <p className="font-semibold text-orange-500">{faq.q}</p>
                                <p className="text-sm">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="border-t border-slate-700 pt-4">
                     <h3 className="text-lg font-semibold text-slate-100 mb-2">Contact Us</h3>
                     <p>If you need further assistance, please don't hesitate to reach out to our support team.</p>
                     <p className="mt-2">
                        <span className="font-semibold">Email:</span> <a href="mailto:paynoxltd@gmail.com" className="text-orange-500 hover:underline">paynoxltd@gmail.com</a>
                     </p>
                     <p>
                        <span className="font-semibold">Phone:</span> <a href="tel:+919149202820" className="text-orange-500 hover:underline">+91 9149202820</a>
                     </p>
                     <p className="mt-2">
                        <span className="font-semibold">Office Address:</span><br/>
                        <span className="text-slate-300">3459 Laxmi Industry Complex, Vasai (West), Dist - Palghar, Mumbai, Maharashtra 401208</span>
                     </p>
                </div>
            </div>
            <div className="mt-6 flex justify-end">
                 <button
                    onClick={onClose}
                    className="bg-orange-600 text-white font-bold py-2 px-6 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-slate-800 transition-colors"
                >
                    Close
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default HelpModal;