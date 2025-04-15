import React from 'react';

interface InputProps {
  label?: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  id?: string;
  required?: boolean;
  error?: string;
  className?: string;
}

export default function Input({
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  name,
  id,
  required = false,
  error,
  className = '',
}: InputProps) {
  const inputId = id || name;
  
  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label 
          htmlFor={inputId} 
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <input
        type={type}
        id={inputId}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full border ${error ? 'border-red-500' : 'border-gray-300'} rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent`}
      />
      
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
} 