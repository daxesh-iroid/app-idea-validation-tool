'use client';

import React, { useEffect, useState } from 'react';
import Card from '../../../components/ui/Card';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { useForm } from 'react-hook-form';
import { getWeights, updateWeights, getTemplates, updateTemplate } from '../../../services/adminService';

const weightFields = [
  { key: 'ideaClarity', label: 'Idea Clarity' },
  { key: 'marketRisk', label: 'Market Risk' },
  { key: 'mvpFeasibility', label: 'MVP Feasibility' },
  { key: 'monetizationFit', label: 'Monetization Fit' },
  { key: 'developmentComplexity', label: 'Development Complexity' },
];

export default function SettingsPage() {
  const [weights, setWeights] = useState({});
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [savingWeights, setSavingWeights] = useState(false);
  const [savingTemplate, setSavingTemplate] = useState(false);
  const [activeTemplate, setActiveTemplate] = useState(null);
  const [message, setMessage] = useState('');

  const {
    register: registerTemplate,
    handleSubmit: handleTemplateSubmit,
    reset: resetTemplate,
    formState: { errors: templateErrors },
  } = useForm();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [weightsRes, templatesRes] = await Promise.all([
          getWeights(),
          getTemplates(),
        ]);
        setWeights(weightsRes?.data || weightsRes || {});
        const tmplData = templatesRes?.data || templatesRes || [];
        setTemplates(tmplData);
        if (tmplData.length > 0) {
          setActiveTemplate(tmplData[0]);
          resetTemplate({
            subject: tmplData[0].subject || '',
            body: tmplData[0].body || '',
          });
        }
      } catch (err) {
        setMessage('Failed to load settings');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [resetTemplate]);

  const handleWeightChange = (key, value) => {
    setWeights((prev) => ({ ...prev, [key]: parseFloat(value) || 0 }));
  };

  const handleSaveWeights = async () => {
    setSavingWeights(true);
    try {
      await updateWeights('scoring', weights);
      setMessage('Score weights updated successfully');
    } catch (err) {
      setMessage('Failed to update weights');
    } finally {
      setSavingWeights(false);
    }
  };

  const onTemplateSubmit = async (data) => {
    if (!activeTemplate) return;
    setSavingTemplate(true);
    try {
      await updateTemplate(activeTemplate.id, data);
      setMessage('Email template updated successfully');
      const updated = templates.map((t) =>
        t.id === activeTemplate.id ? { ...t, ...data } : t
      );
      setTemplates(updated);
    } catch (err) {
      setMessage('Failed to update template');
    } finally {
      setSavingTemplate(false);
    }
  };

  const selectTemplate = (tmpl) => {
    setActiveTemplate(tmpl);
    resetTemplate({ subject: tmpl.subject || '', body: tmpl.body || '' });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>
        <p className="text-slate-600 mt-1">Configure score weights and email templates</p>
      </div>

      {message && (
        <div
          className={`px-4 py-3 rounded-lg text-sm ${
            message.includes('Failed')
              ? 'bg-danger/10 border border-danger/20 text-danger'
              : 'bg-accent/10 border border-accent/20 text-accent'
          }`}
        >
          {message}
          <button
            onClick={() => setMessage('')}
            className="float-right font-bold hover:opacity-70"
          >
            ×
          </button>
        </div>
      )}

      {/* Score Weights */}
      <Card>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Score Weights</h2>
        <p className="text-sm text-slate-500 mb-5">
          Adjust the weight of each scoring dimension. Weights should total 1.0.
        </p>
        <div className="space-y-4">
          {weightFields.map((field) => (
            <div key={field.key} className="flex items-center gap-4">
              <label className="text-sm font-medium text-slate-700 w-48 shrink-0">
                {field.label}
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                max="1"
                value={weights[field.key] ?? 0.2}
                onChange={(e) => handleWeightChange(field.key, e.target.value)}
                className="w-28 px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <div className="flex-1 bg-slate-100 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(weights[field.key] ?? 0.2) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-5 pt-4 border-t border-slate-200 flex items-center justify-between">
          <p className="text-sm text-slate-500">
            Total:{' '}
            <span className="font-medium text-slate-700">
              {Object.values(weights).reduce((sum, v) => sum + (v || 0), 0).toFixed(2)}
            </span>
          </p>
          <Button onClick={handleSaveWeights} loading={savingWeights}>
            {savingWeights ? 'Saving...' : 'Save Weights'}
          </Button>
        </div>
      </Card>

      {/* Email Templates */}
      <Card>
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Email Templates</h2>

        {templates.length > 1 && (
          <div className="flex gap-2 mb-5">
            {templates.map((tmpl) => (
              <button
                key={tmpl.id}
                onClick={() => selectTemplate(tmpl)}
                className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                  activeTemplate?.id === tmpl.id
                    ? 'bg-primary text-white border-primary'
                    : 'bg-white text-slate-700 border-slate-300 hover:border-primary'
                }`}
              >
                {tmpl.name || tmpl.type || 'Template'}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleTemplateSubmit(onTemplateSubmit)} className="space-y-4">
          <Input
            label="Subject"
            name="subject"
            placeholder="Email subject line"
            register={registerTemplate}
            validation={{ required: 'Subject is required' }}
            error={templateErrors.subject?.message}
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-slate-700">
              Body <span className="text-danger">*</span>
            </label>
            <textarea
              {...registerTemplate('body', { required: 'Body is required' })}
              rows={10}
              placeholder="Email body content..."
              className={`w-full px-4 py-2.5 rounded-lg border bg-white text-slate-900 placeholder:text-slate-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-none font-mono text-sm ${
                templateErrors.body
                  ? 'border-danger focus:ring-danger focus:border-danger'
                  : 'border-slate-300 hover:border-slate-400'
              }`}
            />
            {templateErrors.body && (
              <span className="text-sm text-danger">{templateErrors.body.message}</span>
            )}
          </div>

          <p className="text-xs text-slate-500">
            Available variables: {'{'}fullName{'}'}, {'{'}ideaName{'}'}, {'{'}overallScore{'}'}, {'{'}reportUrl{'}'}
          </p>

          <div className="pt-2">
            <Button type="submit" loading={savingTemplate}>
              {savingTemplate ? 'Saving...' : 'Save Template'}
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
