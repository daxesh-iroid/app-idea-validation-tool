'use client';

import React from 'react';
import Link from 'next/link';
import Badge from '../ui/Badge';

const scoreVariant = (score) => {
  if (score === 'Hot') return 'danger';
  if (score === 'Warm') return 'warning';
  return 'secondary';
};

const statusVariant = (status) => {
  switch (status) {
    case 'new':
      return 'primary';
    case 'contacted':
      return 'secondary';
    case 'qualified':
      return 'accent';
    case 'converted':
      return 'success';
    case 'lost':
      return 'danger';
    default:
      return 'default';
  }
};

export default function LeadTable({ leads = [] }) {
  if (leads.length === 0) {
    return (
      <div className="p-8 text-center text-slate-500">
        No leads found
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-xs font-medium text-slate-500 uppercase tracking-wider border-b border-slate-200">
            <th className="px-5 py-3">Name</th>
            <th className="px-5 py-3">Email</th>
            <th className="px-5 py-3">Idea</th>
            <th className="px-5 py-3">Score</th>
            <th className="px-5 py-3">Status</th>
            <th className="px-5 py-3">Date</th>
            <th className="px-5 py-3">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {leads.map((lead) => (
            <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
              <td className="px-5 py-3">
                <div className="font-medium text-slate-900">{lead.fullName}</div>
                {lead.country && (
                  <div className="text-xs text-slate-500">{lead.country}</div>
                )}
              </td>
              <td className="px-5 py-3 text-sm text-slate-700">{lead.email}</td>
              <td className="px-5 py-3 text-sm text-slate-700 max-w-[150px] truncate">
                {lead.ideaName || '—'}
              </td>
              <td className="px-5 py-3">
                <Badge variant={scoreVariant(lead.leadScore)} size="sm">
                  {lead.leadScore || 'Cold'}
                </Badge>
              </td>
              <td className="px-5 py-3">
                <Badge variant={statusVariant(lead.status)} size="sm">
                  {lead.status || 'new'}
                </Badge>
              </td>
              <td className="px-5 py-3 text-sm text-slate-500">
                {lead.createdAt
                  ? new Date(lead.createdAt).toLocaleDateString()
                  : '—'}
              </td>
              <td className="px-5 py-3">
                <Link
                  href={`/leads/${lead.id}`}
                  className="text-primary hover:text-blue-700 text-sm font-medium transition-colors"
                >
                  View
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
