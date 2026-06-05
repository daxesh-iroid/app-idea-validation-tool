'use client';

import React, { useState } from 'react';
import { useValidation } from '../../context/ValidationContext';
import StepIndicator from '../../components/validation/StepIndicator';
import ScoreGauge from '../../components/validation/ScoreGauge';
import ResultCard from '../../components/validation/ResultCard';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';
import Badge from '../../components/ui/Badge';
import Input from '../../components/ui/Input';
import FormField from '../../components/forms/FormField';
import SelectField from '../../components/forms/SelectField';
import MultiSelect from '../../components/forms/MultiSelect';

/* ─── Option lists ─── */
const APP_CATEGORY_OPTIONS = [
  { value: 'health_fitness', label: 'Health & Fitness' },
  { value: 'education', label: 'Education' },
  { value: 'e_commerce', label: 'E-Commerce' },
  { value: 'marketplace', label: 'Marketplace' },
  { value: 'on_demand', label: 'On-Demand Services' },
  { value: 'finance', label: 'Finance' },
  { value: 'travel', label: 'Travel' },
  { value: 'food_delivery', label: 'Food Delivery' },
  { value: 'social_networking', label: 'Social Networking' },
  { value: 'productivity', label: 'Productivity' },
  { value: 'ai_app', label: 'AI App' },
  { value: 'saas', label: 'SaaS' },
  { value: 'crm_erp', label: 'CRM / ERP' },
  { value: 'real_estate', label: 'Real Estate' },
  { value: 'logistics', label: 'Logistics' },
  { value: 'beauty_wellness', label: 'Beauty & Wellness' },
  { value: 'parenting_kids', label: 'Parenting & Kids' },
  { value: 'other', label: 'Other' },
];

const APP_TYPE_OPTIONS = [
  { value: 'mobile_app', label: 'Mobile App' },
  { value: 'website', label: 'Website' },
  { value: 'web_app', label: 'Web App' },
  { value: 'marketplace', label: 'Marketplace' },
  { value: 'saas', label: 'SaaS Platform' },
  { value: 'platform', label: 'Platform' },
];

const BUSINESS_MODEL_OPTIONS = [
  { value: 'b2b', label: 'B2B' },
  { value: 'b2c', label: 'B2C' },
  { value: 'b2b2c', label: 'B2B2C' },
  { value: 'internal', label: 'Internal Tool' },
  { value: 'marketplace', label: 'Marketplace' },
];

const IDEA_NOVELTY_OPTIONS = [
  { value: 'new', label: 'Brand New Idea' },
  { value: 'improvement', label: 'Improvement on Existing' },
];

const AUDIENCE_SCOPE_OPTIONS = [
  { value: 'local', label: 'Local' },
  { value: 'national', label: 'National' },
  { value: 'global', label: 'Global' },
];

const USER_TYPE_OPTIONS = [
  { value: 'consumer', label: 'Consumer' },
  { value: 'business_owner', label: 'Business Owner' },
  { value: 'professional', label: 'Professional' },
  { value: 'student', label: 'Student' },
  { value: 'parent', label: 'Parent' },
  { value: 'employee', label: 'Employee' },
  { value: 'service_provider', label: 'Service Provider' },
];

const USAGE_FREQUENCY_OPTIONS = [
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'occasionally', label: 'Occasionally' },
  { value: 'one_time', label: 'One-time' },
];

const PAIN_LEVEL_OPTIONS = [
  { value: 'low', label: 'Low — Nice to have' },
  { value: 'medium', label: 'Medium — Somewhat frustrating' },
  { value: 'high', label: 'High — Very frustrating' },
  { value: 'urgent', label: 'Urgent — Critical problem' },
];

const COMPETITOR_STATUS_OPTIONS = [
  { value: 'none', label: 'No competitors' },
  { value: 'few', label: 'Few competitors' },
  { value: 'many', label: 'Many competitors' },
  { value: 'strong', label: 'Strong established players' },
  { value: 'not_researched', label: "Haven't researched yet" },
];

const MARKET_TYPE_OPTIONS = [
  { value: 'existing', label: 'Existing Market' },
  { value: 'new', label: 'New / Blue Ocean Market' },
];

const MONETIZATION_MODEL_OPTIONS = [
  { value: 'free_app_only', label: 'Free App Only' },
  { value: 'paid_app', label: 'Paid App (one-time)' },
  { value: 'subscription', label: 'Subscription' },
  { value: 'freemium', label: 'Freemium' },
  { value: 'commission', label: 'Commission / Transaction Fee' },
  { value: 'in_app_purchase', label: 'In-App Purchases' },
  { value: 'ads', label: 'Advertising' },
  { value: 'lead_generation', label: 'Lead Generation' },
  { value: 'saas_monthly', label: 'SaaS Monthly' },
  { value: 'enterprise_license', label: 'Enterprise License' },
  { value: 'affiliate_revenue', label: 'Affiliate Revenue' },
  { value: 'not_sure_yet', label: "Not Sure Yet" },
];

const MONETIZATION_TIMING_OPTIONS = [
  { value: 'mvp', label: 'From MVP Launch' },
  { value: 'later', label: 'After Initial Traction' },
];

const LAUNCH_SCOPE_OPTIONS = [
  { value: 'city', label: 'Single City' },
  { value: 'state', label: 'State / Region' },
  { value: 'country', label: 'Country-wide' },
  { value: 'multi_country', label: 'Multi-Country' },
  { value: 'global', label: 'Global' },
];

const MVP_FEATURE_OPTIONS = [
  { value: 'basic_login_profile', label: 'Login & User Profiles' },
  { value: 'listing_search', label: 'Listings & Search' },
  { value: 'booking_ordering', label: 'Booking / Ordering' },
  { value: 'payment', label: 'Payment Integration' },
  { value: 'chat', label: 'Chat / Messaging' },
  { value: 'notifications', label: 'Push Notifications' },
  { value: 'admin_panel', label: 'Admin Panel' },
  { value: 'maps', label: 'Maps & Location' },
  { value: 'real_time_tracking', label: 'Real-time Tracking' },
  { value: 'ai_features', label: 'AI Features' },
  { value: 'multi_role_marketplace', label: 'Multi-Role Marketplace' },
  { value: 'reports_analytics', label: 'Reports & Analytics' },
];

const USER_ROLE_OPTIONS = [
  { value: 'customer', label: 'Customer' },
  { value: 'provider', label: 'Service Provider' },
  { value: 'admin', label: 'Admin' },
  { value: 'manager', label: 'Manager' },
  { value: 'driver', label: 'Driver' },
  { value: 'vendor', label: 'Vendor' },
];

const PLATFORM_NEEDS_OPTIONS = [
  { value: 'mobile_only', label: 'Mobile Only' },
  { value: 'web_only', label: 'Web Only' },
  { value: 'both', label: 'Both Mobile & Web' },
];

/* ─── Boolean Toggle ─── */
function BooleanToggle({ label, description, value, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`
        flex items-center justify-between w-full p-4 rounded-lg border-2
        transition-all duration-200 text-left
        ${value
          ? 'border-primary bg-blue-50'
          : 'border-slate-200 bg-white hover:border-slate-300'
        }
      `}
    >
      <div>
        <p className={`font-medium text-sm ${value ? 'text-primary' : 'text-slate-700'}`}>
          {label}
        </p>
        {description && (
          <p className="text-xs text-slate-500 mt-0.5">{description}</p>
        )}
      </div>
      <div
        className={`
          w-10 h-6 rounded-full relative transition-all duration-200 flex-shrink-0 ml-3
          ${value ? 'bg-primary' : 'bg-slate-300'}
        `}
      >
        <div
          className={`
            w-4 h-4 bg-white rounded-full absolute top-1 transition-all duration-200 shadow-sm
            ${value ? 'left-5' : 'left-1'}
          `}
        />
      </div>
    </button>
  );
}

/* ─── Step Components ─── */

function Step1BasicIdea({ formData, updateData }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Tell us about your app idea</h2>
        <p className="text-sm text-slate-500 mt-1">Start with the basics — what are you building?</p>
      </div>

      <Input
        label="App / Idea Name"
        name="ideaName"
        placeholder="e.g., FitTrack Pro"
        required
        value={formData.ideaName}
        onChange={(e) => updateData({ ideaName: e.target.value })}
      />

      <FormField label="Idea Description" name="ideaDescription" hint="Describe your app idea in 2-3 sentences">
        <textarea
          id="ideaDescription"
          rows={3}
          placeholder="What does your app do? What problem does it solve?"
          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 resize-none"
          value={formData.ideaDescription}
          onChange={(e) => updateData({ ideaDescription: e.target.value })}
        />
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectField
          label="App Category"
          name="appCategory"
          options={APP_CATEGORY_OPTIONS}
          placeholder="Select category"
          value={formData.appCategory}
          onChange={(val) => updateData({ appCategory: val })}
        />
        <SelectField
          label="App Type"
          name="appType"
          options={APP_TYPE_OPTIONS}
          placeholder="Select type"
          value={formData.appType}
          onChange={(val) => updateData({ appType: val })}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectField
          label="Business Model"
          name="businessModel"
          options={BUSINESS_MODEL_OPTIONS}
          placeholder="Select model"
          value={formData.businessModel}
          onChange={(val) => updateData({ businessModel: val })}
        />
        <SelectField
          label="Idea Novelty"
          name="ideaNovelty"
          options={IDEA_NOVELTY_OPTIONS}
          placeholder="Select novelty"
          value={formData.ideaNovelty}
          onChange={(val) => updateData({ ideaNovelty: val })}
        />
      </div>
    </div>
  );
}

function Step2TargetAudience({ formData, updateData }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Who is your target audience?</h2>
        <p className="text-sm text-slate-500 mt-1">Understanding your users is key to validation.</p>
      </div>

      <Input
        label="Target Audience"
        name="targetAudience"
        placeholder="e.g., Busy professionals aged 25-40"
        value={formData.targetAudience}
        onChange={(e) => updateData({ targetAudience: e.target.value })}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectField
          label="Audience Scope"
          name="audienceScope"
          options={AUDIENCE_SCOPE_OPTIONS}
          placeholder="Select scope"
          value={formData.audienceScope}
          onChange={(val) => updateData({ audienceScope: val })}
        />
        <Input
          label="Age Group"
          name="ageGroup"
          placeholder="e.g., 18-35"
          value={formData.ageGroup}
          onChange={(e) => updateData({ ageGroup: e.target.value })}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectField
          label="User Type"
          name="userType"
          options={USER_TYPE_OPTIONS}
          placeholder="Select user type"
          value={formData.userType}
          onChange={(val) => updateData({ userType: val })}
        />
        <SelectField
          label="Expected Usage Frequency"
          name="usageFrequency"
          options={USAGE_FREQUENCY_OPTIONS}
          placeholder="Select frequency"
          value={formData.usageFrequency}
          onChange={(val) => updateData({ usageFrequency: val })}
        />
      </div>

      <SelectField
        label="Pain Level"
        name="painLevel"
        options={PAIN_LEVEL_OPTIONS}
        placeholder="How painful is the problem?"
        value={formData.painLevel}
        onChange={(val) => updateData({ painLevel: val })}
      />
    </div>
  );
}

function Step3ProblemValidation({ formData, updateData }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Validate the problem</h2>
        <p className="text-sm text-slate-500 mt-1">A great app solves a real, painful problem.</p>
      </div>

      <FormField label="Problem Description" name="problemDescription" hint="What specific problem does your app solve?">
        <textarea
          id="problemDescription"
          rows={3}
          placeholder="Describe the problem your target users face..."
          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 resize-none"
          value={formData.problemDescription}
          onChange={(e) => updateData({ problemDescription: e.target.value })}
        />
      </FormField>

      <FormField label="Current Solution" name="currentSolution" hint="How do people solve this today?">
        <textarea
          id="currentSolution"
          rows={2}
          placeholder="What workarounds or existing solutions do people use?"
          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 resize-none"
          value={formData.currentSolution}
          onChange={(e) => updateData({ currentSolution: e.target.value })}
        />
      </FormField>

      <FormField label="Problem Consequence" name="problemConsequence" hint="What happens if this problem isn't solved?">
        <textarea
          id="problemConsequence"
          rows={2}
          placeholder="What's the impact of not solving this problem?"
          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 resize-none"
          value={formData.problemConsequence}
          onChange={(e) => updateData({ problemConsequence: e.target.value })}
        />
      </FormField>

      <div className="space-y-3">
        <p className="text-sm font-medium text-slate-700">User Validation</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <BooleanToggle
            label="Spoken to potential users"
            description="I've talked to people who have this problem"
            value={formData.spokenToUsers}
            onChange={(val) => updateData({ spokenToUsers: val })}
          />
          <BooleanToggle
            label="Collected user feedback"
            description="I have survey or interview data"
            value={formData.hasUserFeedback}
            onChange={(val) => updateData({ hasUserFeedback: val })}
          />
          <BooleanToggle
            label="Have early customers"
            description="People are already paying or using it"
            value={formData.hasEarlyCustomers}
            onChange={(val) => updateData({ hasEarlyCustomers: val })}
          />
          <BooleanToggle
            label="Problem is proven"
            description="I have evidence this is a real problem"
            value={formData.problemProven}
            onChange={(val) => updateData({ problemProven: val })}
          />
        </div>
      </div>
    </div>
  );
}

function Step4CompetitorAnalysis({ formData, updateData }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Competitor Analysis</h2>
        <p className="text-sm text-slate-500 mt-1">Understanding your competition helps position your idea.</p>
      </div>

      <BooleanToggle
        label="I have competitors"
        description="There are other apps or services solving a similar problem"
        value={formData.hasCompetitors}
        onChange={(val) => updateData({ hasCompetitors: val })}
      />

      {formData.hasCompetitors && (
        <Input
          label="Competitor Names"
          name="competitorNames"
          placeholder="e.g., Uber, Lyft, DoorDash"
          value={formData.competitorNames}
          onChange={(e) => updateData({ competitorNames: e.target.value })}
        />
      )}

      <FormField label="Your Differentiation" name="differentiation" hint="What makes your solution unique?">
        <textarea
          id="differentiation"
          rows={3}
          placeholder="How is your app different from competitors?"
          className="w-full px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200 resize-none"
          value={formData.differentiation}
          onChange={(e) => updateData({ differentiation: e.target.value })}
        />
      </FormField>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <SelectField
          label="Competitor Status"
          name="competitorStatus"
          options={COMPETITOR_STATUS_OPTIONS}
          placeholder="Select status"
          value={formData.competitorStatus}
          onChange={(val) => updateData({ competitorStatus: val })}
        />
        <SelectField
          label="Market Type"
          name="marketType"
          options={MARKET_TYPE_OPTIONS}
          placeholder="Select market type"
          value={formData.marketType}
          onChange={(val) => updateData({ marketType: val })}
        />
      </div>
    </div>
  );
}

function Step5Monetization({ formData, updateData }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Monetization Strategy</h2>
        <p className="text-sm text-slate-500 mt-1">How will your app make money?</p>
      </div>

      <SelectField
        label="Monetization Model"
        name="monetizationModel"
        options={MONETIZATION_MODEL_OPTIONS}
        placeholder="Select monetization model"
        value={formData.monetizationModel}
        onChange={(val) => updateData({ monetizationModel: val })}
      />

      <SelectField
        label="When to Monetize"
        name="monetizationTiming"
        options={MONETIZATION_TIMING_OPTIONS}
        placeholder="Select timing"
        value={formData.monetizationTiming}
        onChange={(val) => updateData({ monetizationTiming: val })}
      />

      <BooleanToggle
        label="Price Sensitive Market"
        description="Users in this market are very price-conscious"
        value={formData.priceSensitive}
        onChange={(val) => updateData({ priceSensitive: val })}
      />

      <BooleanToggle
        label="Have Market Access"
        description="I have connections or channels to reach my target market"
        value={formData.hasMarketAccess}
        onChange={(val) => updateData({ hasMarketAccess: val })}
      />
    </div>
  );
}

function Step6LaunchLocation({ formData, updateData }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900">Launch Location</h2>
        <p className="text-sm text-slate-500 mt-1">Where will you launch first?</p>
      </div>

      <Input
        label="Launch Location"
        name="launchLocation"
        placeholder="e.g., San Francisco, CA"
        value={formData.launchLocation}
        onChange={(e) => updateData({ launchLocation: e.target.value })}
      />

      <SelectField
        label="Launch Scope"
        name="launchScope"
        options={LAUNCH_SCOPE_OPTIONS}
        placeholder="Select launch scope"
        value={formData.launchScope}
        onChange={(val) => updateData({ launchScope: val })}
      />

      <BooleanToggle
        label="Has Local Requirements"
        description="Need local licenses, permits, or partnerships"
        value={formData.hasLocalRequirements}
        onChange={(val) => updateData({ hasLocalRequirements: val })}
      />
    </div>
  );
}

function Step7MVPFeatures({ formData, updateData }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-slate-900">MVP Features</h2>
        <p className="text-sm text-slate-500 mt-1">Select the features you need for your MVP.</p>
      </div>

      <MultiSelect
        label="MVP Features"
        name="mvpFeatures"
        options={MVP_FEATURE_OPTIONS}
        value={formData.mvpFeatures}
        onChange={(val) => updateData({ mvpFeatures: val })}
      />

      <MultiSelect
        label="User Roles"
        name="userRoles"
        options={USER_ROLE_OPTIONS}
        value={formData.userRoles}
        onChange={(val) => updateData({ userRoles: val })}
      />

      <div className="space-y-3">
        <p className="text-sm font-medium text-slate-700">Technical Requirements</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <BooleanToggle label="Admin Panel" value={formData.needsAdminPanel} onChange={(val) => updateData({ needsAdminPanel: val })} />
          <BooleanToggle label="Payment Integration" value={formData.needsPayment} onChange={(val) => updateData({ needsPayment: val })} />
          <BooleanToggle label="Chat / Messaging" value={formData.needsChat} onChange={(val) => updateData({ needsChat: val })} />
          <BooleanToggle label="Location / Maps" value={formData.needsLocation} onChange={(val) => updateData({ needsLocation: val })} />
          <BooleanToggle label="AI Features" value={formData.needsAI} onChange={(val) => updateData({ needsAI: val })} />
          <BooleanToggle label="Third-party Integrations" value={formData.needsIntegrations} onChange={(val) => updateData({ needsIntegrations: val })} />
        </div>
      </div>

      <SelectField
        label="Platform Needs"
        name="platformNeeds"
        options={PLATFORM_NEEDS_OPTIONS}
        placeholder="Select platform"
        value={formData.platformNeeds}
        onChange={(val) => updateData({ platformNeeds: val })}
      />
    </div>
  );
}

function Step8Results({ formData, scores, onSubmitEmail, email, setEmail, submitting }) {
  if (!scores) return null;

  const {
    ideaClarity,
    marketRisk,
    mvpFeasibility,
    monetizationFit,
    developmentComplexity,
    overallScore,
    resultType,
    recommendedMVP,
    featuresToAvoid,
  } = scores;

  const resultMessages = {
    'Ready for MVP': {
      title: 'Your idea is ready for MVP development!',
      description: 'You have a clear understanding of your market, users, and solution. Time to build!',
      color: 'accent',
    },
    'Needs Refinement': {
      title: 'Your idea needs some refinement',
      description: 'There are a few areas that need more clarity before building. Consider the recommendations below.',
      color: 'warning',
    },
    'High Risk': {
      title: 'Your idea carries significant risk',
      description: 'Several validation gaps exist. We recommend addressing these before investing in development.',
      color: 'danger',
    },
  };

  const result = resultMessages[resultType] || resultMessages['Needs Refinement'];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-xl font-bold text-slate-900">Your Validation Results</h2>
        <p className="text-sm text-slate-500 mt-1">Here&apos;s how your app idea scores</p>
      </div>

      {/* Result type banner */}
      <div className={`p-4 rounded-xl border-2 ${
        result.color === 'accent' ? 'bg-emerald-50 border-emerald-200' :
        result.color === 'warning' ? 'bg-amber-50 border-amber-200' :
        'bg-red-50 border-red-200'
      }`}>
        <div className="flex items-center gap-2 mb-1">
          <Badge variant={result.color === 'accent' ? 'accent' : result.color === 'warning' ? 'warning' : 'danger'}>
            {resultType}
          </Badge>
          <span className="text-sm font-bold text-slate-800">Overall: {Math.round(overallScore)}/100</span>
        </div>
        <p className="text-sm text-slate-700">{result.description}</p>
      </div>

      {/* Score Gauges */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 justify-items-center">
        <ScoreGauge score={ideaClarity} label="Idea Clarity" size={100} />
        <ScoreGauge score={marketRisk} label="Market Risk" size={100} />
        <ScoreGauge score={mvpFeasibility} label="MVP Feasibility" size={100} />
        <ScoreGauge score={monetizationFit} label="Monetization" size={100} />
        <ScoreGauge score={developmentComplexity} label="Complexity" size={100} />
      </div>

      {/* Result Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ResultCard
          title="Idea Clarity"
          score={ideaClarity}
          description="How well-defined and clear your app idea is."
          icon="💡"
        />
        <ResultCard
          title="Market Risk"
          score={marketRisk}
          description="Level of market competition and demand uncertainty."
          icon="📊"
        />
        <ResultCard
          title="MVP Feasibility"
          score={mvpFeasibility}
          description="How feasible it is to build an MVP with available resources."
          icon="🚀"
        />
        <ResultCard
          title="Monetization Fit"
          score={monetizationFit}
          description="How well your monetization model fits the market."
          icon="💰"
        />
      </div>

      {/* Recommended MVP */}
      {recommendedMVP && recommendedMVP.length > 0 && (
        <Card>
          <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <span>🎯</span> Recommended MVP Features
          </h3>
          <div className="flex flex-wrap gap-2">
            {recommendedMVP.map((feature, i) => (
              <Badge key={i} variant="primary" size="md">{feature}</Badge>
            ))}
          </div>
        </Card>
      )}

      {/* Features to Avoid */}
      {featuresToAvoid && featuresToAvoid.length > 0 && (
        <Card>
          <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
            <span>⚠️</span> Features to Delay
          </h3>
          <div className="flex flex-wrap gap-2">
            {featuresToAvoid.map((feature, i) => (
              <Badge key={i} variant="warning" size="md">{feature}</Badge>
            ))}
          </div>
        </Card>
      )}

      {/* Email CTA */}
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <div className="text-center space-y-3">
          <h3 className="font-bold text-slate-900 text-lg">Get Your Full Report</h3>
          <p className="text-sm text-slate-600">
            Enter your email to receive a detailed PDF report with actionable recommendations.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 px-4 py-2.5 rounded-lg border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all duration-200"
            />
            <Button
              variant="primary"
              onClick={onSubmitEmail}
              loading={submitting}
              disabled={!email}
            >
              Get Report
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}

/* ─── Main Page Component ─── */

export default function ValidationToolPage() {
  const { state, dispatch } = useValidation();
  const { currentStep, formData, scores } = state;
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState('');
  const [emailSubmitted, setEmailSubmitted] = useState(false);

  function updateData(payload) {
    dispatch({ type: 'UPDATE_DATA', payload });
  }

  function handleNext() {
    dispatch({ type: 'NEXT_STEP' });
  }

  function handlePrev() {
    dispatch({ type: 'PREV_STEP' });
  }

  function handleStepClick(step) {
    dispatch({ type: 'GO_TO_STEP', payload: step });
  }

  async function handleSubmit() {
    setSubmitting(true);
    try {
      const res = await fetch('/api/validation/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success) {
        dispatch({
          type: 'SET_SCORES',
          payload: {
            scores: data.data,
            validationId: data.data.id,
          },
        });
        dispatch({ type: 'GO_TO_STEP', payload: 8 });
      }
    } catch (err) {
      console.error('Validation submit error:', err);
    } finally {
      setSubmitting(false);
    }
  }

  async function handleSubmitEmail() {
    if (!email) return;
    setSubmitting(true);
    try {
      await fetch('/api/lead/capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          validationId: state.validationId,
          ideaName: formData.ideaName,
        }),
      });
      setEmailSubmitted(true);
    } catch (err) {
      console.error('Lead capture error:', err);
    } finally {
      setSubmitting(false);
    }
  }

  const renderStep = () => {
    switch (currentStep) {
      case 1: return <Step1BasicIdea formData={formData} updateData={updateData} />;
      case 2: return <Step2TargetAudience formData={formData} updateData={updateData} />;
      case 3: return <Step3ProblemValidation formData={formData} updateData={updateData} />;
      case 4: return <Step4CompetitorAnalysis formData={formData} updateData={updateData} />;
      case 5: return <Step5Monetization formData={formData} updateData={updateData} />;
      case 6: return <Step6LaunchLocation formData={formData} updateData={updateData} />;
      case 7: return <Step7MVPFeatures formData={formData} updateData={updateData} />;
      case 8: return (
        <Step8Results
          formData={formData}
          scores={scores}
          onSubmitEmail={handleSubmitEmail}
          email={email}
          setEmail={setEmail}
          submitting={submitting}
        />
      );
      default: return null;
    }
  };

  return (
    <main className="min-h-screen bg-slate-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Step Indicator */}
        <Card className="mb-6" padding="md">
          <StepIndicator
            currentStep={currentStep}
            totalSteps={8}
            onStepClick={handleStepClick}
          />
        </Card>

        {/* Step Content */}
        <Card padding="lg">
          {renderStep()}

          {/* Navigation */}
          {currentStep < 8 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-200">
              <Button
                variant="outline"
                onClick={handlePrev}
                disabled={currentStep === 1}
              >
                ← Previous
              </Button>

              {currentStep < 7 ? (
                <Button variant="primary" onClick={handleNext}>
                  Next →
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleSubmit}
                  loading={submitting}
                >
                  Get My Results →
                </Button>
              )}
            </div>
          )}

          {/* Email submitted confirmation */}
          {emailSubmitted && (
            <div className="mt-6 p-4 rounded-lg bg-emerald-50 border border-emerald-200 text-center">
              <p className="text-sm font-medium text-emerald-700">
                ✅ Check your email! Your full report is on its way.
              </p>
            </div>
          )}
        </Card>
      </div>
    </main>
  );
}
