import React, { useState } from 'react';

interface ComplaintModalProps {
  onClose: () => void;
}

const ComplaintModal: React.FC<ComplaintModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    loanId: '',
    complaint: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send this data to a server
    console.log('Complaint Submitted:', formData);
    setIsSubmitted(true);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4"
      aria-labelledby="complaint-modal-title"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        className="bg-slate-800 border border-slate-700 rounded-lg shadow-xl w-full max-w-lg overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-6">
          <div className="flex justify-between items-start">
            <h2 id="complaint-modal-title" className="text-2xl font-bold text-white">
              {isSubmitted ? 'Complaint Received' : 'File a Complaint'}
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

          {isSubmitted ? (
            <div className="mt-4 text-center">
              <p className="text-slate-300 mb-6">
                Thank you for your feedback. We have received your complaint and will look into it shortly. A confirmation has been sent to your email address.
              </p>
              <button
                onClick={onClose}
                className="w-full bg-orange-600 text-white font-bold py-3 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-slate-800 transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-slate-300">Full Name</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300">Email Address</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
              </div>
               <div>
                <label htmlFor="loanId" className="block text-sm font-medium text-slate-300">Loan Application ID (Optional)</label>
                <input type="text" name="loanId" id="loanId" value={formData.loanId} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
              </div>
              <div>
                <label htmlFor="complaint" className="block text-sm font-medium text-slate-300">Complaint Details</label>
                <textarea name="complaint" id="complaint" value={formData.complaint} onChange={handleInputChange} rows={4} required className="mt-1 block w-full px-3 py-2 bg-slate-700 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" />
              </div>
              <div className="pt-4 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="bg-slate-600 text-slate-100 font-bold py-2 px-4 rounded-md hover:bg-slate-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-400 focus:ring-offset-slate-800 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-orange-600 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:ring-offset-slate-800 transition-colors"
                >
                  Submit Complaint
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintModal;