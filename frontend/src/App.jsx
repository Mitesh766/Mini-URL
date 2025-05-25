import React from 'react';
import { Routes, Route } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import UrlGenerator from './pages/UrlGenerator';
import ManageUrls from './pages/ManageUrls';
import ReportIssue from './pages/ReportIssue';
import Dashboard from './pages/Dashboard';
import PageNotFound from './pages/PageNotFound';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/generate" element={<UrlGenerator />} />
      <Route path="/manage" element={<ManageUrls />} />
      <Route path="/report" element={<ReportIssue />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

export default App;
