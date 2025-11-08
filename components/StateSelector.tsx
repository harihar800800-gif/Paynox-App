import React from 'react';
// Fix: Replaced non-existent 'usStates' with 'indianStates' to align with available constants.
import { indianStates } from '../constants';

interface StateSelectorProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
}

const StateSelector: React.FC<StateSelectorProps> = ({ name, value, onChange, required = false }) => {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-slate-300">
        State
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="mt-1 block w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-md shadow-sm text-white focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
      >
        <option value="">Select State</option>
        {/* Fix: Replaced non-existent 'usStates' with 'indianStates' to align with available constants. */}
        {indianStates.map((state) => (
          <option key={state.abbreviation} value={state.abbreviation}>
            {state.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StateSelector;