import React, { useState } from 'react';
import { Link, useLocation, Outlet } from 'react-router-dom';
import { 
  BarChart3, 
  CheckSquare, 
  Clock, 
  Layers, 
  FileText, 
  Plus, 
  ChevronDown, 
  Bell, 
  ShieldCheck, 
  User, 
  ExternalLink,
  Sparkles,
  ArrowLeft,
  Building2,
  Calendar
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DashboardLayout: React.FC = () => {
  const location = useLocation();
  const { 
    clients, 
    selectedClientId, 
    setSelectedClientId, 
    currentClient, 
    userRole, 
    setUserRole,
    pendingApprovalsCount 
  } = useApp();

  const [clientDropdownOpen, setClientDropdownOpen] = useState(false);

  const navItems = [
    {
      label: 'Overview',
      path: '/dashboard',
      icon: Layers,
      badge: null,
    },
    {
      label: 'Analytic Reports',
      path: '/dashboard/analytics',
      icon: BarChart3,
      badge: null,
    },
    {
      label: 'Content Approval',
      path: '/dashboard/approvals',
      icon: CheckSquare,
      badge: pendingApprovalsCount > 0 ? pendingApprovalsCount : null,
      badgeColor: 'bg-amber-500 text-slate-950',
    },
    {
      label: 'Project Timelines',
      path: '/dashboard/timeline',
      icon: Clock,
      badge: null,
    },
    {
      label: 'Service Requests',
      path: '/dashboard/requests',
      icon: FileText,
      badge: null,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
      {/* Sub-header Banner if Pending Approvals */}
      {pendingApprovalsCount > 0 && (
        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2">
          <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2 text-amber-900">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              <span className="font-bold">Action Required:</span>
              <span>
                You have {pendingApprovalsCount} content draft{pendingApprovalsCount > 1 ? 's' : ''} awaiting review & approval.
              </span>
            </div>
            <Link
              to="/dashboard/approvals"
              className="text-amber-800 hover:text-amber-950 font-bold underline flex items-center space-x-1"
            >
              <span>Review Now</span>
              <span>→</span>
            </Link>
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col lg:flex-row gap-6">
        
        {/* Left Sidebar */}
        <aside className="w-full lg:w-64 shrink-0 space-y-5">
          
          {/* Client Account Card / Switcher */}
          <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm relative">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="uppercase tracking-wider font-bold text-[10px]">Client Workspace</span>
              <span className="px-1.5 py-0.5 rounded bg-slate-100 text-[10px] font-semibold text-slate-700 border border-slate-200">
                {userRole === 'agency' ? 'Agency Admin' : 'Client Mode'}
              </span>
            </div>

            {/* Client selector trigger */}
            <div className="relative">
              <button
                onClick={() => setClientDropdownOpen(!clientDropdownOpen)}
                className="w-full flex items-center justify-between p-2 rounded-xl bg-slate-50 border border-slate-200 hover:border-slate-300 hover:bg-slate-100/70 transition-colors text-left"
              >
                <div className="flex items-center space-x-2.5 truncate">
                  <img
                    src={currentClient.avatar}
                    alt={currentClient.name}
                    className="w-7 h-7 rounded-full object-cover border border-slate-200"
                  />
                  <div className="truncate">
                    <p className="text-xs font-bold text-slate-900 truncate">{currentClient.name}</p>
                    <p className="text-[10px] text-slate-500 truncate">{currentClient.industry}</p>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 shrink-0 ml-1" />
              </button>

              {/* Dropdown Menu */}
              {clientDropdownOpen && (
                <div className="absolute top-full left-0 right-0 mt-1.5 bg-white border border-slate-200 rounded-xl shadow-xl z-30 p-1.5 space-y-1">
                  <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    Switch Client Brand
                  </div>
                  {clients.map(client => (
                    <button
                      key={client.id}
                      onClick={() => {
                        setSelectedClientId(client.id);
                        setClientDropdownOpen(false);
                      }}
                      className={`w-full flex items-center space-x-2 px-2 py-1.5 rounded-lg text-xs transition-colors ₦{
                        client.id === selectedClientId
                          ? 'bg-indigo-50 text-indigo-700 font-bold border border-indigo-200'
                          : 'text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <img
                        src={client.avatar}
                        alt={client.name}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="truncate">{client.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Current Plan Badge */}
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-500">Current Plan:</span>
              <span className="font-bold text-indigo-600 truncate max-w-[130px]" title={currentClient.activePlan}>
                {currentClient.activePlan.split('(')[0]}
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="bg-white rounded-2xl p-2 border border-slate-200 shadow-sm space-y-1">
            {navItems.map(item => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;

              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ₦{
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-md shadow-indigo-600/20'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    <Icon className={`w-4 h-4 ₦{isActive ? 'text-white' : 'text-slate-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-950 shadow-xs">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Service Request Quick Widget */}
          <div className="bg-gradient-to-br from-indigo-50 via-purple-50/60 to-pink-50/50 rounded-2xl p-4 border border-indigo-100 space-y-2.5 shadow-sm">
            <div className="flex items-center space-x-1.5 text-xs font-bold text-indigo-900">
              <Sparkles className="w-3.5 h-3.5 text-pink-600" />
              <span>Need Add-on Services?</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-relaxed">
              Request on-site shoot days, influencer seeding, or paid ad scale directly.
            </p>
            <Link
              to="/request-service"
              className="inline-flex w-full items-center justify-center space-x-1.5 px-3 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Request Service</span>
            </Link>
          </div>

          {/* Role Status Switcher for Testing / Demonstration */}
          <div className="p-3 rounded-xl bg-white border border-slate-200 text-center text-xs shadow-sm">
            <p className="text-[11px] text-slate-500 mb-2 font-medium">Simulate Dashboard View As:</p>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => setUserRole('client')}
                className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-all ₦{
                  userRole === 'client'
                    ? 'bg-pink-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Client Contact
              </button>
              <button
                onClick={() => setUserRole('agency')}
                className={`py-1.5 px-2 rounded-lg text-[11px] font-semibold transition-all ₦{
                  userRole === 'agency'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Cortouch Team
              </button>
            </div>
          </div>

        </aside>

        {/* Dashboard Main Workspace Area */}
        <main className="flex-1 min-w-0">
          <Outlet />
        </main>

      </div>
    </div>
  );
};
