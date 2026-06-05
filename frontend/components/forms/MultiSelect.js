'use client';

import React from 'react';
import FormField from './FormField';

export default function MultiSelect({
  label,
  name,
  options = [],
  required = false,
  error = '',
  hint = '',
  value = [],
  onChange,
  className = '',
}) {
  const selected = Array.isArray(value) ? value : [];

  function handleToggle(optionValue) {
    const updated = selected.includes(optionValue)
      ? selected.filter((v) => v !== optionValue)
      : [...selected, optionValue];
    onChange?.(updated);
  }

  return (
    <FormField
      label={label}
      name={name}
      required={required}
      error={error}
      hint={hint}
      className={className}
    >
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const isSelected = selected.includes(opt.value);
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => handleToggle(opt.value)}
              className={`
                px-3 py-2 rounded-lg border text-sm font-medium
                transition-all duration-200
                ${isSelected
                  ? 'bg-primary text-white border-primary shadow-sm'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-primary hover:text-primary'
                }
              `}
            >
              {isSelected && (
                <span className="mr-1">&#10003;</span>
              )}
              {opt.label}
            </button>
          );
        })}
      </div>
    </FormField>
  );
}
