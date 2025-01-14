// import React from 'react';
// import { ChevronDown } from 'lucide-react';

// interface PhoneInputProps {
//   value: string;
//   countryCode: string;
//   onChange: (value: string) => void;
//   onCountryChange: (code: string) => void;
//   error?: string;
//   required?: boolean;
// }

// export function PhoneInput({
//   value,
//   countryCode,
//   onChange,
//   onCountryChange,
//   error,
//   required
// }: PhoneInputProps) {
//   return (
//     <div className="space-y-1">
//       <label className="block text-sm font-medium text-gray-700">
//         Phone Number {required && <span className="text-red-500">*</span>}
//       </label>
//       <div className="grid grid-cols-[120px_1fr] gap-2">
//         <div className="relative">
//           <select
//             value={countryCode}
//             onChange={(e) => onCountryChange(e.target.value)}
//             className="w-full appearance-none px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring focus:ring-primary/20"
//           >
//             <option value="US">🇺🇸 +1</option>
//             <option value="IN">🇮🇳 +91</option>
//             <option value="GB">🇬🇧 +44</option>
//           </select>
//           <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
//         </div>
//         <input
//           type="tel"
//           value={value}
//           onChange={(e) => onChange(e.target.value)}
//           placeholder="(555) 555-0123"
//           className={`
//             w-full px-4 py-2.5 rounded-lg border-2 
//             ${error ? 'border-red-300' : 'border-gray-200'}
//             focus:border-primary focus:ring focus:ring-primary/20
//             placeholder:text-gray-400 text-gray-900
//           `}
//           required={required}
//         />
//       </div>
//       {error && <p className="text-sm text-red-500">{error}</p>}
//     </div>
//   );
// }

import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface PhoneInputProps {
  value: string;
  countryCode: string;
  onChange: (value: string) => void;
  onCountryChange: (code: string) => void;
  error?: string;
  required?: boolean;
}

interface Country {
  alpha2Code: string;
  callingCodes: string[];
  flags: {
    png: string;
  };
}

export function PhoneInput({
  value,
  countryCode,
  onChange,
  onCountryChange,
  error,
  required
}: PhoneInputProps) {
  const [countries, setCountries] = useState<Country[]>([]);

  // Fetch countries on component mount
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://restcountries.com/v2/all');
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();

        // Log the response to inspect the data structure
        console.log('Fetched data:', data);

        const countryList = data.map((country: any) => ({
          cca2: country.alpha2Code ||  'Unknown',  
          flag: country.flags?.png || 'https://cdn.pixabay.com/photo/2016/08/24/17/07/india-1617463_1280.png',   
          dialCode: country.callingCodes ? `+${country.callingCodes[0]}` : ''  // Correctly handle calling code
        }));
        setCountries(countryList);
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700">
        Phone Number {required && <span className="text-red-500">*</span>}
      </label>
      <div className="grid grid-cols-[120px_1fr] gap-2">
        <div className="relative">
          <select
            value={countryCode}
            onChange={(e) => onCountryChange(e.target.value)}
            className="w-full appearance-none px-4 py-2.5 rounded-lg border-2 border-gray-200 focus:border-primary focus:ring focus:ring-primary/20"
          >
            {countries.map((country) => (
              <option key={country.cca2} value={country.cca2}>
                {/* <img
                  src='https://cdn.pixabay.com/photo/2016/08/24/17/07/india-1617463_1280.png'
                  alt={country.cca2}
                  className="inline-block w-100 h-100 mr-2"
                /> */}
                <p>{country.cca2}</p>
                {`${country.dialCode}`}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
        <input
          type="tel"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="(555) 555-0123"
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

