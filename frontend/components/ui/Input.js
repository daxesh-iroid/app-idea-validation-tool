'use client';

import React, { forwardRef } from 'react';

const Input = forwardRef(function Input(
  {
    label,
    name,
    type = 'text',
    placeholder = '',
    error = '',
    required = false,
    className = '',
    register,
    validation = {},
    ...props
  },
  ref
) {
  const registerProps = register ? register(name, validation) : { name, ref };

  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      {label && (
        <label
          htmlFor={name}
          className="text-sm font-medium text-slate-700"
        >
          {label}
          {required && <span className="text-danger ml-0.5">*</span>}
        </label>
      )}
      <input
        id={name}
        type={type}
        placeholder={placeholder}
        className={`
          w-full px-4 py-2.5 rounded-lg border
          bg-white text-slate-900
          placeholder:text-slate-400
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
          ${error
            ? 'border-danger focus:ring-danger focus:border-danger'
            : 'border-slate-300 hover:border-slate-400'
          }
        `}
        {...registerProps}
        {...props}
      />
      {error && (
        <span className="text-sm text-danger">{error}</span>
      )}
    </div>
  );
});

export default Input;
