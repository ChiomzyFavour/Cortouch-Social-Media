import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { 
  Sparkles, 
  Check, 
  ArrowRight, 
  ArrowLeft, 
  Building, 
  Mail, 
  Globe, 
  Layers, 
  DollarSign, 
  Calendar, 
  CheckCircle2,
  Instagram,
  Linkedin,
  Youtube,
  Send,
  Video,
  Flame,
  Crown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SocialPlatform } from '../types';
import { SERVICE_PACKAGES } from '../data/mockData';

export const RequestServicePage: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { submitServiceRequest, setSelectedClientId } = useApp();

  const [step, setStep] = useState<number>(1);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [submittedRequestId, setSubmittedRequestId] = useState<string>('');

  // Form State
  const [clientName, setClientName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [website, setWebsite] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<SocialPlatform[]>(['instagram', 'tiktok']);
  const [selectedServices, setSelectedServices] = useState<string[]>(['Omnichannel Velocity']);
  const [monthlyBudget, setMonthlyBudget] = useState('₦3,000 - ₦5,000 / month');
  const [goals, setGoals] = useState<string[]>(['Viral Short-Form Reach', 'Brand Awareness']);
  const [targetAudience, setTargetAudience] = useState('');
  const [preferredStartDate, setPreferredStartDate] = useState('2026-09-15');
  const [notes, setNotes] = useState('');

  // Read URL params if coming from package selection
  useEffect(() => {
    const pkgParam = searchParams.get('package');
    const addonParam = searchParams.get('addon');

    if (pkgParam) {
      const match = SERVICE_PACKAGES.find(p => p.id === pkgParam);
      if (match) {
        setSelectedServices([match.name]);
      }
    }

    if (addonParam) {
      setSelectedServices(prev => Array.from(new Set([...prev, addonParam])));
    }
  }, [searchParams]);

  const platformOptions: { id: SocialPlatform; label: string; icon: string }[] = [
    { id: 'instagram', label: 'Instagram', icon: '📸' },
    { id: 'tiktok', label: 'TikTok', icon: '⚡' },
    { id: 'linkedin', label: 'LinkedIn', icon: '💼' },
    { id: 'youtube', label: 'YouTube Shorts', icon: '▶️' },
    { id: 'x', label: 'Twitter / X', icon: '𝕏' },
    { id: 'facebook', label: 'Facebook / Meta', icon: '👥' },
  ];

  const goalOptions = [
    'Viral Short-Form Reach',
    'Brand Awareness & Prestige',
    'E-Commerce Product Sales',
    'B2B Lead Generation',
    'Community Loyalty & Engagement',
    'Executive Keynote Authority',
  ];

  const togglePlatform = (id: SocialPlatform) => {
    if (selectedPlatforms.includes(id)) {
      if (selectedPlatforms.length > 1) {
        setSelectedPlatforms(selectedPlatforms.filter(p => p !== id));
      }
    } else {
      setSelectedPlatforms([...selectedPlatforms, id]);
    }
  };

  const toggleService = (name: string) => {
    if (selectedServices.includes(name)) {
      if (selectedServices.length > 1) {
        setSelectedServices(selectedServices.filter(s => s !== name));
      }
    } else {
      setSelectedServices([...selectedServices, name]);
    }
  };

  const toggleGoal = (goal: string) => {
    if (goals.includes(goal)) {
      setGoals(goals.filter(g => g !== goal));
    } else {
      setGoals([...goals, goal]);
    }
  };

  // Estimate monthly quote
  const calculatedEstimate = () => {
    let base = 0;
    selectedServices.forEach(s => {
      const pkg = SERVICE_PACKAGES.find(p => p.name === s);
      if (pkg) {
        base += pkg.priceMonthly;
      } else {
        base += 950; // default addon
      }
    });
    // platform multiplier
    if (selectedPlatforms.length > 3) base += (selectedPlatforms.length - 3) * 300;
    return base || 2500;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !companyName || !email) {
      alert('Please provide your name, company name, and contact email.');
      return;
    }

    const created = submitServiceRequest({
      clientName,
      companyName,
      email,
      phone,
      website,
      platforms: selectedPlatforms,
      services: selectedServices,
      monthlyBudget,
      goals,
      targetAudience: targetAudience || 'Modern discerning digital consumers',
      preferredStartDate,
      notes,
      estimatedQuoteMonthly: calculatedEstimate(),
    });

    setSubmittedRequestId(created.id);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-md">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-600">
            Request Transmitted Successfully
          </span>
          <h1 className="text-3xl font-extrabold text-slate-900">
            Welcome to Cortouch Media, {clientName}!
          </h1>
          <p className="text-sm text-slate-600 max-w-lg mx-auto leading-relaxed">
            Your service request <span className="font-mono text-indigo-600 font-bold">#{submittedRequestId}</span> has 
            been logged into our agency pipeline. Our Creative Director will review your brief within 24 hours.
          </p>
        </div>

        {/* Summary Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-md text-left space-y-3 max-w-md mx-auto text-xs">
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">Brand / Company:</span>
            <span className="font-bold text-slate-900">{companyName}</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">Selected Services:</span>
            <span className="font-bold text-indigo-600 truncate max-w-[200px]">
              {selectedServices.join(', ')}
            </span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-2">
            <span className="text-slate-500">Target Platforms:</span>
            <span className="font-bold text-slate-900 uppercase">{selectedPlatforms.join(', ')}</span>
          </div>
          <div className="flex justify-between pt-1 text-sm">
            <span className="text-slate-700 font-semibold">Estimated Monthly Quote:</span>
            <span className="font-extrabold text-emerald-600 font-mono">
              ₦{calculatedEstimate().toLocaleString()} / mo
            </span>
          </div>
        </div>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/dashboard/requests"
            className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-md transition-all"
          >
            <span>View All Service Requests in Dashboard</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            onClick={() => {
              setIsSubmitted(false);
              setStep(1);
            }}
            className="w-full sm:w-auto px-5 py-3 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-200 transition-all"
          >
            Submit Another Inquiry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10">
      
      {/* Title & Wizard Progress */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-pink-600" />
          <span>Interactive Service Onboarding</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
          Request Cortouch Media Services
        </h1>
        <p className="text-slate-600 text-xs sm:text-sm max-w-xl mx-auto">
          Configure your desired scope, select active social channels, and receive an instant estimate for your brand.
        </p>

        {/* Stepper indicators */}
        <div className="flex items-center justify-center space-x-2 sm:space-x-4 pt-4 text-xs font-semibold">
          {[
            { num: 1, label: 'Brand Profile' },
            { num: 2, label: 'Channels & Scope' },
            { num: 3, label: 'Budget & Review' },
          ].map(s => (
            <div key={s.num} className="flex items-center space-x-2">
              <button
                onClick={() => setStep(s.num)}
                className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ₦{
                  step === s.num
                    ? 'bg-indigo-600 text-white font-bold ring-2 ring-indigo-200'
                    : step > s.num
                    ? 'bg-emerald-600 text-white'
                    : 'bg-slate-100 text-slate-500 border border-slate-200'
                }`}
              >
                {step > s.num ? '✓' : s.num}
              </button>
              <span className={`hidden sm:inline ₦{step === s.num ? 'text-slate-900 font-bold' : 'text-slate-500'}`}>
                {s.label}
              </span>
              {s.num < 3 && <span className="text-slate-300 hidden sm:inline">———</span>}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 space-y-8 shadow-xl">
        
        {/* Step 1: Brand & Contact Info */}
        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">1. Brand & Contact Information</h3>
              <p className="text-xs text-slate-500">Tell us who you are and where we can review your existing digital presence.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Your Full Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kingsley Eze Trading Store"
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Company / Brand Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Kingsley Eze Trading Store"
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Business Email Address *</label>
                <input
                  type="email"
                  required
                  placeholder="kingsleyezetradingstore@gmail.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Phone / WhatsApp (Optional)</label>
                <input
                  type="tel"
                  placeholder="+234 906 358 7056"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700">Website or Primary Social URL</label>
                <input
                  type="text"
                  placeholder="https://instagram.com/yourbrand or https://yourbrand.com"
                  value={website}
                  onChange={e => setWebsite(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700">Target Audience Description</label>
                <textarea
                  rows={2}
                  placeholder="e.g. 24-40 year old conscious consumers looking for artisanal luxury garments..."
                  value={targetAudience}
                  onChange={e => setTargetAudience(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>
            </div>

            <div className="pt-4 flex justify-end">
              <button
                type="button"
                onClick={() => {
                  if (!clientName || !companyName || !email) {
                    alert('Please fill in your name, company, and email to proceed.');
                    return;
                  }
                  setStep(2);
                }}
                className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all"
              >
                <span>Continue to Channels & Scope</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Channels & Scope */}
        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">2. Platforms & Desired Services</h3>
              <p className="text-xs text-slate-500">Select where you want Cortouch Media to produce, curate, and scale content.</p>
            </div>

            {/* Target Platforms Selection */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700">Target Social Platforms (Select all that apply)</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {platformOptions.map(p => {
                  const isSelected = selectedPlatforms.includes(p.id);
                  return (
                    <button
                      type="button"
                      key={p.id}
                      onClick={() => togglePlatform(p.id)}
                      className={`p-3 rounded-xl border text-left flex items-center space-x-2.5 transition-all ₦{
                        isSelected
                          ? 'bg-indigo-50 border-indigo-500 text-indigo-900 shadow-xs'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <span className="text-base">{p.icon}</span>
                      <span className="text-xs font-bold">{p.label}</span>
                      {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 ml-auto" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Service Packages Selection */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold text-slate-700">Core Services Required</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SERVICE_PACKAGES.map(pkg => {
                  const isSelected = selectedServices.includes(pkg.name);
                  return (
                    <div
                      key={pkg.id}
                      onClick={() => toggleService(pkg.name)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all ₦{
                        isSelected
                          ? 'bg-indigo-50/80 border-indigo-500 text-indigo-950 shadow-sm'
                          : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900">{pkg.name}</span>
                        <span className="text-xs font-extrabold text-pink-600 font-mono">
                          ₦{pkg.priceMonthly.toLocaleString()}/mo
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-1">{pkg.tagline}</p>
                      <div className="mt-2 flex items-center justify-between text-[10px] text-slate-500">
                        <span>{pkg.turnaroundTime}</span>
                        {isSelected && <span className="text-indigo-600 font-bold">✓ Selected</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Primary Goals */}
            <div className="space-y-2 pt-2">
              <label className="text-xs font-semibold text-slate-700">Campaign Primary Goals</label>
              <div className="flex flex-wrap gap-2">
                {goalOptions.map(g => (
                  <button
                    type="button"
                    key={g}
                    onClick={() => toggleGoal(g)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ₦{
                      goals.includes(g)
                        ? 'bg-pink-50 border-pink-400 text-pink-700 font-semibold'
                        : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {goals.includes(g) ? '✓ ' : '+ '}
                    {g}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="inline-flex items-center space-x-1 text-xs text-slate-500 hover:text-slate-800"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                type="button"
                onClick={() => setStep(3)}
                className="inline-flex items-center space-x-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all"
              >
                <span>Continue to Budget & Review</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Budget, Timeline & Instant Quote */}
        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-slate-900">3. Budget, Timeline & Estimate</h3>
              <p className="text-xs text-slate-500">Review your customized scope and submit your inquiry to our onboarding team.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Expected Monthly Budget</label>
                <select
                  value={monthlyBudget}
                  onChange={e => setMonthlyBudget(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                >
                  <option value="₦1,800 - ₦3,000 / month">₦1,800 - ₦3,000 / month</option>
                  <option value="₦3,000 - ₦5,000 / month">₦3,000 - ₦5,000 / month</option>
                  <option value="₦5,000 - ₦10,000 / month">₦5,000 - ₦10,000 / month</option>
                  <option value="₦10,000+ / month (Enterprise)">₦10,000+ / month (Enterprise & Multi-Region)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-700">Preferred Kickoff Date</label>
                <input
                  type="date"
                  value={preferredStartDate}
                  onChange={e => setPreferredStartDate(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              <div className="space-y-1.5 sm:col-span-2">
                <label className="text-xs font-semibold text-slate-700">Additional Project Notes / Specific Requests</label>
                <textarea
                  rows={3}
                  placeholder="Share details regarding current bottlenecks, upcoming launches, or creator references you admire..."
                  value={notes}
                  onChange={e => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 text-xs focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>
            </div>

            {/* Instant Estimate Box */}
            <div className="bg-gradient-to-br from-indigo-50 via-white to-pink-50 rounded-2xl p-6 border border-indigo-200 shadow-sm space-y-4">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-pink-600">
                    Calculated Service Quote
                  </span>
                  <div className="text-3xl font-extrabold text-slate-900 font-mono mt-0.5">
                    ₦{calculatedEstimate().toLocaleString()}
                    <span className="text-xs font-normal text-slate-500 ml-1 font-sans">/ month</span>
                  </div>
                </div>
                <div className="text-right text-[11px] text-slate-500">
                  <p>Includes complete access to:</p>
                  <p className="text-emerald-700 font-semibold">✓ Live Content Approvals & Timeline Dashboard</p>
                </div>
              </div>

              <div className="text-xs text-slate-700 pt-3 border-t border-slate-200 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-500">Services Included:</span>
                  <span className="font-semibold text-slate-900">{selectedServices.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Active Platforms:</span>
                  <span className="font-semibold text-indigo-600 uppercase">{selectedPlatforms.join(', ')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Kickoff Timeline:</span>
                  <span className="font-semibold text-slate-900">{preferredStartDate}</span>
                </div>
              </div>
            </div>

            <div className="pt-4 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(2)}
                className="inline-flex items-center space-x-1 text-xs text-slate-500 hover:text-slate-800"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>

              <button
                type="submit"
                className="inline-flex items-center space-x-2 px-8 py-3 rounded-xl bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 hover:opacity-95 text-white font-bold text-xs shadow-xl shadow-indigo-600/20 transition-all hover:scale-[1.02]"
              >
                <Send className="w-4 h-4" />
                <span>Submit Service Request & Open Portal</span>
              </button>
            </div>
          </div>
        )}

      </form>

    </div>
  );
};
