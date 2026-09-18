/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { DashboardLayout } from './components/layout/DashboardLayout';

// Pages
import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { RequestServicePage } from './pages/RequestServicePage';
import { DashboardOverviewPage } from './pages/DashboardOverviewPage';
import { AnalyticsPage } from './pages/AnalyticsPage';
import { ContentApprovalPage } from './pages/ContentApprovalPage';
import { TimelinePage } from './pages/TimelinePage';
import { RequestsListPage } from './pages/RequestsListPage';

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-indigo-500 selection:text-white">
          <Navbar />
          
          <div className="flex-1">
            <Routes>
              {/* Public Brand Pages */}
              <Route path="/" element={<HomePage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/request-service" element={<RequestServicePage />} />

              {/* Integrated Client & Agency Dashboard Routes */}
              <Route path="/dashboard" element={<DashboardLayout />}>
                <Route index element={<DashboardOverviewPage />} />
                <Route path="analytics" element={<AnalyticsPage />} />
                <Route path="approvals" element={<ContentApprovalPage />} />
                <Route path="timeline" element={<TimelinePage />} />
                <Route path="requests" element={<RequestsListPage />} />
              </Route>

              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>

          <Footer />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
