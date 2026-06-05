'use client';

import React from 'react';

const STEP_LABELS = [
  'Basic Idea',
  'Audience',
  'Problem',
  'Competitors',
  'Monetization',
  'Location',
  'MVP Features',
  'Results',
];

export default function StepIndicator({ currentStep, totalSteps = 8, onStepClick }) {
  return (
    <div className="w-full py-4">
      {/* Progress bar */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500 ease-out"
            style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
          />
        </div>
      </div>

      {/* Step circles */}
      <div className="flex items-center justify-between">
        {STEP_LABELS.map((label, index) => {
          const step = index + 1;
          const isCompleted = step < currentStep;
          const isCurrent = step === currentStep;
          const isClickable = step < currentStep && onStepClick;

          return (
            <button
              key={step}
              type="button"
              disabled={!isClickable}
              onClick={() => isClickable?.(step)}
              className={`
                flex flex-col items-center gap-1 transition-all duration-300
                ${isClickable ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}
              `}
            >
              <div
                className={`
                  w-9 h-9 rounded-full flex items-center justify-center
                  text-sm font-semibold
                  transition-all duration-300
                  ${isCurrent
                    ? 'bg-primary text-white shadow-lg shadow-blue-200 scale-110'
                    : isCompleted
                      ? 'bg-accent text-white'
                      : 'bg-slate-200 text-slate-500'
                  }
                `}
              >
                {isCompleted ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step
                )}
              </div>
              <span
                className={`
                  text-xs font-medium hidden sm:block text-center leading-tight max-w-[70px]
                  ${isCurrent ? 'text-primary' : isCompleted ? 'text-accent' : 'text-slate-400'}
                `}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Mobile step text */}
      <p className="text-center text-sm text-slate-500 mt-2 sm:hidden">
        Step {currentStep} of {totalSteps}: {STEP_LABELS[currentStep - 1]}
      </p>
    </div>
  );
}
