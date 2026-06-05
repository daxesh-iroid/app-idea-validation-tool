'use client';

import React from 'react';

export default function FormField({
  label,
  name,
  required = false,
  error = '',
  hint = '',
  children,
  className = '',
}) {
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
      {hint && (
        <p className="text-xs text-slate-500 -mt-1">{hint}</p>
      )}
      {children}
      {error && (
        <span className="text-sm text-danger">{error}</span>
      )}
    </div>
  );
}
