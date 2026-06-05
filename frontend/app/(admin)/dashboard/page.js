'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Card from '../../../components/ui/Card';
import Badge from '../../../components/ui/Badge';
import StatsCard from '../../../components/admin/StatsCard';
import { getDashboardStats } from '../../../services/adminService';

export default function DashboardPage() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const result = await getDashboardStats();
        setStats(result?.data || result);
      } catch (err) {
        setError('Failed to load dashboard stats');
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-danger/10 border border-danger/20 text-danger px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  const {
    totalLeads = 0,
    hotLeads = 0,
    warmLeads = 0,
    coldLeads = 0,
    recentLeads = [],
    leadsByCountry = [],
  } = stats || {};

  const maxCountryCount = Math.max(...leadsByCountry.map((c) => c.count), 1);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-slate-600 mt-1">Overview of your leads and activity</p>
        </div>
        <Link
          href="/leads"
          className="text-primary hover:text-blue-700 font-medium text-sm transition-colors"
        >
          View All Leads →
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard title="Total Leads" value={totalLeads} icon="users" color="primary" />
        <StatsCard title="Hot Leads" value={hotLeads} icon="flame" color="danger" />
        <StatsCard title="Warm Leads" value={warmLeads} icon="sun" color="warning" />
        <StatsCard title="Cold Leads" value={coldLeads} icon="snow" color="secondary" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads Table */}
        <Card className="lg:col-span-2" padding="none">
          <div className="p-5 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Recent Leads</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider">
                  <th className="px-5 py-3">Name</th>
                  <th className="px-5 py-3">Idea</th>
                  <th className="px-5 py-3">Score</th>
                  <th className="px-5 py-3">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentLeads.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="px-5 py-8 text-center text-slate-500">
                      No leads yet
                    </td>
                  </tr>
                ) : (
                  recentLeads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                      <td className="px-5 py-3">
                        <div className="font-medium text-slate-900">{lead.fullName}</div>
                        <div className="text-xs text-slate-500">{lead.email}</div>
                      </td>
                      <td className="px-5 py-3 text-sm text-slate-700">{lead.ideaName || '—'}</td>
                      <td className="px-5 py-3">
                        <Badge
                          variant={
                            lead.leadScore === 'Hot'
                              ? 'danger'
                              : lead.leadScore === 'Warm'
                              ? 'warning'
                              : 'secondary'
                          }
                          size="sm"
                        >
                          {lead.leadScore || 'Cold'}
                        </Badge>
                      </td>
                      <td className="px-5 py-3 text-sm text-slate-500">
                        {lead.createdAt
                          ? new Date(lead.createdAt).toLocaleDateString()
                          : '—'}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </Card>

        {/* Leads by Country Chart */}
        <Card padding="none">
          <div className="p-5 border-b border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900">Leads by Country</h2>
          </div>
          <div className="p-5 space-y-3">
            {leadsByCountry.length === 0 ? (
              <p className="text-sm text-slate-500 text-center py-4">No data available</p>
            ) : (
              leadsByCountry.map((item) => (
                <div key={item.country} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-slate-700 font-medium">{item.country}</span>
                    <span className="text-slate-500">{item.count}</span>
                  </div>
                  <div className="w-full bg-slate-100 rounded-full h-2.5">
                    <div
                      className="bg-primary h-2.5 rounded-full transition-all duration-500"
                      style={{ width: `${(item.count / maxCountryCount) * 100}%` }}
                    />
                  </div>
                </div>
              ))
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
