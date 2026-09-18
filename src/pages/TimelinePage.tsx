import React, { useState } from 'react';
import { 
  Clock, 
  CheckCircle2, 
  Calendar, 
  Plus, 
  CheckSquare, 
  User, 
  Flag, 
  ChevronRight,
  TrendingUp,
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ProjectMilestone, MilestoneStatus } from '../types';

export const TimelinePage: React.FC = () => {
  const { clientMilestones, currentClient, toggleTask, addMilestone, userRole } = useApp();
  
  const [filterStatus, setFilterStatus] = useState<MilestoneStatus | 'all'>('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState<boolean>(false);

  // New Milestone Form
  const [newPhase, setNewPhase] = useState('Phase 4: Campaign Rollout');
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newStartDate, setNewStartDate] = useState('2026-09-15');
  const [newDueDate, setNewDueDate] = useState('2026-09-28');
  const [newOwner, setNewOwner] = useState('Cortouch Production Team');
  const [newCategory, setNewCategory] = useState<ProjectMilestone['category']>('campaign');
  const [tasksList, setTasksList] = useState<string>('Draft ad creative variants\nSet budget bids in Ads Manager\nLive flight check');

  const filteredMilestones = clientMilestones.filter(m => {
    if (filterStatus === 'all') return true;
    return m.status === filterStatus;
  });

  const getStatusPill = (status: MilestoneStatus) => {
    switch (status) {
      case 'completed':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center space-x-1 shadow-xs">
            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
            <span>Completed</span>
          </span>
        );
      case 'in_progress':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center space-x-1 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            <span>Active Sprint</span>
          </span>
        );
      case 'upcoming':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
            Upcoming
          </span>
        );
      case 'delayed':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-50 text-rose-800 border border-rose-200">
            Action Needed
          </span>
        );
    }
  };

  const handleCreateMilestone = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle) return;

    const parsedTasks = tasksList
      .split('\n')
      .filter(t => t.trim().length > 0)
      .map((t, idx) => ({ id: `t-${Date.now()}-${idx}`, title: t.trim(), done: false }));

    addMilestone({
      clientId: currentClient.id,
      phase: newPhase,
      title: newTitle,
      description: newDesc,
      startDate: newStartDate,
      dueDate: newDueDate,
      status: 'upcoming',
      progress: 0,
      owner: newOwner,
      category: newCategory,
      tasks: parsedTasks,
    });

    setIsAddModalOpen(false);
    setNewTitle('');
    setNewDesc('');
  };

  // Overall campaign progress calculation
  const totalTasks = clientMilestones.flatMap(m => m.tasks);
  const completedTasks = totalTasks.filter(t => t.done);
  const overallPercentage = totalTasks.length > 0 
    ? Math.round((completedTasks.length / totalTasks.length) * 100) 
    : 65;

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Campaign Roadmap & Project Timelines
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-indigo-50 text-indigo-700 border border-indigo-200">
              Q3 2026 Flight
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Tracking production shoot dates, video edit locks, ad flight launches, and client deliverable reviews.
          </p>
        </div>

        <div className="flex items-center space-x-2.5 self-stretch md:self-auto">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Campaign Milestone</span>
          </button>
        </div>
      </div>

      {/* Campaign Progress Gauge Banner */}
      <div className="bg-gradient-to-r from-indigo-50 via-purple-50 to-white rounded-3xl p-6 border border-indigo-100 space-y-4 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-pink-600">
              Overall Campaign Trajectory
            </span>
            <h3 className="text-lg font-bold text-slate-900 mt-0.5">
              {currentClient.name} • Master Deliverables Progress
            </h3>
          </div>
          <div className="text-right">
            <span className="text-3xl font-extrabold text-slate-900 font-mono">
              {overallPercentage}%
            </span>
            <span className="text-xs text-emerald-600 block font-semibold">On Schedule for Q3 Target</span>
          </div>
        </div>

        {/* Big Progress Bar */}
        <div className="w-full bg-slate-200/80 rounded-full h-3 overflow-hidden border border-slate-200">
          <div
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-full rounded-full transition-all duration-700"
            style={{ width: `${overallPercentage}%` }}
          />
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1">
          <span>Completed: <strong className="text-slate-800">{completedTasks.length}</strong> of {totalTasks.length} key tasks</span>
          <span>Next Major Milestone: <strong className="text-indigo-700">Drop 01 Omnichannel Launch (Sept 9)</strong></span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        {[
          { key: 'all', label: 'All Phases' },
          { key: 'in_progress', label: 'In Progress / Active' },
          { key: 'upcoming', label: 'Upcoming' },
          { key: 'completed', label: 'Completed' },
        ].map(tab => (
          <button
            key={tab.key}
            onClick={() => setFilterStatus(tab.key as any)}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
              filterStatus === tab.key
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 shadow-xs'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Milestones List */}
      <div className="space-y-4">
        {filteredMilestones.map(m => (
          <div
            key={m.id}
            className="bg-white rounded-3xl p-6 border border-slate-200 space-y-4 hover:border-slate-300 transition-all shadow-sm"
          >
            {/* Header row */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div className="space-y-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                    {m.phase}
                  </span>
                  <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                  <span className="text-[11px] text-slate-500 capitalize">{m.category}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900">{m.title}</h3>
              </div>

              <div className="flex items-center space-x-3 self-start sm:self-center">
                {getStatusPill(m.status)}
                <div className="text-right text-xs">
                  <span className="text-slate-400 block text-[10px]">Due Date</span>
                  <span className="font-semibold text-slate-800">{m.dueDate}</span>
                </div>
              </div>
            </div>

            {/* Description & Owner */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-xs">
              <div className="md:col-span-3 space-y-2">
                <p className="text-slate-600 leading-relaxed">{m.description}</p>
                
                {/* Interactive Subtasks */}
                <div className="space-y-2 pt-2">
                  <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                    Deliverables Checklist (Click to update):
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {m.tasks.map(task => (
                      <button
                        key={task.id}
                        type="button"
                        onClick={() => toggleTask(m.id, task.id)}
                        className={`p-2.5 rounded-xl border text-left flex items-start space-x-2.5 transition-colors ${
                          task.done
                            ? 'bg-emerald-50/60 border-emerald-200 text-slate-700'
                            : 'bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <div
                          className={`w-4 h-4 rounded mt-0.5 flex items-center justify-center text-[10px] font-bold shrink-0 transition-colors ${
                            task.done
                              ? 'bg-emerald-600 text-white'
                              : 'border border-slate-300 bg-white'
                          }`}
                        >
                          {task.done ? '✓' : ''}
                        </div>
                        <span className={`text-xs ${task.done ? 'line-through text-slate-400' : 'text-slate-800'}`}>
                          {task.title}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Progress & Owner Card */}
              <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-500">Phase Completion</span>
                    <span className="font-mono font-bold text-slate-900">{m.progress}%</span>
                  </div>
                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-pink-500 h-full rounded-full transition-all"
                      style={{ width: `${m.progress}%` }}
                    />
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200 text-[11px] space-y-1">
                  <div className="flex items-center space-x-1.5 text-slate-500">
                    <User className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Lead: <strong className="text-slate-800">{m.owner}</strong></span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-slate-500">
                    <Calendar className="w-3.5 h-3.5 text-pink-600" />
                    <span>Window: {m.startDate} – {m.dueDate}</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Modal: Add Milestone */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleCreateMilestone} className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">Add Project Milestone</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Phase Label</label>
                <input
                  type="text"
                  required
                  value={newPhase}
                  onChange={e => setNewPhase(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Milestone Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Influencer Gifting Dispatch & Unboxing Batch"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Detailed Scope & Description</label>
                <textarea
                  rows={2}
                  value={newDesc}
                  onChange={e => setNewDesc(e.target.value)}
                  placeholder="Summarize deliverables expected from this milestone..."
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Start Date</label>
                  <input
                    type="date"
                    value={newStartDate}
                    onChange={e => setNewStartDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Due Date</label>
                  <input
                    type="date"
                    value={newDueDate}
                    onChange={e => setNewDueDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Deliverable Subtasks (One per line)</label>
                <textarea
                  rows={3}
                  value={tasksList}
                  onChange={e => setTasksList(e.target.value)}
                  placeholder="Task item 1&#10;Task item 2"
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="px-3 py-2 text-xs text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all"
              >
                Save Milestone
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
