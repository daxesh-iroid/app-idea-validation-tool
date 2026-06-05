'use client';

import React from 'react';

function getScoreColor(score) {
  if (score >= 75) return { stroke: '#059669', text: 'text-emerald-600', bg: 'bg-emerald-50' };
  if (score >= 50) return { stroke: '#2563EB', text: 'text-blue-600', bg: 'bg-blue-50' };
  if (score >= 25) return { stroke: '#D97706', text: 'text-amber-600', bg: 'bg-amber-50' };
  return { stroke: '#DC2626', text: 'text-red-600', bg: 'bg-red-50' };
}

export default function ScoreGauge({ score = 0, label = '', size = 120, strokeWidth = 10 }) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clampedScore = Math.min(100, Math.max(0, score));
  const offset = circumference - (clampedScore / 100) * circumference;
  const colors = getScoreColor(clampedScore);

  return (
    <div className={`flex flex-col items-center gap-1 ${colors.bg} rounded-2xl p-4`}>
      <svg width={size} height={size} className="transform -rotate-90">
        {/* Background circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#E2E8F0"
          strokeWidth={strokeWidth}
        />
        {/* Progress circle */}
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={colors.stroke}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div
        className="absolute flex items-center justify-center"
        style={{ width: size, height: size }}
      >
        <span className={`text-2xl font-bold ${colors.text}`}>
          {Math.round(clampedScore)}
        </span>
      </div>
      {label && (
        <span className="text-xs font-medium text-slate-600 text-center max-w-[100px] leading-tight mt-1">
          {label}
        </span>
      )}
    </div>
  );
}
