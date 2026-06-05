'use client';

import React from 'react';
import FormField from './FormField';

export default function SelectField({
  label,
  name,
  options = [],
  placeholder = 'Select an option',
  required = false,
  error = '',
  hint = '',
  register,
  validation = {},
  className = '',
  value,
  onChange,
}) {
  const registerProps = register
    ? register(name, validation)
    : { name, value, onChange: (e) => onChange?.(e.target.value) };

  return (
    <FormField
      label={label}
      name={name}
      required={required}
      error={error}
      hint={hint}
      className={className}
    >
      <select
        id={name}
        className={`
          w-full px-4 py-2.5 rounded-lg border
          bg-white text-slate-900
          transition-all duration-200
          focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary
          ${error
            ? 'border-danger focus:ring-danger focus:border-danger'
            : 'border-slate-300 hover:border-slate-400'
          }
        `}
        {...registerProps}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </FormField>
  );
}
