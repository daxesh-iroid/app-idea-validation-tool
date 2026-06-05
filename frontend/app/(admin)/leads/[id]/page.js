'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Card from '../../../../components/ui/Card';
import Badge from '../../../../components/ui/Badge';
import Button from '../../../../components/ui/Button';
import { getLead, updateLead } from '../../../../services/adminService';

const statusOptions = [
  { value: 'new', label: 'New' },
  { value: 'contacted', label: 'Contacted' },
  { value: 'qualified', label: 'Qualified' },
  { value: 'converted', label: 'Converted' },
  { value: 'lost', label: 'Lost' },
];

const readinessLabels = {
  just_exploring: 'Just Exploring',
  validating_idea: 'Validating Idea',
  looking_for_mvp: 'Looking for MVP',
  need_estimate: 'Need Estimate',
  ready_to_start: 'Ready to Start',
  looking_for_partner: 'Looking for Partner',
};

const budgetLabels = {
  under_5k: 'Under $5,000',
  '5k_10k': '$5,000 – $10,000',
  '10k_25k': '$10,000 – $25,000',
  '25k_50k': '$25,000 – $50,000',
  '50k_100k': '$50,000 – $100,000',
  over_100k: 'Over $100,000',
  not_sure: 'Not sure yet',
};

const timelineLabels = {
  immediately: 'Immediately',
  '1_3_months': '1–3 months',
  '3_6_months': '3–6 months',
  '6_12_months': '6–12 months',
  just_exploring: 'Just exploring',
};

export default function LeadDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [lead, setLead] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const [salesNotes, setSalesNotes] = useState('');
  const [leadStatus, setLeadStatus] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');

  useEffect(() => {
    const fetchLead = async () => {
      try {
        const result = await getLead(id);
        const data = result?.data || result;
        setLead(data);
        setSalesNotes(data.salesNotes || '');
        setLeadStatus(data.status || 'new');
        setFollowUpDate(data.followUpDate ? data.followUpDate.split('T')[0] : '');
      } catch (err) {
        setError('Failed to load lead details');
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchLead();
  }, [id]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await updateLead(id, {
        salesNotes,
        status: leadStatus,
        followUpDate: followUpDate || null,
      });
      const result = await getLead(id);
      setLead(result?.data || result);
    } catch (err) {
      setError('Failed to save changes');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !lead) {
    return (
      <div className="bg-danger/10 border border-danger/20 text-danger px-4 py-3 rounded-lg">
        {error || 'Lead not found'}
      </div>
    );
  }

  const scoreVariant =
    lead.leadScore === 'Hot' ? 'danger' : lead.leadScore === 'Warm' ? 'warning' : 'secondary';

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={() => router.back()}
            className="text-sm text-slate-500 hover:text-slate-700 mb-1 flex items-center gap-1 transition-colors"
          >
            ← Back to Leads
          </button>
          <h1 className="text-2xl font-bold text-slate-900">{lead.fullName}</h1>
          <p className="text-slate-600 mt-1">{lead.email}</p>
        </div>
        <Badge variant={scoreVariant} size="lg">
          {lead.leadScore || 'Cold'} Lead
        </Badge>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead Info */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Contact Information</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Full Name</p>
                <p className="text-slate-900 mt-1">{lead.fullName}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Email</p>
                <p className="text-slate-900 mt-1">{lead.email}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">WhatsApp</p>
                <p className="text-slate-900 mt-1">{lead.whatsapp || '—'}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Country</p>
                <p className="text-slate-900 mt-1">{lead.country || '—'}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Company</p>
                <p className="text-slate-900 mt-1">{lead.companyName || '—'}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Submitted</p>
                <p className="text-slate-900 mt-1">
                  {lead.createdAt ? new Date(lead.createdAt).toLocaleString() : '—'}
                </p>
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Idea Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Idea Name</p>
                <p className="text-slate-900 mt-1">{lead.ideaName || '—'}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Readiness</p>
                <p className="text-slate-900 mt-1">
                  {readinessLabels[lead.readiness] || lead.readiness || '—'}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Budget</p>
                <p className="text-slate-900 mt-1">
                  {budgetLabels[lead.expectedBudget] || lead.expectedBudget || '—'}
                </p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">Timeline</p>
                <p className="text-slate-900 mt-1">
                  {timelineLabels[lead.expectedTimeline] || lead.expectedTimeline || '—'}
                </p>
              </div>
            </div>
          </Card>

          {/* Validation Scores */}
          {lead.validationScores && (
            <Card>
              <h2 className="text-lg font-semibold text-slate-900 mb-4">Validation Scores</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Object.entries(lead.validationScores).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-slate-100 rounded-full h-2">
                        <div
                          className="bg-primary h-2 rounded-full"
                          style={{ width: `${value}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-slate-900 w-8 text-right">
                        {value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Sidebar Actions */}
        <div className="space-y-6">
          <Card>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Lead Status</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1.5">
                  Status
                </label>
                <select
                  value={leadStatus}
                  onChange={(e) => setLeadStatus(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {statusOptions.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700 block mb-1.5">
                  Follow-up Date
                </label>
                <input
                  type="date"
                  value={followUpDate}
                  onChange={(e) => setFollowUpDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
          </Card>

          <Card>
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Sales Notes</h2>
            <textarea
              value={salesNotes}
              onChange={(e) => setSalesNotes(e.target.value)}
              rows={6}
              placeholder="Add notes about this lead..."
              className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            />
          </Card>

          <Button onClick={handleSave} className="w-full" loading={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>
    </div>
  );
}
