import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Building,
  User,
  AlertCircle,
  Sparkles,
  CheckCircle2,
  Zap,
} from 'lucide-react';
import { useAuth } from '../context/AppContext';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated, user } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Demo accounts for instant 1-click test fill
  const demoAccounts = [
    {
      role: 'agency' as const,
      name: 'Alexander Vance',
      email: 'agency@cortouchmedia.com',
      password: 'Password123!',
      badge: 'Agency Team',
      label: 'Cortouch Director',
      color: 'from-indigo-600 to-violet-600',
    },
    {
      role: 'client' as const,
      name: 'Elena Rostova',
      email: 'elena@luxeatelier.design',
      password: 'Password123!',
      badge: 'Client Brand',
      label: 'Luxe Atelier Studios',
      color: 'from-pink-600 to-rose-600',
    },
    {
      role: 'client' as const,
      name: 'Marcus Vance',
      email: 'marcus@apexsyst.io',
      password: 'Password123!',
      badge: 'Client Brand',
      label: 'Apex AI Systems',
      color: 'from-blue-600 to-cyan-600',
    },
  ];

  const handleFillDemo = (acc: typeof demoAccounts[0]) => {
    setEmail(acc.email);
    setPassword(acc.password);
    setError(null);
  };

  const handleQuickLogin = async (acc: typeof demoAccounts[0]) => {
    setEmail(acc.email);
    setPassword(acc.password);
    setError(null);
    setIsSubmitting(true);
    try {
      await login({ email: acc.email, password: acc.password });
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to sign in. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError('Please provide both your email address and password.');
      return;
    }

    setIsSubmitting(true);
    try {
      await login({ email, password });
      const destination = (location.state as any)?.from || '/dashboard';
      navigate(destination);
    } catch (err: any) {
      setError(err.message || 'Invalid email or password. Please verify your credentials.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
      <div className="max-w-md w-full space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-pink-500 p-0.5 shadow-lg shadow-indigo-500/20 mb-2">
            <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center">
              <span className="font-extrabold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-amber-500">
                C
              </span>
            </div>
          </div>
          <h2 className="text-3xl font-extrabold tracking-tight text-slate-900">
            Welcome to Cortouch Media
          </h2>
          <p className="text-sm text-slate-600 max-w-sm mx-auto">
            Sign in to access your omnichannel social management portal, content approval queue, and performance reports.
          </p>
        </div>

        {/* Quick Demo Login Preset Cards */}
        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              Quick 1-Click Demo Accounts
            </span>
            <span className="text-[11px] text-slate-400">Click to sign in instantly</span>
          </div>

          <div className="grid grid-cols-1 gap-2">
            {demoAccounts.map((acc) => (
              <button
                key={acc.email}
                type="button"
                onClick={() => handleQuickLogin(acc)}
                disabled={isSubmitting}
                className="group flex items-center justify-between p-2.5 rounded-xl border border-slate-200 hover:border-indigo-400 hover:bg-slate-50/80 transition-all text-left"
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${acc.color} text-white flex items-center justify-center text-xs font-bold shadow-sm`}>
                    {acc.role === 'agency' ? <ShieldCheck className="w-4 h-4" /> : <Building className="w-4 h-4" />}
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-slate-900 group-hover:text-indigo-600 transition-colors flex items-center gap-1.5">
                      <span>{acc.name}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-medium ${
                        acc.role === 'agency' ? 'bg-indigo-100 text-indigo-700' : 'bg-pink-100 text-pink-700'
                      }`}>
                        {acc.badge}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 truncate max-w-[210px]">
                      {acc.label} • {acc.email}
                    </div>
                  </div>
                </div>
                <span className="text-xs font-medium text-indigo-600 group-hover:translate-x-0.5 transition-transform flex items-center">
                  Sign In →
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Sign In Form */}
        <div className="bg-white py-8 px-6 shadow-sm border border-slate-200 rounded-2xl sm:px-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            
            {/* Error banner */}
            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start space-x-2.5">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span className="font-medium leading-relaxed">{error}</span>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Work Email Address
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="block w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => alert('For testing, all demo passwords are "Password123!". If you created a custom account, please sign up or use your chosen password.')}
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-500 hover:underline"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="block w-full pl-10 pr-10 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500"
                />
                <span className="ml-2 text-xs text-slate-600 font-medium">Keep me signed in</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center space-x-2 py-3 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
            >
              {isSubmitting ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer inside card */}
          <div className="mt-6 pt-5 border-t border-slate-200 text-center">
            <p className="text-xs text-slate-600">
              Don't have a Cortouch portal account yet?{' '}
              <Link to="/signup" className="font-bold text-indigo-600 hover:text-indigo-500 hover:underline">
                Create an account
              </Link>
            </p>
          </div>
        </div>

        {/* Security badge note */}
        <div className="text-center flex items-center justify-center space-x-2 text-xs text-slate-400">
          <ShieldCheck className="w-4 h-4 text-emerald-500" />
          <span>Enterprise-grade encrypted authentication & data protection</span>
        </div>

      </div>
    </div>
  );
};
