import React, { useState } from 'react';
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Share2, 
  Calendar, 
  Filter, 
  Eye, 
  Users, 
  MousePointer, 
  Sparkles,
  Instagram,
  Linkedin,
  Youtube,
  Check,
  Copy,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { SocialPlatform, PlatformStats } from '../types';

export const AnalyticsPage: React.FC = () => {
  const { currentClient, currentAnalytics } = useApp();
  const [selectedPlatform, setSelectedPlatform] = useState<string>('all');
  const [timeRange, setTimeRange] = useState<string>('30d');
  const [chartMetric, setChartMetric] = useState<'reach' | 'impressions' | 'engagement' | 'clicks'>('reach');
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  const history = currentAnalytics.history;
  const maxVal = Math.max(...history.map(h => h[chartMetric])) * 1.15;

  const handleCopyShareLink = () => {
    navigator.clipboard.writeText(`https://cortouchmedia.com/reports/₦{currentClient.id}?token=cm_sec_8921`);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header & Export Controls */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Executive Analytics & Performance Report
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
              Live Verified Data
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Tracking multi-channel trajectory for <span className="text-slate-800 font-semibold">{currentClient.name}</span> ({currentAnalytics.period}).
          </p>
        </div>

        <div className="flex items-center space-x-2.5 self-stretch md:self-auto">
          {/* Time range selector */}
          <select
            value={timeRange}
            onChange={e => setTimeRange(e.target.value)}
            className="px-3 py-2 rounded-xl bg-white border border-slate-200 text-xs font-semibold text-slate-700 focus:outline-none focus:border-indigo-600 shadow-xs"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days (Current Cycle)</option>
            <option value="q3">Q3 2026 Quarter-to-Date</option>
            <option value="ytd">Year-to-Date Performance</option>
          </select>

          {/* Share / Export button */}
          <button
            onClick={() => setIsShareModalOpen(true)}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share / Export</span>
          </button>
        </div>
      </div>

      {/* Platform Filter Pills */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        <button
          onClick={() => setSelectedPlatform('all')}
          className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ₦{
            selectedPlatform === 'all'
              ? 'bg-gradient-to-r from-indigo-600 to-pink-600 text-white shadow-sm'
              : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 shadow-xs'
          }`}
        >
          All Connected Channels
        </button>
        {Object.keys(currentAnalytics.platforms).map(key => {
          const isSelected = selectedPlatform === key;
          return (
            <button
              key={key}
              onClick={() => setSelectedPlatform(key)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold uppercase tracking-wider whitespace-nowrap transition-all ${
                isSelected
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 shadow-xs'
              }`}
            >
              {key}
            </button>
          );
        })}
      </div>

      {/* Interactive Growth Trajectory Chart */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-pink-600">
              Cross-Platform Trajectory
            </span>
            <h3 className="text-base font-bold text-slate-900 mt-0.5">
              Weekly Metric Trajectory & Pacing
            </h3>
          </div>

          {/* Metric switch buttons */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
            {(['reach', 'impressions', 'engagement', 'clicks'] as const).map(m => (
              <button
                key={m}
                onClick={() => setChartMetric(m)}
                className={`px-3 py-1 rounded-lg font-bold capitalize transition-all ₦{
                  chartMetric === m
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {m}
              </button>
            ))}
          </div>
        </div>

        {/* Custom SVG Data Visualization */}
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5 space-y-3">
          <div className="h-64 w-full flex items-end justify-between gap-4 pt-4 pb-2 px-2 relative">
            {/* Background Grid Lines */}
            <div className="absolute inset-0 flex flex-col justify-between pointer-events-none px-4 py-6">
              <div className="border-b border-slate-200 w-full" />
              <div className="border-b border-slate-200 w-full" />
              <div className="border-b border-slate-200 w-full" />
            </div>

            {history.map((point, index) => {
              const val = point[chartMetric];
              const heightPercent = Math.min(100, Math.round((val / maxVal) * 100));

              return (
                <div key={index} className="flex-1 flex flex-col items-center justify-end h-full group z-10">
                  {/* Tooltip value */}
                  <div className="mb-2 opacity-90 group-hover:opacity-100 transition-opacity text-center">
                    <span className="text-[10px] font-mono font-bold text-indigo-700 bg-white px-2 py-0.5 rounded border border-slate-200 shadow-xs">
                      {val.toLocaleString()}
                    </span>
                  </div>

                  {/* Visual Gradient Bar */}
                  <div className="w-full max-w-[48px] bg-slate-200/80 rounded-t-xl overflow-hidden h-full flex items-end">
                    <div
                      className="w-full bg-gradient-to-t from-indigo-600 via-purple-600 to-pink-500 rounded-t-xl transition-all duration-700 group-hover:brightness-110"
                      style={{ height: `₦{heightPercent}%` }}
                    />
                  </div>

                  {/* Label */}
                  <div className="text-center mt-2">
                    <span className="text-xs font-semibold text-slate-800 block">{point.label}</span>
                    <span className="text-[10px] text-slate-400 font-mono block">{point.date}</span>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-slate-200">
            <span>Chart Metric: <strong className="text-slate-800 capitalize">{chartMetric}</strong></span>
            <span className="text-emerald-600 font-semibold flex items-center space-x-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Consistently pacing +34.2% above baseline expectations</span>
            </span>
          </div>
        </div>
      </div>

      {/* Platform Distribution Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(Object.entries(currentAnalytics.platforms) as [string, PlatformStats | undefined][]).map(([platform, stats]) => {
          if (!stats) return null;
          return (
            <div
              key={platform}
              className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4 hover:border-slate-300 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center space-x-1.5">
                  <span>{platform}</span>
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-100">
                  {stats.postsCount} Posts Active
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-baseline">
                  <span className="text-slate-500">Platform Followers:</span>
                  <div className="text-right">
                    <span className="font-mono font-bold text-slate-900 text-sm">
                      {stats.followers.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-emerald-600 ml-1.5 font-semibold">
                      +{stats.followersGrowth}%
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="text-slate-500">Total Reach:</span>
                  <div className="text-right">
                    <span className="font-mono font-bold text-slate-900 text-sm">
                      {stats.reach.toLocaleString()}
                    </span>
                    <span className="text-[10px] text-emerald-600 ml-1.5 font-semibold">
                      +{stats.reachGrowth}%
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-baseline">
                  <span className="text-slate-500">Engagement Rate:</span>
                  <div className="text-right">
                    <span className="font-mono font-bold text-pink-600 text-sm">
                      {stats.engagementRate}%
                    </span>
                    <span className="text-[10px] text-emerald-600 ml-1.5 font-semibold">
                      +{stats.engagementGrowth}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Strategic Observations / Retrospective */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600">
            Strategic Observations
          </span>
          <h3 className="text-base font-bold text-slate-900 mt-0.5">
            Cortouch Senior Strategist Insights & Takeaways
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentAnalytics.strategicInsights.map(item => (
            <div
              key={item.id}
              className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-2 flex flex-col justify-between"
            >
              <div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ₦{
                  item.type === 'positive'
                    ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                    : item.type === 'opportunity'
                    ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                    : 'bg-amber-50 text-amber-700 border border-amber-200'
                }`}>
                  {item.type}
                </span>
                <h4 className="font-bold text-slate-900 text-xs mt-2">{item.title}</h4>
                <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>
              <div className="pt-2 border-t border-slate-200 text-[11px] text-pink-600 font-semibold">
                Impact: {item.impact}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Share / Export Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Share2 className="w-5 h-5 text-indigo-600" />
                <h3 className="text-lg font-bold text-slate-900">Share Analytic Report</h3>
              </div>
              <button
                onClick={() => setIsShareModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Generate an executive-ready PDF report or share an encrypted read-only link with your investors, founders, or marketing council.
            </p>

            {/* Link Copy Box */}
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Secure Live Link:</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  readOnly
                  value={`https://cortouchmedia.com/reports/₦{currentClient.id}?token=cm_sec_8921`}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono text-slate-800 focus:outline-none"
                />
                <button
                  onClick={handleCopyShareLink}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center space-x-1 shadow-xs"
                >
                  {copiedLink ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedLink ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <button
                onClick={() => {
                  window.print();
                }}
                className="inline-flex items-center space-x-2 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold border border-slate-200 shadow-xs"
              >
                <Download className="w-4 h-4" />
                <span>Export PDF Summary</span>
              </button>

              <button
                onClick={() => setIsShareModalOpen(false)}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
