import React from 'react';

interface Option {
  value: string;
  label: string;
}

interface FormSelectProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: Option[];
  error?: string;
  required?: boolean;
}

export function FormSelect({
  label,
  name,
  value,
  onChange,
  options,
  error,
  required
}: FormSelectProps) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        className={`
          mt-1 block w-full rounded-lg border-gray-300 shadow-sm
          focus:border-primary focus:ring-primary
          ${error ? 'border-red-500' : ''}
        `}
        required={required}
      >
        <option value="">Select an option</option>
        {options.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}