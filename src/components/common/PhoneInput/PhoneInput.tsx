import React from 'react';
import { CountryDropdown } from './CountryDropdown';
import type { PhoneInputProps } from './types';

export function PhoneInput({
  value,
  countryCode,
  onChange,
  onCountryChange,
  error,
  required,
  label = 'Phone Number',
  placeholder = 'Enter phone number',
  className = '',
  disabled
}: PhoneInputProps) {
  return (
    <div className={`space-y-1 ${className}`}>
      <label className="block text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="grid grid-cols-[120px_1fr] gap-2">
        <CountryDropdown 
          value={countryCode} 
          onChange={onCountryChange}
          disabled={disabled}
        />
        <input
          type="tel"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={`
            w-full px-4 py-2.5 rounded-lg border-2 
            ${error ? 'border-red-300' : 'border-gray-200'}
            focus:border-primary focus:ring focus:ring-primary/20
            placeholder:text-gray-400 text-gray-900
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          required={required}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? 'phone-error' : undefined}
        />
      </div>
      {error && (
        <p id="phone-error" className="text-sm text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}