import React, { useState, useRef, useEffect } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { countries } from './countries';
import type { CountryDropdownProps } from './types';
import { useClickOutside } from '../../../hooks/useClickOutside';

export function CountryDropdown({ value, onChange, disabled }: CountryDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedCountry = countries.find(c => c.code === value);

  useClickOutside(dropdownRef, () => setIsOpen(false));

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.dialCode.includes(searchTerm) ||
    country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`
          w-full flex items-center px-3 py-2 border-2 border-gray-200 rounded-lg 
          bg-white hover:bg-gray-50 focus:border-primary focus:ring-1 
          focus:ring-primary/20 transition-colors
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        aria-label="Select country code"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
      >
        <span className="mr-2" aria-hidden="true">{selectedCountry?.flag}</span>
        <span className="text-sm truncate">+{selectedCountry?.dialCode}</span>
        <ChevronDown className="ml-auto h-4 w-4 text-gray-400" aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-64 mt-1 bg-white border rounded-lg shadow-lg">
          <div className="p-2 border-b">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search countries..."
                className="w-full pl-8 pr-4 py-2 text-sm border rounded-md focus:border-primary focus:ring-1 focus:ring-primary/20"
                aria-label="Search countries"
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" aria-hidden="true" />
            </div>
          </div>
          <div 
            className="max-h-60 overflow-y-auto"
            role="listbox"
            aria-label="Countries list"
          >
            {filteredCountries.map((country) => (
              <button
                key={country.code}
                type="button"
                onClick={() => {
                  onChange(country.code);
                  setIsOpen(false);
                  setSearchTerm('');
                }}
                className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3"
                role="option"
                aria-selected={country.code === value}
              >
                <span aria-hidden="true">{country.flag}</span>
                <span className="flex-1 text-sm">{country.name}</span>
                <span className="text-sm text-gray-500">+{country.dialCode}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}