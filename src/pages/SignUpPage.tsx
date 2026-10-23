import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
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
  Check,
} from 'lucide-react';
import { useApp, useAuth } from '../context/AppContext'  ;
import { UserRole } from '../types';

export const SignUpPage: React.FC = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [role, setRole] = useState<UserRole>('client');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Password strength checks
  const hasMinLength = password.length >= 6;
  const hasMixedChar = /[A-Za-z]/.test(password) && /[0-9]/.test(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError('Please provide your full name.');
      return;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid work email address.');
      return;
    }

    if (role === 'client' && !companyName.trim()) {
      setError('Please enter your brand or company name.');
      return;
    }

    if (!hasMinLength) {
      setError('Password must be at least 6 characters long.');
      return;
    }

    if (!agreedToTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy to create an account.');
      return;
    }

    setIsSubmitting(true);
    try {
      await register({
        name: name.trim(),
        email: email.trim(),
        password,
        role,
        companyName: companyName.trim() || (role === 'agency' ? 'Cortouch Media Global' : `${name}'s Brand`),
      });

      navigate('/dashboard');
    } catch (err: any) {
      setError(err.message || 'Failed to create account. Please check your details and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
      <div className="max-w-xl w-full space-y-8">
        
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
            Create Your Cortouch Portal Account
          </h2>
          <p className="text-sm text-slate-600 max-w-md mx-auto">
            Join modern brands scaling omnichannel growth, collaborating on viral content batches, and tracking real-time ROI.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white py-8 px-6 shadow-sm border border-slate-200 rounded-2xl sm:px-8">
          
          <form className="space-y-6" onSubmit={handleSubmit}>
            
            {/* Error Message */}
            {error && (
              <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-start space-x-2.5">
                <AlertCircle className="w-4 h-4 text-red-500 shrink-0 mt-0.5" />
                <span className="font-medium leading-relaxed">{error}</span>
              </div>
            )}

            {/* Account Type Selection */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-2">
                I am signing up as:
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole('client')}
                  className={`p-3.5 rounded-xl border text-left transition-all flex flex-col space-y-1.5 ${
                    role === 'client'
                      ? 'border-pink-500 bg-pink-50/40 ring-2 ring-pink-500/20'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                      <Building className={`w-3.5 h-3.5 ${role === 'client' ? 'text-pink-600' : 'text-slate-400'}`} />
                      Brand / Client
                    </span>
                    {role === 'client' && <CheckCircle2 className="w-4 h-4 text-pink-600" />}
                  </div>
                  <span className="text-[11px] text-slate-500 leading-tight">
                    For founders & marketing teams approving content and tracking metrics.
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole('agency')}
                  className={`p-3.5 rounded-xl border text-left transition-all flex flex-col space-y-1.5 ${
                    role === 'agency'
                      ? 'border-indigo-500 bg-indigo-50/40 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                      <ShieldCheck className={`w-3.5 h-3.5 ${role === 'agency' ? 'text-indigo-600' : 'text-slate-400'}`} />
                      Cortouch Agency
                    </span>
                    {role === 'agency' && <CheckCircle2 className="w-4 h-4 text-indigo-600" />}
                  </div>
                  <span className="text-[11px] text-slate-500 leading-tight">
                    For creative directors, video editors, and social strategists.
                  </span>
                </button>
              </div>
            </div>

            {/* Inputs Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              
              {/* Full Name */}
              <div>
                <label htmlFor="name" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  Full Name
                </label>
                <div className="relative rounded-xl shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <User className="w-4 h-4" />
                  </div>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Maya Lin"
                    className="block w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Company / Brand Name */}
              <div>
                <label htmlFor="companyName" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                  {role === 'client' ? 'Brand / Company Name' : 'Agency Division'}
                </label>
                <div className="relative rounded-xl shadow-xs">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                    <Building className="w-4 h-4" />
                  </div>
                  <input
                    id="companyName"
                    name="companyName"
                    type="text"
                    required={role === 'client'}
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder={role === 'client' ? 'e.g. Lumina Studios' : 'e.g. Growth Strategy Team'}
                    className="block w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>

            </div>

            {/* Email Address */}
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
                  placeholder="maya@company.com"
                  className="block w-full pl-10 pr-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 focus:bg-white transition-all text-slate-900 placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label htmlFor="password" className="block text-xs font-semibold uppercase tracking-wider text-slate-700 mb-1.5">
                Create Password
              </label>
              <div className="relative rounded-xl shadow-xs">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
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

              {/* Password hints */}
              <div className="mt-2 flex items-center space-x-4 text-[11px] text-slate-500">
                <span className={`flex items-center space-x-1 ${hasMinLength ? 'text-emerald-600 font-medium' : ''}`}>
                  <Check className={`w-3.5 h-3.5 ${hasMinLength ? 'text-emerald-500' : 'text-slate-300'}`} />
                  <span>At least 6 characters</span>
                </span>
                <span className={`flex items-center space-x-1 ${hasMixedChar ? 'text-emerald-600 font-medium' : ''}`}>
                  <Check className={`w-3.5 h-3.5 ${hasMixedChar ? 'text-emerald-500' : 'text-slate-300'}`} />
                  <span>Letters and numbers</span>
                </span>
              </div>
            </div>

            {/* Terms checkbox */}
            <div className="flex items-start">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                checked={agreedToTerms}
                onChange={(e) => setAgreedToTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500"
              />
              <label htmlFor="terms" className="ml-2 text-xs text-slate-600 leading-normal">
                I agree to the Cortouch Media Terms of Service, Confidentiality Non-Disclosure Agreement, and Client Data Privacy Policy.
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full flex justify-center items-center space-x-2 py-3 px-4 border border-transparent rounded-xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 hover:opacity-95 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md shadow-indigo-600/20 transition-all hover:scale-[1.01] active:scale-[0.99] disabled:opacity-60"
            >
              {isSubmitting ? (
                <span>Setting up your portal...</span>
              ) : (
                <>
                  <span>Create Account & Enter Portal</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Footer note */}
          <div className="mt-6 pt-5 border-t border-slate-200 text-center">
            <p className="text-xs text-slate-600">
              Already have an account?{' '}
              <Link to="/login" className="font-bold text-indigo-600 hover:text-indigo-500 hover:underline">
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* Benefits bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
          <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs">
            <span className="text-xs font-bold text-slate-800 block">Instant Setup</span>
            <span className="text-[11px] text-slate-500">Live portal access in seconds</span>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs">
            <span className="text-xs font-bold text-slate-800 block">Brand Isolation</span>
            <span className="text-[11px] text-slate-500">Private media vault & assets</span>
          </div>
          <div className="p-3 bg-white border border-slate-200 rounded-xl shadow-xs">
            <span className="text-xs font-bold text-slate-800 block">48h Approvals</span>
            <span className="text-[11px] text-slate-500">Guaranteed review pacing</span>
          </div>
        </div>

      </div>
    </div>
  );
};
