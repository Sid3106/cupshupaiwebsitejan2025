export interface Country {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
}

export interface PhoneInputProps {
  value: string;
  countryCode: string;
  onChange: (value: string) => void;
  onCountryChange: (code: string) => void;
  error?: string;
  required?: boolean;
  label?: string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export interface CountryDropdownProps {
  value: string;
  onChange: (code: string) => void;
  disabled?: boolean;
}