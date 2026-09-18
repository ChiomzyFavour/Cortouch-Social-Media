import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  FileText, 
  Plus, 
  CheckCircle2, 
  Clock, 
  DollarSign, 
  Mail, 
  Globe, 
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  Send,
  Sparkles
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ServiceRequest, RequestStatus } from '../types';

export const RequestsListPage: React.FC = () => {
  const { serviceRequests, updateRequestStatus, userRole } = useApp();
  const [filter, setFilter] = useState<RequestStatus | 'all'>('all');

  const filteredRequests = serviceRequests.filter(r => {
    if (filter === 'all') return true;
    return r.status === filter;
  });

  const getStatusBadge = (status: RequestStatus) => {
    switch (status) {
      case 'pending':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
            Pending Intake Review
          </span>
        );
      case 'reviewed':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
            Reviewed by Creative Lead
          </span>
        );
      case 'proposal_sent':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-purple-50 text-purple-700 border border-purple-200">
            Formal Scope Sent
          </span>
        );
      case 'approved':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
            Approved & Retainer Signed
          </span>
        );
      case 'active':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-sky-50 text-sky-700 border border-sky-200">
            Active in Production
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Service Inquiries & Retainer Quotes
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              {serviceRequests.length} Total Requests
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Track custom scope requests, package estimates, and onboarding contract status.
          </p>
        </div>

        <div className="flex items-center space-x-2.5 self-stretch md:self-auto">
          <Link
            to="/request-service"
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Submit New Request</span>
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        {[
          { key: 'all', label: 'All Requests' },
          { key: 'pending', label: 'Pending' },
          { key: 'reviewed', label: 'Reviewed' },
          { key: 'proposal_sent', label: 'Proposal Sent' },
          { key: 'approved', label: 'Approved' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilter(tab.key as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              filter === tab.key
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 shadow-xs'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Requests Cards List */}
      <div className="space-y-4">
        {filteredRequests.map(req => (
          <div
            key={req.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4 hover:border-slate-300 transition-all shadow-sm"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-[10px] text-indigo-700 font-bold bg-indigo-50 px-2 py-0.5 rounded border border-indigo-100">
                    #{req.id}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">Logged on {req.createdAt}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">
                  {req.companyName}{' '}
                  <span className="text-xs font-normal text-slate-500">({req.clientName})</span>
                </h3>
              </div>

              <div className="flex items-center space-x-3 self-start sm:self-center">
                {getStatusBadge(req.status)}
                <div className="text-right">
                  <span className="text-[10px] text-slate-400 block">Estimated Quote</span>
                  <span className="font-mono font-bold text-emerald-600 text-sm">
                    ${req.estimatedQuoteMonthly.toLocaleString()}/mo
                  </span>
                </div>
              </div>
            </div>

            {/* Middle Details */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
              <div className="space-y-2">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Requested Services:
                </span>
                <div className="flex flex-wrap gap-1">
                  {req.services.map((s, idx) => (
                    <span
                      key={idx}
                      className="px-2.5 py-1 rounded-lg bg-slate-50 border border-slate-200 text-indigo-700 font-medium text-[11px]"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div className="pt-1 text-[11px] text-slate-500">
                  Target Channels:{' '}
                  <strong className="text-slate-800 uppercase">{req.platforms.join(', ')}</strong>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Contact & Preferences:
                </span>
                <div className="space-y-1 text-slate-600">
                  <div className="flex items-center space-x-1.5">
                    <Mail className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{req.email}</span>
                  </div>
                  {req.website && (
                    <div className="flex items-center space-x-1.5">
                      <Globe className="w-3.5 h-3.5 text-pink-600" />
                      <span className="truncate max-w-[200px]">{req.website}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-1.5 text-slate-500 text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-amber-500" />
                    <span>Target Kickoff: {req.preferredStartDate}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 bg-slate-50 p-3.5 rounded-2xl border border-slate-200">
                <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                  Strategic Goals & Notes:
                </span>
                <div className="flex flex-wrap gap-1 mb-1">
                  {req.goals.map((g, idx) => (
                    <span key={idx} className="text-[10px] px-2 py-0.5 rounded bg-white border border-slate-200 text-slate-700 font-medium">
                      {g}
                    </span>
                  ))}
                </div>
                {req.notes && (
                  <p className="text-[11px] text-slate-600 leading-relaxed italic line-clamp-2">
                    "{req.notes}"
                  </p>
                )}
              </div>
            </div>

            {/* Bottom Status Update Controls */}
            <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
              <span className="text-slate-500 text-[11px]">
                Budget Tier Stated: <strong className="text-slate-800">{req.monthlyBudget}</strong>
              </span>

              {/* Status updater for agency admins */}
              <div className="flex items-center space-x-2">
                <span className="text-[11px] text-slate-500">Update Pipeline Status:</span>
                <select
                  value={req.status}
                  onChange={e => updateRequestStatus(req.id, e.target.value as any)}
                  className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-[11px] font-semibold text-slate-700 focus:outline-none focus:border-indigo-600 shadow-xs"
                >
                  <option value="pending">Pending Intake</option>
                  <option value="reviewed">Reviewed by Lead</option>
                  <option value="proposal_sent">Proposal Sent</option>
                  <option value="approved">Approved & Signed</option>
                  <option value="active">Active in Production</option>
                </select>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
