import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BarChart3, 
  CheckSquare, 
  Clock, 
  TrendingUp, 
  Users, 
  Eye, 
  MousePointer, 
  Sparkles, 
  ArrowUpRight, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Plus
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const DashboardOverviewPage: React.FC = () => {
  const { 
    currentClient, 
    currentAnalytics, 
    clientPosts, 
    clientMilestones, 
    userRole,
    approvePost,
    pendingApprovalsCount
  } = useApp();

  const pendingPosts = clientPosts.filter(p => p.status === 'pending_approval');
  const activeMilestone = clientMilestones.find(m => m.status === 'in_progress') || clientMilestones[0];

  return (
    <div className="space-y-6">
      
      {/* Top Welcome & Meta Bar */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-center space-x-3.5">
          <img
            src={currentClient.avatar}
            alt={currentClient.name}
            className="w-12 h-12 rounded-2xl object-cover border-2 border-indigo-200 shadow-xs"
          />
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                {currentClient.name}
              </h1>
              <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
                {currentClient.industry}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Welcome back, <span className="text-slate-800 font-semibold">{currentClient.primaryContact}</span>. Here is your brand pulse across active channels.
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2.5 self-stretch md:self-auto">
          <Link
            to="/request-service"
            className="flex-1 md:flex-initial inline-flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Request Services</span>
          </Link>
          <Link
            to="/dashboard/analytics"
            className="flex-1 md:flex-initial inline-flex items-center justify-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
          >
            <BarChart3 className="w-3.5 h-3.5 text-slate-500" />
            <span>Full Report</span>
          </Link>
        </div>
      </div>

      {/* Primary KPI Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Reach */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-medium">Multi-Channel Reach</span>
            <Eye className="w-4 h-4 text-indigo-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
            {currentAnalytics.totalReach.toLocaleString()}
          </div>
          <div className="flex items-center space-x-1.5 text-xs text-emerald-600 mt-1.5 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+{currentAnalytics.reachGrowth}% vs last cycle</span>
          </div>
        </div>

        {/* Total Audience */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-medium">Total Audience</span>
            <Users className="w-4 h-4 text-pink-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
            {currentAnalytics.totalFollowers.toLocaleString()}
          </div>
          <div className="flex items-center space-x-1.5 text-xs text-emerald-600 mt-1.5 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+{currentAnalytics.followersGrowth}% growth</span>
          </div>
        </div>

        {/* Avg Engagement Rate */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-medium">Avg. Engagement</span>
            <Sparkles className="w-4 h-4 text-amber-500" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
            {currentAnalytics.avgEngagementRate}%
          </div>
          <div className="flex items-center space-x-1.5 text-xs text-emerald-600 mt-1.5 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+{currentAnalytics.engagementGrowth}% benchmark</span>
          </div>
        </div>

        {/* Total Impressions */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-sm relative overflow-hidden">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span className="font-medium">Total Impressions</span>
            <MousePointer className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-mono">
            {(currentAnalytics.totalImpressions / 1000000).toFixed(2)}M
          </div>
          <div className="flex items-center space-x-1.5 text-xs text-emerald-600 mt-1.5 font-semibold">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+{currentAnalytics.impressionsGrowth}% volume</span>
          </div>
        </div>
      </div>

      {/* Actionable Section: Pending Approvals & Timeline Progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Approvals Spotlight (2 Columns) */}
        <div className="lg:col-span-2 bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckSquare className="w-4 h-4 text-pink-600" />
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Content Approval Queue
              </h2>
            </div>
            <Link
              to="/dashboard/approvals"
              className="text-xs text-indigo-600 hover:text-indigo-700 font-bold flex items-center space-x-1"
            >
              <span>View All ({clientPosts.length})</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {pendingPosts.length === 0 ? (
            <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-200 space-y-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
              <p className="text-sm font-bold text-slate-900">All Caught Up!</p>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                There are no pending drafts waiting for your review. Cortouch production team is currently editing next week's batch.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {pendingPosts.map(post => (
                <div
                  key={post.id}
                  className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-center space-x-3.5 min-w-0">
                    <img
                      src={post.mediaUrls[0]}
                      alt={post.title}
                      className="w-14 h-14 rounded-xl object-cover shrink-0 border border-slate-200"
                    />
                    <div className="min-w-0">
                      <div className="flex items-center space-x-2">
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-pink-50 text-pink-700 border border-pink-200">
                          {post.platform} {post.mediaType}
                        </span>
                        <span className="text-[10px] text-slate-500 font-medium">
                          Scheduled: {post.scheduledDate}
                        </span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 mt-1 truncate max-w-md">
                        {post.title}
                      </h4>
                      <p className="text-[11px] text-slate-600 truncate max-w-sm mt-0.5">
                        {post.caption}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-200">
                    <button
                      onClick={() => approvePost(post.id, 'Approved via dashboard overview')}
                      className="flex-1 sm:flex-initial px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-xs"
                    >
                      ✓ Approve
                    </button>
                    <Link
                      to="/dashboard/approvals"
                      className="flex-1 sm:flex-initial px-3 py-1.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 text-xs font-semibold text-center shadow-xs"
                    >
                      Inspect / Edit
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Timeline Status Widget (1 Column) */}
        <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4 flex flex-col justify-between">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                  Active Milestone
                </h2>
              </div>
              <Link
                to="/dashboard/timeline"
                className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold"
              >
                Gantt →
              </Link>
            </div>

            {activeMilestone && (
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[10px] font-bold text-indigo-600 uppercase">
                    {activeMilestone.phase}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-indigo-100 text-indigo-800">
                    {activeMilestone.progress}% Complete
                  </span>
                </div>

                <h4 className="font-bold text-slate-900 text-xs leading-snug">
                  {activeMilestone.title}
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed line-clamp-2">
                  {activeMilestone.description}
                </p>

                {/* Progress bar */}
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-indigo-600 to-pink-500 h-full rounded-full transition-all duration-500"
                    style={{ width: `${activeMilestone.progress}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1">
                  <span>Lead: {activeMilestone.owner}</span>
                  <span className="text-amber-800 font-semibold">Due: {activeMilestone.dueDate}</span>
                </div>
              </div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-100">
            <Link
              to="/dashboard/timeline"
              className="w-full inline-flex items-center justify-center space-x-1.5 py-2 rounded-xl text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              <span>Track All Campaign Phases</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* Strategic Insights & Growth Levers */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-amber-500" />
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Cortouch Strategist Recommendations
            </h2>
          </div>
          <span className="text-xs text-slate-500">Updated for Q3 Cycle</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentAnalytics.strategicInsights.map(insight => (
            <div
              key={insight.id}
              className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-col justify-between space-y-3 hover:border-slate-300 transition-colors"
            >
              <div className="space-y-1.5">
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${
                  insight.type === 'positive'
                    ? 'bg-emerald-100 text-emerald-800'
                    : insight.type === 'opportunity'
                    ? 'bg-indigo-100 text-indigo-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {insight.type}
                </span>
                <h4 className="font-bold text-slate-900 text-xs leading-snug">
                  {insight.title}
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  {insight.description}
                </p>
              </div>

              <div className="pt-2 border-t border-slate-200 text-[11px] font-bold text-pink-600">
                ⚡ Impact: {insight.impact}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
