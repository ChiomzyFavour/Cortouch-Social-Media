import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
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
  X,
  LogIn,
  LogOut,
  ChevronDown,
  Building,
  Check,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Navbar: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    user,
    isAuthenticated,
    logout,
    userRole,
    setUserRole,
    pendingApprovalsCount,
    currentClient,
    selectedClientId,
    setSelectedClientId,
    clients,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isDashboard = location.pathname.startsWith('/dashboard');

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    await logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-slate-200 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2.5 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-pink-500 p-0.5 shadow-md shadow-indigo-500/15 group-hover:scale-105 transition-transform duration-200">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <span className="font-extrabold text-lg text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-amber-500">
                    C
                  </span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="font-bold text-lg tracking-tight text-slate-900 group-hover:text-indigo-600 transition-colors">
                  Cortouch<span className="text-pink-600 font-medium">.</span>Media
                </span>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-medium -mt-1">
                  Brand Studio & Portal
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
            <Link
              to="/"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                location.pathname === '/'
                  ? 'text-slate-900 bg-slate-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Agency
            </Link>
            <Link
              to="/services"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                location.pathname === '/services'
                  ? 'text-slate-900 bg-slate-100'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Services & Pricing
            </Link>
            <Link
              to="/request-service"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
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
              className={`relative px-3.5 py-2 rounded-lg text-sm font-semibold transition-all flex items-center space-x-1.5 ${
                isDashboard
                  ? 'bg-gradient-to-r from-indigo-600 to-pink-600 text-white shadow-md shadow-indigo-600/20'
                  : 'text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 shadow-sm'
              }`}
            >
              <Layers className={`w-4 h-4 ${isDashboard ? 'text-white' : 'text-pink-600'}`} />
              <span>Portal Dashboard</span>
              {pendingApprovalsCount > 0 && (
                <span className="ml-1.5 px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-amber-400 text-slate-900 shadow-sm">
                  {pendingApprovalsCount}
                </span>
              )}
            </Link>
          </nav>

          {/* Right Header Controls: Auth & User Menu */}
          <div className="hidden lg:flex items-center space-x-3">
            
            {/* If Authenticated: User Menu Dropdown */}
            {isAuthenticated && user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  type="button"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center space-x-2.5 p-1.5 pr-3 rounded-full border border-slate-200 bg-slate-50 hover:bg-slate-100/80 hover:border-slate-300 transition-all text-left"
                >
                  <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-pink-600 p-0.5 shadow-xs">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
                    ) : (
                      <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-xs font-bold text-indigo-700">
                        {user.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <span className="text-xs font-bold text-slate-900 leading-tight">
                      {user.name}
                    </span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      {user.role === 'agency' ? (
                        <span className="text-indigo-600 font-semibold">Cortouch Lead</span>
                      ) : (
                        <span className="text-pink-600 font-semibold truncate max-w-[90px]">{user.companyName || 'Client'}</span>
                      )}
                    </span>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-72 bg-white rounded-2xl border border-slate-200 shadow-xl py-2 z-50 divide-y divide-slate-100 animate-in fade-in zoom-in-95 duration-100">
                    
                    {/* User Info Header */}
                    <div className="px-4 py-3">
                      <div className="text-xs font-bold text-slate-900">{user.name}</div>
                      <div className="text-[11px] text-slate-500 truncate">{user.email}</div>
                      <div className="mt-2 flex items-center gap-1.5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          user.role === 'agency'
                            ? 'bg-indigo-100 text-indigo-700'
                            : 'bg-pink-100 text-pink-700'
                        }`}>
                          {user.role === 'agency' ? 'Agency Specialist' : 'Client Partner'}
                        </span>
                        {user.companyName && (
                          <span className="text-[10px] text-slate-400 truncate max-w-[140px]">
                            • {user.companyName}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Navigation Items */}
                    <div className="py-1">
                      <Link
                        to="/dashboard"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center justify-between px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
                      >
                        <span className="flex items-center gap-2">
                          <Layers className="w-3.5 h-3.5 text-indigo-500" />
                          Dashboard Overview
                        </span>
                      </Link>
                      <Link
                        to="/dashboard/approvals"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center justify-between px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-pink-600"
                      >
                        <span className="flex items-center gap-2">
                          <Sparkles className="w-3.5 h-3.5 text-pink-500" />
                          Content Approvals
                        </span>
                        {pendingApprovalsCount > 0 && (
                          <span className="px-1.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-400 text-slate-900">
                            {pendingApprovalsCount}
                          </span>
                        )}
                      </Link>
                      <Link
                        to="/dashboard/timeline"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
                      >
                        <Clock className="w-3.5 h-3.5 text-blue-500" />
                        Project Milestones
                      </Link>
                      <Link
                        to="/dashboard/analytics"
                        onClick={() => setUserDropdownOpen(false)}
                        className="flex items-center gap-2 px-4 py-2 text-xs text-slate-700 hover:bg-slate-50 hover:text-indigo-600"
                      >
                        <BarChart3 className="w-3.5 h-3.5 text-emerald-500" />
                        Performance Analytics
                      </Link>
                    </div>

                    {/* View mode toggle */}
                    <div className="p-3 bg-slate-50/70">
                      <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1.5 tracking-wider">
                        Portal View Perspective
                      </span>
                      <div className="grid grid-cols-2 gap-1.5 bg-white p-1 rounded-xl border border-slate-200">
                        <button
                          type="button"
                          onClick={() => {
                            setUserRole('agency');
                          }}
                          className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                            userRole === 'agency'
                              ? 'bg-indigo-600 text-white shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Agency
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setUserRole('client');
                          }}
                          className={`px-2 py-1 rounded-lg text-[11px] font-semibold transition-all ${
                            userRole === 'client'
                              ? 'bg-pink-600 text-white shadow-xs'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          Client
                        </button>
                      </div>
                    </div>

                    {/* Sign out */}
                    <div className="py-1">
                      <button
                        type="button"
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-4 py-2 text-xs text-red-600 hover:bg-red-50 hover:text-red-700 transition-colors font-medium text-left"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        Sign Out
                      </button>
                    </div>

                  </div>
                )}
              </div>
            ) : (
              /* If Logged Out: Log In & Sign Up buttons */
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 hover:text-indigo-600 hover:bg-slate-100 transition-colors flex items-center space-x-1.5"
                >
                  <LogIn className="w-3.5 h-3.5" />
                  <span>Log In</span>
                </Link>
                <Link
                  to="/signup"
                  className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 shadow-md shadow-indigo-500/20 transition-all hover:scale-[1.02]"
                >
                  <span>Sign Up</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            )}

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
        <div className="md:hidden bg-white border-b border-slate-200 px-4 pt-3 pb-6 space-y-4 shadow-lg animate-in slide-in-from-top-2 duration-150">
          
          {/* User profile card or login prompt */}
          {isAuthenticated && user ? (
            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between">
              <div className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-pink-600 p-0.5">
                  <div className="w-full h-full bg-white rounded-full flex items-center justify-center text-xs font-bold text-indigo-700">
                    {user.name.charAt(0)}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">{user.name}</div>
                  <div className="text-[11px] text-slate-500 truncate max-w-[170px]">{user.email}</div>
                </div>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="px-2.5 py-1 rounded-lg text-xs font-semibold text-red-600 bg-red-50 hover:bg-red-100 flex items-center gap-1"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Exit</span>
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 rounded-xl border border-slate-200">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold bg-white text-slate-800 shadow-xs hover:text-indigo-600"
              >
                <LogIn className="w-3.5 h-3.5 text-indigo-600" />
                <span>Log In</span>
              </Link>
              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-bold bg-gradient-to-r from-indigo-600 to-pink-600 text-white shadow-xs"
              >
                <span>Sign Up</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* Nav links */}
          <div className="flex flex-col space-y-1">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              Home Agency
            </Link>
            <Link
              to="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-slate-800 hover:bg-slate-100"
            >
              Services & Pricing
            </Link>
            <Link
              to="/request-service"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-indigo-600 hover:bg-indigo-50"
            >
              Request Services
            </Link>
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg text-sm font-semibold text-pink-600 hover:bg-pink-50 flex items-center justify-between"
            >
              <span>Portal Dashboard</span>
              {pendingApprovalsCount > 0 && (
                <span className="px-2 py-0.5 text-xs bg-amber-400 text-slate-900 rounded-full font-bold">
                  {pendingApprovalsCount} pending
                </span>
              )}
            </Link>
            <Link
              to="/dashboard/approvals"
              onClick={() => setMobileMenuOpen(false)}
              className="px-6 py-1.5 text-xs text-slate-600 hover:text-slate-900"
            >
              • Content Approval Hub
            </Link>
            <Link
              to="/dashboard/timeline"
              onClick={() => setMobileMenuOpen(false)}
              className="px-6 py-1.5 text-xs text-slate-600 hover:text-slate-900"
            >
              • Project Milelines
            </Link>
            <Link
              to="/dashboard/analytics"
              onClick={() => setMobileMenuOpen(false)}
              className="px-6 py-1.5 text-xs text-slate-600 hover:text-slate-900"
            >
              • Analytics Reports
            </Link>
          </div>

          <div className="pt-2 border-t border-slate-200">
            <span className="text-xs text-slate-500 mb-2 block font-medium">Switch View Mode:</span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setUserRole('agency')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold ${
                  userRole === 'agency' ? 'bg-indigo-600 text-white shadow-sm' : 'bg-slate-100 text-slate-700'
                }`}
              >
                Agency Team
              </button>
              <button
                onClick={() => setUserRole('client')}
                className={`px-3 py-2 rounded-lg text-xs font-semibold ${
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
