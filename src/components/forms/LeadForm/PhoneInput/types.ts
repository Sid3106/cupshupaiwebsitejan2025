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
}