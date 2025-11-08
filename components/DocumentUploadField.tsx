import React from 'react';

interface DocumentUploadFieldProps {
  label: string;
  name: string;
  fileName: string | null;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

const UploadIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-400 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L7.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
);

export const CheckCircleIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const DocumentUploadField: React.FC<DocumentUploadFieldProps> = ({ label, name, fileName, onChange, required = false }) => {
  return (
    <div>
      <label className="block text-sm font-medium text-slate-300">{label}{required && ' *'}</label>
      <div className="mt-1">
        <label htmlFor={name} className="relative cursor-pointer bg-slate-800 rounded-md font-medium text-orange-500 hover:text-orange-400 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-orange-500 focus-within:ring-offset-slate-800">
          <div className="w-full border-2 border-dashed border-slate-600 rounded-lg p-4 text-center hover:border-orange-500/50">
            {fileName ? (
              <div className="flex items-center justify-center text-sm text-slate-300">
                <CheckCircleIcon />
                <span>{fileName}</span>
              </div>
            ) : (
               <div className="flex items-center justify-center text-sm text-slate-300">
                <UploadIcon />
                <span>Select file to upload</span>
              </div>
            )}
          </div>
          <input id={name} name={name} type="file" className="sr-only" onChange={onChange} required={required} />
        </label>
      </div>
    </div>
  );
};

export default DocumentUploadField;