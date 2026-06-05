'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import SelectField from '../../components/forms/SelectField';
import Card from '../../components/ui/Card';
import { createLead } from '../../services/leadService';

const budgetOptions = [
  { value: 'under_5k', label: 'Under $5,000' },
  { value: '5k_10k', label: '$5,000 – $10,000' },
  { value: '10k_25k', label: '$10,000 – $25,000' },
  { value: '25k_50k', label: '$25,000 – $50,000' },
  { value: '50k_100k', label: '$50,000 – $100,000' },
  { value: 'over_100k', label: 'Over $100,000' },
  { value: 'not_sure', label: 'Not sure yet' },
];

const timelineOptions = [
  { value: 'immediately', label: 'Immediately' },
  { value: '1_3_months', label: '1–3 months' },
  { value: '3_6_months', label: '3–6 months' },
  { value: '6_12_months', label: '6–12 months' },
  { value: 'just_exploring', label: 'Just exploring' },
];

const readinessOptions = [
  { value: 'just_exploring', label: 'Just exploring' },
  { value: 'validating_idea', label: 'Validating my idea' },
  { value: 'looking_for_mvp', label: 'Looking for an MVP' },
  { value: 'need_estimate', label: 'Need a cost estimate' },
  { value: 'ready_to_start', label: 'Ready to start' },
  { value: 'looking_for_partner', label: 'Looking for a development partner' },
];

export default function LeadCapturePage() {
  const searchParams = useSearchParams();
  const [submitted, setSubmitted] = useState(false);
  const [pdfUrl, setPdfUrl] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const ideaNamePrefill = searchParams.get('ideaName') || '';

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      ideaName: ideaNamePrefill,
    },
  });

  useEffect(() => {
    if (ideaNamePrefill) {
      setValue('ideaName', ideaNamePrefill);
    }
  }, [ideaNamePrefill, setValue]);

  const onSubmit = async (data) => {
    setSubmitting(true);
    setError('');
    try {
      const result = await createLead(data);
      setSubmitted(true);
      if (result?.data?.pdfUrl) {
        setPdfUrl(result.data.pdfUrl);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="min-h-screen bg-slate-50 flex items-center justify-center px-4 py-12">
        <Card className="max-w-lg w-full text-center" padding="lg">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-3">Thank You!</h1>
          <p className="text-slate-600 mb-6">
            Your information has been submitted successfully. We&apos;ll be in touch soon with your full validation report.
          </p>
          {pdfUrl && (
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary hover:text-blue-700 font-medium transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Download Your PDF Report
            </a>
          )}
          <div className="mt-8">
            <Button variant="outline" onClick={() => (window.location.href = '/')}>
              Back to Home
            </Button>
          </div>
        </Card>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Get Your Full Report</h1>
          <p className="text-slate-600">
            Share your details and we&apos;ll send you a comprehensive validation report for your app idea.
          </p>
        </div>

        <Card padding="lg">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {error && (
              <div className="bg-danger/10 border border-danger/20 text-danger px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                label="Full Name"
                name="fullName"
                placeholder="John Doe"
                required
                register={register}
                validation={{ required: 'Full name is required' }}
                error={errors.fullName?.message}
              />

              <Input
                label="Email"
                name="email"
                type="email"
                placeholder="john@example.com"
                required
                register={register}
                validation={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                }}
                error={errors.email?.message}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                label="WhatsApp Number"
                name="whatsapp"
                placeholder="+1 (555) 000-0000"
                register={register}
                error={errors.whatsapp?.message}
              />

              <Input
                label="Country"
                name="country"
                placeholder="United States"
                register={register}
                error={errors.country?.message}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                label="Company Name"
                name="companyName"
                placeholder="Acme Inc."
                register={register}
                error={errors.companyName?.message}
              />

              <Input
                label="App Idea Name"
                name="ideaName"
                placeholder="My Awesome App"
                register={register}
                error={errors.ideaName?.message}
              />
            </div>

            <SelectField
              label="Expected Budget"
              name="expectedBudget"
              options={budgetOptions}
              placeholder="Select your budget range"
              register={register}
              error={errors.expectedBudget?.message}
            />

            <SelectField
              label="Expected Timeline"
              name="expectedTimeline"
              options={timelineOptions}
              placeholder="Select your timeline"
              register={register}
              error={errors.expectedTimeline?.message}
            />

            <SelectField
              label="Where are you in the process?"
              name="readiness"
              options={readinessOptions}
              placeholder="Select your current stage"
              register={register}
              error={errors.readiness?.message}
            />

            <div className="pt-2">
              <Button type="submit" size="lg" className="w-full" loading={submitting}>
                {submitting ? 'Submitting...' : 'Get My Full Report'}
              </Button>
            </div>

            <p className="text-xs text-slate-500 text-center">
              By submitting, you agree to receive your validation report via email.
              We respect your privacy and will never share your information.
            </p>
          </form>
        </Card>
      </div>
    </main>
  );
}
