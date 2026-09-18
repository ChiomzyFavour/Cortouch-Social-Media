import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowUpRight, Instagram, Linkedin, Youtube, ShieldCheck, Mail, MapPin } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-slate-200 text-slate-600 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 lg:gap-12">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-4">
            <div className="flex items-center space-x-2.5">
             
               {/* Logo Image */}
    <img 
      src="/Images/Cortouch-Media-logo-new-12-removebg-preview.png" 
      alt="Cortouch Media Logo" 
      className="h-14 w-auto object-contain" 
    />
            </div>
            <p className="text-xs leading-relaxed text-slate-500">
              The modern social media management, creative production, and performance marketing studio for culture-defining brands.
            </p>
            <div className="flex items-center space-x-3 pt-2 text-slate-500">
              <a href="#" className="p-2 rounded-lg bg-slate-100 hover:bg-pink-50 hover:text-pink-600 transition-colors">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-100 hover:bg-indigo-50 hover:text-indigo-600 transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#" className="p-2 rounded-lg bg-slate-100 hover:bg-red-50 hover:text-red-600 transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Agency & Services
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/services" className="hover:text-indigo-600 transition-colors">
                  Omnichannel Social Management
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-indigo-600 transition-colors">
                  Short-Form Video Production Lab
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-indigo-600 transition-colors">
                  Paid Social & Performance Ads
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-indigo-600 transition-colors">
                  Executive Thought Leadership
                </Link>
              </li>
              <li>
                <Link to="/request-service" className="hover:text-pink-600 transition-colors text-indigo-600 font-semibold">
                  Instant Service Request & Quote →
                </Link>
              </li>
            </ul>
          </div>

          {/* Integrated Portal */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Client Portal
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/dashboard" className="hover:text-indigo-600 transition-colors">
                  Client Dashboard Overview
                </Link>
              </li>
              <li>
                <Link to="/dashboard/approvals" className="hover:text-indigo-600 transition-colors">
                  Content Approval Workflow
                </Link>
              </li>
              <li>
                <Link to="/dashboard/analytics" className="hover:text-indigo-600 transition-colors">
                  Live Analytics & ROI Reports
                </Link>
              </li>
              <li>
                <Link to="/dashboard/timeline" className="hover:text-indigo-600 transition-colors">
                  Project Timelines & Milestones
                </Link>
              </li>
              <li>
                <Link to="/dashboard/requests" className="hover:text-indigo-600 transition-colors">
                  Active Service Inquiries
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact & Status */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900">
              Direct Contact
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center space-x-2 text-slate-600">
                <Mail className="w-3.5 h-3.5 text-indigo-600" />
                <span>cortouchmedia.com.ng</span>
              </div>
              <div className="flex items-center space-x-2 text-slate-600">
                <MapPin className="w-3.5 h-3.5 text-pink-600" />
                <span>Nigeria • Ibadan • Oyo State</span>
              </div>
              <div className="pt-2">
                <div className="inline-flex items-center space-x-2 px-2.5 py-1.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-700 text-[11px] font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>Accepting Q4 2026 Client Partners</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Cortouch Media Group. All rights reserved.</p>
          <div className="flex items-center space-x-4">
            <span className="hover:text-slate-700 cursor-pointer">Confidentiality Agreement</span>
            <span>•</span>
            <span className="hover:text-slate-700 cursor-pointer">SLA Guarantee</span>
            <span>•</span>
            <span className="hover:text-slate-700 cursor-pointer">Content IP Rights</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
