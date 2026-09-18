import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Check, 
  Sparkles, 
  Flame, 
  Video, 
  TrendingUp, 
  Crown, 
  ArrowRight, 
  HelpCircle,
  Camera,
  Gift,
  ShoppingBag,
  ShieldCheck
} from 'lucide-react';
import { SERVICE_PACKAGES } from '../data/mockData';

export const ServicesPage: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly'>('monthly');

  const discountMultiplier = billingCycle === 'quarterly' ? 0.85 : 1.0;

  const addOns = [
    {
      title: 'Studio & On-Location Shoot Day',
      price: 1500,
      description: 'Dedicated 8-hour production crew with 4K cinema cameras, audio lighting, and hair/makeup coordination.',
      icon: Camera,
    },
    {
      title: 'Creator & Influencer Seeding Pack',
      price: 950,
      description: 'Identification, outreach, contract negotiation, and gifting tracking for 25 vetted micro-influencers.',
      icon: Gift,
    },
    {
      title: 'TikTok Shop & IG Checkout Setup',
      price: 1200,
      description: 'Full product sync, live shopping affiliate strategy, and merchant catalog optimization.',
      icon: ShoppingBag,
    },
    {
      title: 'Rapid Crisis Response & Brand PR',
      price: 800,
      description: '24/7 dedicated escalation lead and reactive communication templates for high-velocity campaigns.',
      icon: ShieldCheck,
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-16">
      
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-pink-600" />
          <span>Transparent Retainers & Custom Sprints</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight">
          Services engineered for undeniable social dominance.
        </h1>
        <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
          Every engagement includes full access to your Cortouch client dashboard: real-time analytics, 
          instant content approvals, and milestone project timelines.
        </p>

        {/* Billing Switch */}
        <div className="pt-4 flex items-center justify-center space-x-3 text-xs">
          <span className={`font-semibold ${billingCycle === 'monthly' ? 'text-slate-900' : 'text-slate-500'}`}>
            Monthly Billing
          </span>
          <button
            onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'quarterly' : 'monthly')}
            className="w-12 h-6 rounded-full bg-slate-200 p-1 border border-slate-300 relative transition-colors shadow-inner"
          >
            <div
              className={`w-4 h-4 rounded-full bg-indigo-600 transition-transform ${
                billingCycle === 'quarterly' ? 'translate-x-6 bg-pink-600' : 'translate-x-0'
              }`}
            />
          </button>
          <div className="flex items-center space-x-1.5">
            <span className={`font-semibold ${billingCycle === 'quarterly' ? 'text-slate-900' : 'text-slate-500'}`}>
              Quarterly Agreement
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-pink-50 text-pink-700 border border-pink-200">
              Save 15%
            </span>
          </div>
        </div>
      </div>

      {/* Packages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SERVICE_PACKAGES.map(pkg => {
          const finalPrice = Math.round(pkg.priceMonthly * discountMultiplier);

          return (
            <div
              key={pkg.id}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all relative ${
                pkg.featured
                  ? 'bg-white border-2 border-indigo-600 shadow-xl shadow-indigo-100 lg:scale-105 z-10'
                  : 'bg-white border border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              {pkg.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-pink-600 to-indigo-600 text-white shadow-md">
                  Most Requested Retainer
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
                    {pkg.category} tier
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 mt-0.5">{pkg.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 min-h-[36px] leading-relaxed">
                    {pkg.tagline}
                  </p>
                </div>

                <div className="pt-2 pb-4 border-b border-slate-100">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl font-extrabold text-slate-900">
                      ${finalPrice.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">/ month</span>
                  </div>
                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1">
                    <span className="text-pink-600 font-semibold">{pkg.turnaroundTime}</span>
                    <span>Best for: {pkg.bestFor.split('&')[0]}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-[11px] font-bold uppercase text-slate-400 tracking-wider">
                    Included Deliverables:
                  </span>
                  <ul className="space-y-2 text-xs text-slate-600">
                    {pkg.deliverables.map((item, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                        <span className="leading-tight">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100">
                <Link
                  to={`/request-service?package=${pkg.id}`}
                  className={`w-full inline-flex items-center justify-center space-x-2 py-3 rounded-xl text-xs font-bold transition-all ${
                    pkg.featured
                      ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-md'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  <span>Select {pkg.name}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add-On Capabilities */}
      <div className="space-y-6 pt-6">
        <div className="max-w-2xl">
          <span className="text-xs font-bold uppercase tracking-wider text-pink-600">
            A La Carte Add-Ons
          </span>
          <h2 className="text-2xl font-bold text-slate-900 mt-1">
            Bolt-on firepower when your campaign calls for it.
          </h2>
          <p className="text-xs text-slate-500">
            Add these to any base retainer or book them as standalone sprints through your service request form.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {addOns.map((addon, index) => {
            const Icon = addon.icon;
            return (
              <div
                key={index}
                className="bg-white rounded-2xl p-5 border border-slate-200 flex flex-col justify-between space-y-3 hover:border-slate-300 shadow-sm transition-colors"
              >
                <div className="space-y-2">
                  <div className="w-8 h-8 rounded-lg bg-indigo-50 border border-indigo-200 flex items-center justify-center text-indigo-600">
                    <Icon className="w-4 h-4" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">{addon.title}</h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {addon.description}
                  </p>
                </div>
                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-900">${addon.price.toLocaleString()}</span>
                  <Link
                    to={`/request-service?addon=${encodeURIComponent(addon.title)}`}
                    className="text-[11px] font-bold text-pink-600 hover:text-pink-700"
                  >
                    Add to Request →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="bg-white rounded-3xl p-8 border border-slate-200 text-center space-y-4 max-w-3xl mx-auto shadow-md">
        <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
          Need a completely bespoke multi-channel quote?
        </h3>
        <p className="text-xs sm:text-sm text-slate-600">
          Tell us about your target channels, monthly production volume, and goals. We generate custom estimates immediately.
        </p>
        <div className="pt-2">
          <Link
            to="/request-service"
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-pink-600 text-white text-xs font-bold shadow-lg shadow-indigo-600/20 hover:scale-[1.02] transition-transform"
          >
            <span>Launch Service Request Builder</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

    </div>
  );
};
