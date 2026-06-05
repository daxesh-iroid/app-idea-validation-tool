'use client';

import React, { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import LeadTable from '../../../components/admin/LeadTable';
import { getLeads } from '../../../services/adminService';

export default function LeadsPage() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [filters, setFilters] = useState({
    score: '',
    status: '',
    readiness: '',
  });

  const limit = 15;

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    try {
      const result = await getLeads({ page, limit, ...filters });
      const data = result?.data || result;
      setLeads(data.leads || data.items || data || []);
      setTotalPages(data.totalPages || data.pages || 1);
    } catch (err) {
      setError('Failed to load leads');
    } finally {
      setLoading(false);
    }
  }, [page, filters]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(1);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Leads</h1>
          <p className="text-slate-600 mt-1">Manage and track all captured leads</p>
        </div>
      </div>

      <Card padding="none">
        {/* Filters */}
        <div className="p-4 border-b border-slate-200 flex flex-wrap gap-3">
          <select
            value={filters.score}
            onChange={(e) => handleFilterChange('score', e.target.value)}
            className="px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Scores</option>
            <option value="Hot">Hot</option>
            <option value="Warm">Warm</option>
            <option value="Cold">Cold</option>
          </select>

          <select
            value={filters.status}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            className="px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Statuses</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="converted">Converted</option>
            <option value="lost">Lost</option>
          </select>

          <select
            value={filters.readiness}
            onChange={(e) => handleFilterChange('readiness', e.target.value)}
            className="px-3 py-2 rounded-lg border border-slate-300 bg-white text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            <option value="">All Stages</option>
            <option value="just_exploring">Just Exploring</option>
            <option value="validating_idea">Validating Idea</option>
            <option value="looking_for_mvp">Looking for MVP</option>
            <option value="need_estimate">Need Estimate</option>
            <option value="ready_to_start">Ready to Start</option>
            <option value="looking_for_partner">Looking for Partner</option>
          </select>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : error ? (
          <div className="p-4 text-danger text-center">{error}</div>
        ) : (
          <LeadTable leads={leads} />
        )}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-slate-200 flex items-center justify-between">
            <p className="text-sm text-slate-600">
              Page {page} of {totalPages}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
                className="px-3 py-1.5 text-sm rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Previous
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
                className="px-3 py-1.5 text-sm rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}
