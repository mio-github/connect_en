import React, { forwardRef } from 'react';
import { motion } from 'framer-motion';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  icon,
  helperText,
  fullWidth = false,
  className = '',
  ...props
}, ref) => {
  const hasError = !!error;
  
  return (
    <motion.div 
      className={`${fullWidth ? 'w-full' : ''}`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          {label}
          {props.required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <i className={`${icon} text-gray-400`} />
          </div>
        )}
        
        <input
          ref={ref}
          className={`
            block w-full rounded-lg border transition-all duration-200
            ${icon ? 'pl-10' : 'pl-3'} pr-3 py-2.5 text-sm
            ${hasError 
              ? 'border-red-300 text-red-900 placeholder-red-300 focus:outline-none focus:ring-red-500 focus:border-red-500' 
              : 'border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-primary-500 focus:border-primary-500'
            }
            disabled:bg-gray-50 disabled:text-gray-500 disabled:cursor-not-allowed
            ${className}
          `}
          {...props}
        />
        
        {hasError && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <i className="fas fa-exclamation-circle text-red-500" />
          </div>
        )}
      </div>
      
      {(error || helperText) && (
        <motion.p 
          className={`mt-1.5 text-sm ${hasError ? 'text-red-600' : 'text-gray-500'}`}
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
        >
          {error || helperText}
        </motion.p>
      )}
    </motion.div>
  );
});