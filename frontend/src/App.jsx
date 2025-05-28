import React from 'react';
import { Routes, Route, useNavigate, Outlet } from 'react-router-dom';

import LandingPage from './pages/LandingPage';
import Login from './pages/Login';
import UrlGenerator from './pages/UrlGenerator';
import ManageUrls from './pages/ManageUrls';
import ReportIssue from './pages/ReportIssue';
import Dashboard from './pages/Dashboard';
import PageNotFound from './pages/PageNotFound';
import ProtectedRoute from './pages/ProtectedRoute';
import { useEffect } from 'react';
import axios from 'axios';
import { USERS_URL } from './utils/constants';
import { useDispatch } from 'react-redux';
import { setLogin } from './redux/userSlice';
import ContactPage from './pages/ContactPage';


const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const verifyLoggedIn = async () => {
      try {
        await axios.get(`${USERS_URL}/verifyLogin`, { withCredentials: true })
        dispatch(setLogin(true))
      } catch (err) {
        console.log(err)
      }
    }
    verifyLoggedIn()
  }, [])
  return (
    <Routes>
  {/* Public Routes */}
  <Route path="/" element={<LandingPage />} />
  <Route path="/login" element={<Login />} />
  <Route path="/contact" element={<ContactPage />} />

  {/* Protected Routes */}
  <Route
    element={
      <ProtectedRoute>
        <Outlet />
      </ProtectedRoute>
    }
  >
    <Route path="/shorten" element={<UrlGenerator />} />
    <Route path="/my-links" element={<ManageUrls />} />
    <Route path="/report-issue" element={<ReportIssue />} />
    <Route path="/analytics/:urlId" element={<Dashboard />} />
  </Route>

  {/* 404 Fallback */}
  <Route path="*" element={<PageNotFound />} />
</Routes>

  );
};

export default App;
