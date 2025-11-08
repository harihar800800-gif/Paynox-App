import React from 'react';
import { indianStates } from '../constants';

interface IndianStateSelectorProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}

const IndianStateSelector: React.FC<IndianStateSelectorProps> = ({ name, value, onChange, required = false }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-slate-300">
        State / Union Territory
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1 block w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
      >
        <option value="">Select State/UT</option>
        {indianStates.map((state) => (
          <option key={state.abbreviation} value={state.abbreviation}>
            {state.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default IndianStateSelector;