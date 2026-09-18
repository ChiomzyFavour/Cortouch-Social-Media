import React, { useState } from 'react';
import { 
  CheckSquare, 
  Clock, 
  MessageSquare, 
  Plus, 
  Check, 
  X, 
  RotateCcw, 
  Filter, 
  Send, 
  Sparkles,
  Calendar,
  Layers,
  ChevronRight,
  AlertCircle
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ContentPost, PostStatus, SocialPlatform } from '../types';

export const ContentApprovalPage: React.FC = () => {
  const { 
    clientPosts, 
    currentClient, 
    userRole, 
    approvePost, 
    requestPostChanges, 
    addPostComment, 
    createPostDraft 
  } = useApp();

  const [activeFilter, setActiveFilter] = useState<PostStatus | 'all'>('all');
  const [selectedPostForModal, setSelectedPostForModal] = useState<ContentPost | null>(null);
  const [modalMode, setModalMode] = useState<'review' | 'feedback' | 'new_draft' | null>(null);
  
  // Feedback input
  const [feedbackNote, setFeedbackNote] = useState('');
  const [commentInput, setCommentInput] = useState('');

  // New Post Draft Form State
  const [newTitle, setNewTitle] = useState('');
  const [newPlatform, setNewPlatform] = useState<SocialPlatform>('instagram');
  const [newMediaType, setNewMediaType] = useState<'image' | 'video' | 'carousel'>('video');
  const [newCaption, setNewCaption] = useState('');
  const [newHashtags, setNewHashtags] = useState('');
  const [newDate, setNewDate] = useState('2026-09-14 11:00 AM');
  const [newMediaUrl, setNewMediaUrl] = useState('https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=800&q=80');

  const filteredPosts = clientPosts.filter(p => {
    if (activeFilter === 'all') return true;
    return p.status === activeFilter;
  });

  const getStatusBadge = (status: PostStatus) => {
    switch (status) {
      case 'pending_approval':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-amber-50 text-amber-800 border border-amber-200 flex items-center space-x-1 shadow-xs">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
            <span>Pending Review</span>
          </span>
        );
      case 'approved':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200 flex items-center space-x-1 shadow-xs">
            <span>✓ Approved & Locked</span>
          </span>
        );
      case 'changes_requested':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-50 text-rose-800 border border-rose-200 flex items-center space-x-1 shadow-xs">
            <span>↺ Revisions In Progress</span>
          </span>
        );
      case 'scheduled':
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-sky-50 text-sky-800 border border-sky-200 flex items-center space-x-1 shadow-xs">
            <span>⏱ Scheduled to Dispatch</span>
          </span>
        );
      default:
        return (
          <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
            {status}
          </span>
        );
    }
  };

  const handleOpenFeedback = (post: ContentPost) => {
    setSelectedPostForModal(post);
    setFeedbackNote('');
    setModalMode('feedback');
  };

  const handleOpenReview = (post: ContentPost) => {
    setSelectedPostForModal(post);
    setModalMode('review');
  };

  const handleSendFeedback = () => {
    if (!selectedPostForModal || !feedbackNote.trim()) return;
    requestPostChanges(selectedPostForModal.id, feedbackNote);
    setModalMode(null);
  };

  const handleAddComment = (postId: string) => {
    if (!commentInput.trim()) return;
    addPostComment(postId, commentInput);
    setCommentInput('');
  };

  const handleCreateDraft = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newCaption) return;

    createPostDraft({
      clientId: currentClient.id,
      clientName: currentClient.name,
      platform: newPlatform,
      title: newTitle,
      caption: newCaption,
      hashtags: newHashtags.split(' ').filter(h => h.startsWith('#')),
      mediaType: newMediaType,
      mediaUrls: [newMediaUrl],
      scheduledDate: newDate,
      author: 'Cortouch Creative Lead',
    });

    setModalMode(null);
    setNewTitle('');
    setNewCaption('');
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Controls */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
              Content Approval Hub
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-pink-50 text-pink-700 border border-pink-200">
              {clientPosts.filter(p => p.status === 'pending_approval').length} Awaiting Approval
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Review upcoming creative cuts, leave time-stamped revision requests, or give instant greenlight approvals.
          </p>
        </div>

        <div className="flex items-center space-x-2.5 self-stretch md:self-auto">
          {/* Agency role can create post drafts */}
          <button
            onClick={() => setModalMode('new_draft')}
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-sm"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Create New Post Draft</span>
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        {[
          { key: 'all', label: 'All Content Pieces' },
          { key: 'pending_approval', label: 'Pending Approval' },
          { key: 'approved', label: 'Approved' },
          { key: 'changes_requested', label: 'Changes Requested' },
          { key: 'scheduled', label: 'Scheduled' },
        ].map(tab => {
          const isSelected = activeFilter === tab.key;
          const count = clientPosts.filter(p => tab.key === 'all' || p.status === tab.key).length;

          return (
            <button
              key={tab.key}
              onClick={() => setActiveFilter(tab.key as any)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center space-x-1.5 ${
                isSelected
                  ? 'bg-gradient-to-r from-indigo-600 to-pink-600 text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50 shadow-xs'
              }`}
            >
              <span>{tab.label}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${isSelected ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'}`}>
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Posts Cards Grid */}
      {filteredPosts.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 shadow-sm space-y-3">
          <CheckSquare className="w-8 h-8 text-slate-400 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">No content posts found</h3>
          <p className="text-xs text-slate-500">There are no posts currently matching this filter status.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map(post => (
            <div
              key={post.id}
              className="bg-white rounded-3xl border border-slate-200 overflow-hidden flex flex-col justify-between hover:border-slate-300 transition-all shadow-sm"
            >
              {/* Media Preview & Status Top */}
              <div className="relative bg-slate-100 aspect-[16/10] overflow-hidden group">
                <img
                  src={post.mediaUrls[0]}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Platform Badge */}
                <div className="absolute top-3 left-3 flex items-center space-x-2">
                  <span className="px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/90 backdrop-blur-md text-slate-800 border border-slate-200 shadow-xs">
                    {post.platform} • {post.mediaType}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-white/80 text-slate-600 shadow-xs">
                    v{post.version}.0
                  </span>
                </div>

                {/* Status Indicator */}
                <div className="absolute top-3 right-3 backdrop-blur-md rounded-full shadow-sm">
                  {getStatusBadge(post.status)}
                </div>

                {/* Scheduled Time Banner */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-slate-900/90 via-slate-900/60 to-transparent p-3 pt-6 flex items-center justify-between text-[11px] text-white">
                  <span className="flex items-center space-x-1">
                    <Clock className="w-3.5 h-3.5 text-indigo-300" />
                    <span>Slot: <strong>{post.scheduledDate}</strong></span>
                  </span>
                  <span className="text-slate-200 text-[10px]">Author: {post.author.split('(')[0]}</span>
                </div>
              </div>

              {/* Content Body */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <h3 className="font-bold text-slate-900 text-sm leading-snug">{post.title}</h3>
                  <p className="text-xs text-slate-700 leading-relaxed line-clamp-3 bg-slate-50 p-2.5 rounded-xl border border-slate-200 font-sans">
                    {post.caption}
                  </p>
                  
                  {post.hashtags.length > 0 && (
                    <div className="flex flex-wrap gap-1 text-[11px] font-mono text-indigo-600 font-medium">
                      {post.hashtags.map((tag, i) => (
                        <span key={i}>{tag}</span>
                      ))}
                    </div>
                  )}

                  {post.feedbackNotes && (
                    <div className="p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-[11px] text-amber-800 flex items-start space-x-2">
                      <AlertCircle className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Latest Note:</strong> {post.feedbackNotes}
                      </div>
                    </div>
                  )}
                </div>

                {/* Comment Threads Counter & Actions */}
                <div className="pt-4 border-t border-slate-100 space-y-3">
                  <div className="flex items-center justify-between text-xs text-slate-500">
                    <button
                      onClick={() => handleOpenReview(post)}
                      className="hover:text-indigo-600 flex items-center space-x-1 font-semibold"
                    >
                      <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                      <span>{post.comments.length} Discussion Comment{post.comments.length !== 1 ? 's' : ''}</span>
                    </button>
                    <span className="text-[11px] text-slate-400">Fast 24hr Revision SLA</span>
                  </div>

                  {/* Client Action Buttons */}
                  <div className="grid grid-cols-2 gap-2">
                    {post.status !== 'approved' ? (
                      <>
                        <button
                          onClick={() => approvePost(post.id, 'One-click approved')}
                          className="py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center space-x-1.5 shadow-xs transition-all"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Approve Draft</span>
                        </button>
                        <button
                          onClick={() => handleOpenFeedback(post)}
                          className="py-2 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 font-semibold text-xs flex items-center justify-center space-x-1.5 transition-all shadow-xs"
                        >
                          <RotateCcw className="w-3.5 h-3.5 text-pink-600" />
                          <span>Request Edits</span>
                        </button>
                      </>
                    ) : (
                      <div className="col-span-2 py-2 px-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 font-bold text-xs text-center flex items-center justify-center space-x-1.5 shadow-xs">
                        <Check className="w-4 h-4 text-emerald-600" />
                        <span>Ready & Scheduled in Platform Dispatch Queue</span>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal: Review & Discussion Thread */}
      {modalMode === 'review' && selectedPostForModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-wider">
                  {selectedPostForModal.platform} Draft Review
                </span>
                <h3 className="text-base font-bold text-slate-900">{selectedPostForModal.title}</h3>
              </div>
              <button
                onClick={() => setModalMode(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            {/* Post full caption */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-700">Complete Caption & Copy:</label>
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed whitespace-pre-line">
                {selectedPostForModal.caption}
              </div>
            </div>

            {/* Threaded Discussion */}
            <div className="space-y-3">
              <label className="text-xs font-semibold text-slate-700">Revision History & Feedback Thread:</label>
              <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
                {selectedPostForModal.comments.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No notes left yet. Add the first comment below.</p>
                ) : (
                  selectedPostForModal.comments.map(c => (
                    <div
                      key={c.id}
                      className={`p-3 rounded-xl text-xs space-y-1 ${
                        c.authorRole === 'client'
                          ? 'bg-pink-50 border border-pink-200 ml-4'
                          : 'bg-slate-50 border border-slate-200 mr-4'
                      }`}
                    >
                      <div className="flex items-center justify-between text-[10px] text-slate-500">
                        <span className="font-bold text-slate-800">{c.author}</span>
                        <span>{c.timestamp}</span>
                      </div>
                      <p className="text-slate-700 leading-relaxed">{c.text}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Add Comment Input */}
              <div className="flex items-center space-x-2 pt-2">
                <input
                  type="text"
                  placeholder="Type notes for Cortouch creative team..."
                  value={commentInput}
                  onChange={e => setCommentInput(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === 'Enter') handleAddComment(selectedPostForModal.id);
                  }}
                  className="flex-1 px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
                <button
                  onClick={() => handleAddComment(selectedPostForModal.id)}
                  className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-xs"
                >
                  Send Note
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              {selectedPostForModal.status !== 'approved' && (
                <button
                  onClick={() => {
                    approvePost(selectedPostForModal.id);
                    setModalMode(null);
                  }}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-xs"
                >
                  ✓ Approve Post
                </button>
              )}
              <button
                onClick={() => setModalMode(null)}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800 ml-auto"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Request Edits */}
      {modalMode === 'feedback' && selectedPostForModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <RotateCcw className="w-4 h-4 text-pink-600" />
                <h3 className="text-base font-bold text-slate-900">Request Content Edits</h3>
              </div>
              <button
                onClick={() => setModalMode(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Specify what needs adjustment in <span className="text-slate-900 font-semibold">{selectedPostForModal.title}</span>. 
              Our editors will turn around version {selectedPostForModal.version + 1} within 24 hours.
            </p>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Detailed Feedback / Timestamp Notes:</label>
              <textarea
                rows={4}
                required
                placeholder="e.g. Please swap the opening hook at 0:02 to the second camera angle, and change the brand promo code in caption to 'LUXE20'..."
                value={feedbackNote}
                onChange={e => setFeedbackNote(e.target.value)}
                className="w-full p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-pink-600 focus:bg-white"
              />
            </div>

            <div className="pt-2 flex items-center justify-end space-x-2">
              <button
                onClick={() => setModalMode(null)}
                className="px-3 py-2 text-xs text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={handleSendFeedback}
                className="px-4 py-2 rounded-xl bg-pink-600 hover:bg-pink-700 text-white font-bold text-xs shadow-md transition-all"
              >
                Submit Revision Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal: Create New Post Draft (Agency View) */}
      {modalMode === 'new_draft' && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4">
          <form onSubmit={handleCreateDraft} className="bg-white border border-slate-200 rounded-3xl max-w-xl w-full p-6 space-y-4 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center space-x-2">
                <Plus className="w-4 h-4 text-indigo-600" />
                <h3 className="text-base font-bold text-slate-900">Create New Post Draft for {currentClient.name}</h3>
              </div>
              <button
                type="button"
                onClick={() => setModalMode(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Post Title / Campaign Concept *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Silk Blazer Styling Lookbook Reel"
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Social Channel</label>
                  <select
                    value={newPlatform}
                    onChange={e => setNewPlatform(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                  >
                    <option value="instagram">Instagram</option>
                    <option value="tiktok">TikTok</option>
                    <option value="linkedin">LinkedIn</option>
                    <option value="youtube">YouTube</option>
                    <option value="x">Twitter / X</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Media Format</label>
                  <select
                    value={newMediaType}
                    onChange={e => setNewMediaType(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                  >
                    <option value="video">Short-Form Video / Reel</option>
                    <option value="image">Static High-Res Graphic</option>
                    <option value="carousel">Multi-Slide Carousel</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Draft Caption *</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Write the engaging hook, body copy, and call-to-action..."
                  value={newCaption}
                  onChange={e => setNewCaption(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700">Hashtags & Audio Keywords</label>
                <input
                  type="text"
                  placeholder="#BrandAesthetic #TrendingFashion #ViralReel"
                  value={newHashtags}
                  onChange={e => setNewHashtags(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:bg-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Target Publish Slot</label>
                  <input
                    type="text"
                    value={newDate}
                    onChange={e => setNewDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-slate-700">Media Preview URL</label>
                  <input
                    type="url"
                    value={newMediaUrl}
                    onChange={e => setNewMediaUrl(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-200 text-slate-900 focus:outline-none focus:border-indigo-600 focus:bg-white"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-end space-x-2">
              <button
                type="button"
                onClick={() => setModalMode(null)}
                className="px-3 py-2 text-xs text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md transition-all"
              >
                Submit Draft to Client
              </button>
            </div>
          </form>
        </div>
      )}

    </div>
  );
};
