import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Search } from 'lucide-react';
import { countries } from './countries';
import type { Country } from './types';

interface CountrySelectProps {
  value: string;
  onChange: (code: string) => void;
}

export function CountrySelect({ value, onChange }: CountrySelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selectedCountry = countries.find(c => c.code === value);

  const filteredCountries = countries.filter(country =>
    country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    country.dialCode.includes(searchTerm)
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center px-3 py-2 border-2 border-gray-200 rounded-lg bg-white hover:bg-gray-50 focus:border-primary focus:ring-1 focus:ring-primary/20"
      >
        <span className="mr-2">{selectedCountry?.flag}</span>
        <span className="text-sm truncate">+{selectedCountry?.dialCode}</span>
        <ChevronDown className="ml-auto h-4 w-4 text-gray-400" />
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
              />
              <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div className="max-h-60 overflow-y-auto">
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
              >
                <span>{country.flag}</span>
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