import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Sparkles, 
  Layers, 
  BarChart3, 
  CheckCircle2, 
  Clock, 
  PlusCircle,
  ShieldCheck,
  User,
  ArrowRight,
  Menu,
  X
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const { userRole, setUserRole, pendingApprovalsCount, currentClient } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const isDashboard = location.pathname.startsWith('/dashboard');

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-slate-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
         {/* Brand Logo */}
<div className="flex items-center">
  <Link to="/" className="flex items-center gap-3 group">
    
    {/* Gradient "C" Icon Box */}
   

    {/* Logo Image */}
    <img 
      src="/Images/Cortouch-Media-logo-new-12-removebg-preview.png" 
      alt="Cortouch Media Logo" 
      className="h-14 w-auto object-contain" 
    />
    
  </Link>
</div>
          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ₦{
                location.pathname === '/'
                  ? 'text-slate-900 bg-slate-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Agency
            </Link>
            <Link
              to="/services"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ₦{
                location.pathname === '/services'
                  ? 'text-slate-900 bg-slate-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Services & Pricing
            </Link>
            <Link
              to="/request-service"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ₦{
                location.pathname === '/request-service'
                  ? 'text-indigo-600 bg-indigo-50 border border-indigo-200'
                  : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50/50'
              }`}
            >
              Request Services
            </Link>
            
            {/* Dashboard link with live approval badge */}
            <Link
              to="/dashboard"
              className={`relative px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center space-x-1.5 ₦{
                isDashboard
                  ? 'bg-gradient-to-r from-indigo-600 to-pink-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-sm'
              }`}
            >
              <Layers className={`w-4 h-4 ₦{isDashboard ? 'text-white' : 'text-pink-600'}`} />
              <span>Client Dashboard</span>
              {pendingApprovalsCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-amber-400 text-slate-900 shadow-sm">
                  {pendingApprovalsCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Right Header Controls: Role Switcher & CTA */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Role switch toggle */}
            <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
              <button
                onClick={() => setUserRole('agency')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center space-x-1 ₦{
                  userRole === 'agency'
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="View as Cortouch Media Agency Team"
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>Cortouch Team</span>
              </button>
              <button
                onClick={() => setUserRole('client')}
                className={`px-2.5 py-1 rounded-lg font-medium transition-all flex items-center space-x-1 ₦{
                  userRole === 'client'
                    ? 'bg-pink-600 text-white shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
                title="View as Client Brand Contact"
              >
                <User className="w-3.5 h-3.5" />
                <span className="truncate max-w-[90px]">{currentClient.primaryContact.split(' ')[0]} (Client)</span>
              </button>
            </div>

            <Link
              to="/request-service"
              className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02]"
            >
              <span>Get Started</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Mobile menu trigger */}
          <div className="md:hidden flex items-center space-x-2">
            <Link
              to="/dashboard"
              className="px-2.5 py-1.5 rounded-lg text-xs font-medium bg-indigo-600 text-white flex items-center space-x-1 shadow-sm"
            >
              <span>Dashboard</span>
              {pendingApprovalsCount > 0 && (
                <span className="w-2 h-2 rounded-full bg-amber-300 inline-block"></span>
              )}
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-slate-600 hover:text-slate-900 bg-white border border-slate-200"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-2 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-100"
            >
              Home Agency
            </Link>
            <Link
              to="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-base font-semibold text-slate-800 hover:bg-slate-100"
            >
              Services & Pricing
            </Link>
            <Link
              to="/request-service"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-base font-semibold text-indigo-600 hover:bg-indigo-50"
            >
              Request Services
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-base font-semibold text-pink-600 hover:bg-pink-50 flex items-center justify-between"
            >
              <span>Client Dashboard</span>
              {pendingApprovalsCount > 0 && (
                <span className="px-2 py-0.5 text-xs bg-amber-400 text-slate-900 rounded-full font-bold">
                  {pendingApprovalsCount} pending
                </span>
              )}
            </Link>
            <Link
              to="/dashboard/analytics"
              onClick={() => setMobileMenuOpen(false)}
              className="px-6 py-1.5 text-sm text-slate-600 hover:text-slate-900"
            >
              • Analytics Reports
            </Link>
            <Link
              to="/dashboard/approvals"
              onClick={() => setMobileMenuOpen(false)}
              className="px-6 py-1.5 text-sm text-slate-600 hover:text-slate-900"
            >
              • Content Approval Hub
            </Link>
            <Link
              to="/dashboard/timeline"
              onClick={() => setMobileMenuOpen(false)}
              className="px-6 py-1.5 text-sm text-slate-600 hover:text-slate-900"
            >
              • Project Timelines
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-200">
            <span className="text-xs text-slate-500 mb-2 block font-medium">Switch View Mode:</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setUserRole('agency')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold {
                  userRole === 'agency' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700'
                }`}
              >
                Agency Team
              </button>
              <button
                onClick={() => setUserRole('client')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold ₦{
                  userRole === 'client' ? 'bg-pink-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700'
                }`}
              >
                Client View
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
