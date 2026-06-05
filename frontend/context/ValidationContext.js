'use client';

import React, { createContext, useContext, useReducer } from 'react';

const ValidationContext = createContext(null);

const initialState = {
  currentStep: 1,
  totalSteps: 8,
  formData: {
    // Step 1: Basic Info
    ideaName: '',
    ideaDescription: '',
    appCategory: '',
    appType: '',
    businessModel: '',
    ideaNovelty: '',
    // Step 2: Target Audience
    targetAudience: '',
    audienceScope: '',
    ageGroup: '',
    userType: '',
    usageFrequency: '',
    // Step 3: Problem
    painLevel: '',
    problemDescription: '',
    currentSolution: '',
    problemConsequence: '',
    // Step 4: User Validation
    spokenToUsers: false,
    hasUserFeedback: false,
    hasEarlyCustomers: false,
    problemProven: false,
    // Step 5: Competition
    hasCompetitors: false,
    competitorNames: '',
    differentiation: '',
    competitorStatus: '',
    marketType: '',
    // Step 6: Monetization
    monetizationModel: '',
    monetizationTiming: '',
    priceSensitive: false,
    hasMarketAccess: false,
    // Step 7: Launch Plan
    launchLocation: '',
    launchScope: '',
    hasLocalRequirements: false,
    // Step 8: MVP Features
    mvpFeatures: [],
    userRoles: [],
    needsAdminPanel: false,
    needsPayment: false,
    needsChat: false,
    needsLocation: false,
  },
  scores: null,
  validationId: null,
};

function validationReducer(state, action) {
  switch (action.type) {
    case 'NEXT_STEP':
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, state.totalSteps),
      };
    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 1),
      };
    case 'GO_TO_STEP':
      return {
        ...state,
        currentStep: Math.min(Math.max(action.payload, 1), state.totalSteps),
      };
    case 'UPDATE_DATA':
      return {
        ...state,
        formData: { ...state.formData, ...action.payload },
      };
    case 'SET_SCORES':
      return {
        ...state,
        scores: action.payload.scores,
        validationId: action.payload.validationId,
      };
    case 'RESET':
      return { ...initialState };
    default:
      return state;
  }
}

export function ValidationProvider({ children }) {
  const [state, dispatch] = useReducer(validationReducer, initialState);

  return (
    <ValidationContext.Provider value={{ state, dispatch }}>
      {children}
    </ValidationContext.Provider>
  );
}

export function useValidation() {
  const context = useContext(ValidationContext);
  if (!context) {
    throw new Error('useValidation must be used within a ValidationProvider');
  }
  return context;
}

export default ValidationContext;
