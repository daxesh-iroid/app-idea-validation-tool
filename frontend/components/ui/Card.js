'use client';

import React from 'react';

export default function Card({
  children,
  className = '',
  padding = 'md',
  hover = false,
}) {
  const paddingMap = {
    none: '',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-8',
  };

  return (
    <div
      className={`
        bg-white rounded-xl border border-slate-200 shadow-sm
        ${paddingMap[padding] || paddingMap.md}
        ${hover ? 'hover:shadow-md hover:border-slate-300 transition-all duration-200' : ''}
        ${className}
      `}
    >
      {children}
    </div>
  );
}
