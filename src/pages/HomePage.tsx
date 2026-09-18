import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Sparkles, 
  ArrowRight, 
  Layers, 
  BarChart3, 
  CheckSquare, 
  Clock, 
  TrendingUp, 
  Video, 
  Flame, 
  ShieldCheck, 
  ChevronRight,
  Play,
  Award,
  Users,
  Check
} from 'lucide-react';
import { SERVICE_PACKAGES, CLIENT_PROFILES } from '../data/mockData';

export const HomePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'approvals' | 'analytics' | 'timelines'>('approvals');

  return (
    <div className="space-y-20 pb-20 overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-12 sm:pt-20 pb-12 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Glow ambient background circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[350px] bg-gradient-to-tr from-indigo-200/50 via-pink-200/50 to-purple-200/40 blur-[120px] rounded-full pointer-events-none -z-10" />

        <div className="text-center space-y-6 max-w-4xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-semibold shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-pink-600" />
            <span>Cortouch Media • Integrated Brand Studio</span>
            <span className="w-1 h-1 rounded-full bg-indigo-400"></span>
            <span className="text-slate-600 font-medium">Client Portal & Agency Hub</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-slate-900 leading-[1.1]">
            Social media management that{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 via-pink-600 to-amber-500">
              commands attention.
            </span>
          </h1>

          <p className="text-base sm:text-xl text-slate-600 max-w-2xl mx-auto font-normal leading-relaxed">
            From viral short-form production to multi-channel scaling, Cortouch Media unites strategy, 
            rapid content approvals, and real-time ROI tracking in one seamless dashboard.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/request-service"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-7 py-3.5 rounded-2xl text-sm font-bold text-white bg-gradient-to-r from-indigo-600 via-violet-600 to-pink-600 hover:opacity-95 shadow-xl shadow-indigo-600/20 transition-all hover:scale-[1.02]"
            >
              <span>Request Services & Instant Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link
              to="/dashboard"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-2xl text-sm font-semibold text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 hover:border-slate-400 shadow-sm transition-all"
            >
              <Layers className="w-4 h-4 text-pink-600" />
              <span>Launch Client Dashboard</span>
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto border-t border-slate-200">
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-slate-900">14.8M+</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Organic Reach Generated</div>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-pink-600">98.4%</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Approval Rate on 1st Cut</div>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600">4.8x</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Average Paid Social ROAS</div>
            </div>
            <div className="p-4 bg-white rounded-2xl border border-slate-200 shadow-sm">
              <div className="text-2xl sm:text-3xl font-extrabold text-amber-600">24hr</div>
              <div className="text-xs text-slate-500 font-medium mt-0.5">Revision Turnaround SLA</div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Dashboard Sneak Peek */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-xl space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-widest text-pink-600">
                Integrated Portal
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
                Zero messy emails. Everything in your Cortouch hub.
              </h2>
              <p className="text-slate-600 text-sm mt-1 max-w-xl">
                Collaborate directly with our video editors, approve drafts on your phone, and monitor multi-platform growth metrics.
              </p>
            </div>

            {/* Interactive Feature Tabs */}
            <div className="flex items-center space-x-2 bg-slate-100 p-1.5 rounded-xl border border-slate-200 self-start md:self-auto">
              <button
                onClick={() => setActiveTab('approvals')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  activeTab === 'approvals'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <CheckSquare className="w-3.5 h-3.5" />
                <span>Content Approval</span>
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  activeTab === 'analytics'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Analytics Report</span>
              </button>
              <button
                onClick={() => setActiveTab('timelines')}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center space-x-1.5 ${
                  activeTab === 'timelines'
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                <span>Project Timeline</span>
              </button>
            </div>
          </div>

          {/* Interactive Preview Container */}
          <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 sm:p-7">
            {activeTab === 'approvals' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                {/* Visual Mockup Card */}
                <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-lg md:col-span-2 flex flex-col sm:flex-row">
                  <div className="sm:w-1/2 relative bg-slate-100 flex items-center justify-center p-3">
                    <img
                      src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=700&q=80"
                      alt="Campaign Teaser"
                      className="rounded-xl object-cover w-full h-56 sm:h-64 shadow-xs"
                    />
                    <span className="absolute top-5 left-5 px-2.5 py-1 rounded-full text-[10px] font-bold bg-pink-600 text-white shadow-sm">
                      Instagram Reel Draft
                    </span>
                  </div>
                  <div className="p-5 sm:w-1/2 flex flex-col justify-between space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
                        <span>Scheduled: Friday 11:30 AM</span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          Pending Your Approval
                        </span>
                      </div>
                      <h4 className="font-bold text-slate-900 text-sm">Fall 2026 Heritage Silk Collection</h4>
                      <p className="text-xs text-slate-600 mt-2 line-clamp-3 leading-relaxed">
                        Pure silk, consciously woven. Introducing our Autumn Capsule where traditional Milanese handcraft meets zero-waste modern geometry...
                      </p>
                      <div className="text-[11px] text-indigo-600 mt-2 font-mono font-medium">
                        #LuxeAtelier #SustainableFashion
                      </div>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center gap-2">
                      <Link
                        to="/dashboard/approvals"
                        className="flex-1 text-center py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-sm transition-all"
                      >
                        ✓ One-Click Approve
                      </Link>
                      <Link
                        to="/dashboard/approvals"
                        className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold"
                      >
                        Request Revisions
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Benefits side */}
                <div className="space-y-3">
                  <h4 className="text-base font-bold text-slate-900">Never wonder what is posting next.</h4>
                  <ul className="space-y-2 text-xs text-slate-600">
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Review video cuts, captions & hashtags on mobile or desktop</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Leave time-stamped feedback directly on the creative</span>
                    </li>
                    <li className="flex items-start space-x-2">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <span>Automated sync into Sprout / Buffer upon client greenlight</span>
                    </li>
                  </ul>
                  <Link
                    to="/dashboard/approvals"
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 pt-2"
                  >
                    <span>Open Content Approval Board</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'analytics' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Real-Time Performance</span>
                      <h4 className="text-base font-bold text-slate-900">1,240,800 Total Impressions (+34.2%)</h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      Top 5% of Industry
                    </span>
                  </div>

                  {/* Simulated interactive mini chart */}
                  <div className="h-32 flex items-end justify-between gap-3 pt-4 px-2 border-b border-slate-100 pb-2">
                    {[
                      { week: 'Wk 1', h: '40%', val: '210k' },
                      { week: 'Wk 2', h: '55%', val: '265k' },
                      { week: 'Wk 3', h: '72%', val: '340k' },
                      { week: 'Wk 4', h: '88%', val: '410k' },
                      { week: 'Wk 5', h: '100%', val: '485k' },
                    ].map((bar, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-1">
                        <span className="text-[9px] text-indigo-600 font-mono font-semibold">{bar.val}</span>
                        <div 
                          className="w-full bg-gradient-to-t from-indigo-600 to-pink-500 rounded-t-md transition-all duration-500" 
                          style={{ height: bar.h }}
                        />
                        <span className="text-[10px] text-slate-500">{bar.week}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-2 text-center text-xs">
                    <div>
                      <p className="text-slate-500 text-[10px] font-medium">Follower Velocity</p>
                      <p className="text-slate-900 font-bold">+18.4% monthly</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-[10px] font-medium">Engagement Rate</p>
                      <p className="text-pink-600 font-bold">5.7% (High)</p>
                    </div>
                    <div>
                      <p className="text-slate-500 text-[10px] font-medium">Conversion Inbound</p>
                      <p className="text-amber-700 font-bold">9,200 Link Clicks</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-base font-bold text-slate-900">Actionable ROI, not vanity fluff.</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Cortouch analytics pair raw multi-channel numbers with qualitative strategic takeaways so your C-suite knows exactly what is driving sales.
                  </p>
                  <Link
                    to="/dashboard/analytics"
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 pt-2"
                  >
                    <span>View Full Analytics Report</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}

            {activeTab === 'timelines' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
                <div className="md:col-span-2 bg-white rounded-2xl border border-slate-200 p-5 space-y-4 shadow-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Campaign Roadmap</span>
                      <h4 className="text-base font-bold text-slate-900">Milan Silk Capsule Drop 01 Rollout</h4>
                    </div>
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                      75% On Track
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center text-xs font-bold">
                          ✓
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">Creative Moodboard & Lookbook Direction</p>
                          <p className="text-[10px] text-slate-500">Completed Aug 20 • Signed off by Elena</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-emerald-700">100%</span>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-50 border border-indigo-200 flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full bg-amber-100 text-amber-800 flex items-center justify-center text-xs font-bold">
                          ⏱
                        </div>
                        <div>
                          <p className="text-xs font-bold text-slate-900">Batch 1 Content Approval Window</p>
                          <p className="text-[10px] text-amber-700 font-medium">Due Sept 8 • 2 items remaining</p>
                        </div>
                      </div>
                      <span className="text-[11px] font-bold text-indigo-700">75%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <h4 className="text-base font-bold text-slate-900">Clear milestones, zero guesswork.</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Track production shoot dates, video edit locks, ad campaign flight dates, and quarterly reviews in an integrated timeline.
                  </p>
                  <Link
                    to="/dashboard/timeline"
                    className="inline-flex items-center space-x-1.5 text-xs font-bold text-indigo-600 hover:text-indigo-700 pt-2"
                  >
                    <span>Inspect Project Timelines</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-3 max-w-2xl mx-auto mb-12">
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600">
            Cortouch Capabilities
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            Tailored solutions for every stage of brand growth.
          </h2>
          <p className="text-slate-600 text-sm">
            Select an all-inclusive monthly retainer or request a specialized short-form sprint.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SERVICE_PACKAGES.slice(0, 3).map(pkg => (
            <div
              key={pkg.id}
              className={`rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all relative ${
                pkg.featured
                  ? 'bg-white border-2 border-indigo-600 shadow-xl shadow-indigo-100'
                  : 'bg-white border border-slate-200 hover:border-slate-300 shadow-sm'
              }`}
            >
              {pkg.featured && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider bg-gradient-to-r from-pink-600 to-indigo-600 text-white shadow-md">
                  Most Popular
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{pkg.name}</h3>
                  <p className="text-xs text-slate-500 mt-1 min-h-[36px] leading-relaxed">
                    {pkg.tagline}
                  </p>
                </div>

                <div className="pt-2 pb-4 border-b border-slate-100">
                  <div className="flex items-baseline space-x-1">
                    <span className="text-3xl font-extrabold text-slate-900">
                      ${pkg.priceMonthly.toLocaleString()}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">/ month</span>
                  </div>
                  <span className="text-[11px] text-pink-600 font-semibold">{pkg.turnaroundTime}</span>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-600">
                  {pkg.deliverables.map((item, idx) => (
                    <li key={idx} className="flex items-start space-x-2">
                      <Check className="w-3.5 h-3.5 text-indigo-600 shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
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
                  <span>Request This Service</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            to="/services"
            className="inline-flex items-center space-x-2 text-xs font-bold text-slate-600 hover:text-slate-900 underline underline-offset-4"
          >
            <span>View all 5 packages, pricing matrix & add-ons</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* Case Studies / Brands Managed */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-slate-100/70 rounded-3xl border border-slate-200 p-8 sm:p-12">
          <div className="max-w-xl mb-8">
            <span className="text-xs font-bold uppercase tracking-widest text-pink-600">
              Proven Results
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-1">
              Trusted by category-defining creators & companies.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CLIENT_PROFILES.map(client => (
              <div
                key={client.id}
                className="bg-white rounded-2xl p-6 border border-slate-200 flex flex-col justify-between space-y-4 hover:border-slate-300 shadow-sm transition-colors"
              >
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <img
                      src={client.avatar}
                      alt={client.name}
                      className="w-10 h-10 rounded-full object-cover border border-slate-200"
                    />
                    <div>
                      <h4 className="font-bold text-slate-900 text-sm">{client.name}</h4>
                      <p className="text-[11px] text-slate-500">{client.industry}</p>
                    </div>
                  </div>
                  <div className="text-xs text-slate-600 leading-relaxed italic">
                    "{client.id === 'client-1' 
                      ? 'Cortouch elevated our Milanese silk line into a viral sensation on TikTok and streamlined our approvals into minutes.'
                      : client.id === 'client-2'
                      ? 'Our enterprise AI leads jumped 4x after Cortouch revamped our executive founder voice on LinkedIn.'
                      : 'The team knows algorithmic audio trends better than anyone in beverage commerce.'
                    }"
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500">Lead: {client.primaryContact}</span>
                  <Link
                    to="/dashboard"
                    className="text-indigo-600 hover:text-indigo-700 font-bold"
                  >
                    View in Dashboard →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-3xl p-8 sm:p-14 border border-indigo-200 text-center space-y-6 relative overflow-hidden shadow-2xl">
          <div className="space-y-3 max-w-2xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
              Ready to command the cultural conversation?
            </h2>
            <p className="text-indigo-100 text-sm leading-relaxed font-normal">
              Submit your project scope in 2 minutes. We will review your brand identity, propose tailored content pillars, and grant you access to your Cortouch portal.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/request-service"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-3.5 rounded-2xl text-sm font-bold text-indigo-900 bg-white hover:bg-slate-50 shadow-xl transition-all hover:scale-105"
            >
              <span>Build Your Custom Service Request</span>
              <ArrowRight className="w-4 h-4 text-indigo-600" />
            </Link>
            <Link
              to="/services"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-6 py-3.5 rounded-2xl text-sm font-semibold text-white bg-white/15 border border-white/30 hover:bg-white/25 transition-all backdrop-blur-sm"
            >
              <span>Compare All Packages</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
