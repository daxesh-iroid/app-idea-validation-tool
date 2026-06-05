'use client';

import React from 'react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';

function getScoreBadgeVariant(score) {
  if (score >= 75) return { variant: 'accent', label: 'Strong' };
  if (score >= 50) return { variant: 'primary', label: 'Moderate' };
  if (score >= 25) return { variant: 'warning', label: 'Weak' };
  return { variant: 'danger', label: 'Critical' };
}

export default function ResultCard({ title, score, description, icon }) {
  const badge = getScoreBadgeVariant(score);

  return (
    <Card hover className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {icon && <span className="text-xl">{icon}</span>}
          <h3 className="font-semibold text-slate-800 text-sm">{title}</h3>
        </div>
        <Badge variant={badge.variant} size="sm">
          {badge.label}
        </Badge>
      </div>

      {/* Score bar */}
      <div className="w-full">
        <div className="flex items-center justify-between mb-1">
          <span className="text-xs text-slate-500">Score</span>
          <span className="text-sm font-bold text-slate-800">{Math.round(score)}/100</span>
        </div>
        <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-700 ease-out ${
              score >= 75 ? 'bg-emerald-500' :
              score >= 50 ? 'bg-blue-500' :
              score >= 25 ? 'bg-amber-500' : 'bg-red-500'
            }`}
            style={{ width: `${Math.min(100, Math.max(0, score))}%` }}
          />
        </div>
      </div>

      {description && (
        <p className="text-sm text-slate-600 leading-relaxed">{description}</p>
      )}
    </Card>
  );
}
