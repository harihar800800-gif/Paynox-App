import React from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  placeholder?: string;
  required?: boolean;
  children?: React.ReactNode; // For select options
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  placeholder,
  required = false,
  children,
}) => {
  const commonProps = {
    id: name,
    name,
    value,
    onChange,
    required,
    className: "mt-1 block w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md shadow-sm placeholder-slate-400 text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm",
  };

  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-slate-300">
        {label}
      </label>
      {type === 'select' ? (
        <select {...commonProps}>{children}</select>
      ) : (
        <input type={type} placeholder={placeholder} {...commonProps} />
      )}
    </div>
  );
};

export default FormField;