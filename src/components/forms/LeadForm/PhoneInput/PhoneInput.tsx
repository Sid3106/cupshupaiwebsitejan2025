import React from 'react';
import { CountrySelect } from './CountrySelect';
import type { PhoneInputProps } from './types';

export function PhoneInput({
  value,
  countryCode,
  onChange,
  onCountryChange,
  error,
  required
}: PhoneInputProps) {
  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        Phone Number {required && <span className="text-red-500">*</span>}
      </label>
      <div className="grid grid-cols-[120px_1fr] gap-2">
        <CountrySelect 
          value={countryCode} 
          onChange={onCountryChange} 
        />
        <input
          type="tel"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Enter phone number"
          className={`
            w-full px-4 py-2.5 rounded-lg border-2 
            ${error ? 'border-red-300' : 'border-gray-200'}
            focus:border-primary focus:ring focus:ring-primary/20
            placeholder:text-gray-400 text-gray-900
          `}
          required={required}
        />
      </div>
      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
}