import React, { useState, useEffect } from 'react';
import { Link, Lock, Eye, EyeOff, ExternalLink, AlertCircle, Loader } from 'lucide-react';
import PageNotFound from './PageNotFound';

const UrlRedirect = ({ shortCode = 'abc123' }) => {
  const [urlData, setUrlData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [verifyingPassword, setVerifyingPassword] = useState(false);
  const [urlNotFound, setUrlNotFound] = useState(false);

  
  useEffect(() => {
    const checkURL = async () => {
      try {
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        // Mock response - you'll replace this with actual API call
        const mockResponse = {
          exists: true,
          isPasswordProtected: true,
          destinationUrl: 'https://example.com',
          title: 'Example Website'
        };

        // Uncomment below to test URL not found scenario
        // const mockResponse = { exists: false };

        if (!mockResponse.exists) {
          setUrlNotFound(true);
        } else {
          setUrlData(mockResponse);

          // If not password protected, redirect immediately
          if (!mockResponse.isPasswordProtected) {
            window.location.href = mockResponse.destinationUrl;
          }
        }
      } catch (error) {
        console.error('Error checking URL:', error);
        setUrlNotFound(true);
      } finally {
        setLoading(false);
      }
    };

    checkURL();
  }, [shortCode]);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    if (!password.trim()) return;

    setVerifyingPassword(true);
    setPasswordError('');

    try {
      // Simulate API call to verify password
      await new Promise(resolve => setTimeout(resolve, 800));

      // Mock password verification - replace with actual API call
      const isCorrectPassword = password === 'correct123'; // Mock correct password

      if (isCorrectPassword) {
        // Redirect to destination URL
        window.location.href = urlData.destinationUrl;
      } else {
        setPasswordError('Incorrect password. Please try again.');
      }
    } catch (error) {
      setPasswordError('An error occurred. Please try again.');
    } finally {
      setVerifyingPassword(false);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        </div>

        <div className="relative z-10 text-center">
          <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-4 rounded-2xl mb-6 inline-block">
            <Loader className="w-8 h-8 animate-spin" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Checking URL...</h2>
          <p className="text-gray-400">Please wait while we verify your link</p>
        </div>
      </div>
    );
  }

  // URL not found state
  if (urlNotFound) {
    return <PageNotFound />
  }

  // Password protected URL
  if (urlData?.isPasswordProtected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center relative text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        </div>

        <div className="relative z-10 w-full max-w-md mx-auto px-6">
          <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 shadow-2xl">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-4 rounded-2xl mb-6 inline-block">
                <Lock className="w-8 h-8" />
              </div>
              <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Password Protected
              </h1>
              <p className="text-gray-400">
                This link is password protected. Please enter the password to continue.
              </p>
            </div>

            {/* Password Form */}
            <div className="space-y-6">
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError('');
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handlePasswordSubmit(e);
                    }
                  }}
                  placeholder="Enter password"
                  className="w-full px-4 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 pr-12"
                  disabled={verifyingPassword}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                  disabled={verifyingPassword}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>

              {passwordError && (
                <div className="flex items-center space-x-2 text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg p-3">
                  <AlertCircle className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{passwordError}</span>
                </div>
              )}

              <button
                onClick={handlePasswordSubmit}
                disabled={!password.trim() || verifyingPassword}
                className="w-full group relative px-6 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                <div className="flex items-center justify-center space-x-2 relative z-10">
                  {verifyingPassword ? (
                    <>
                      <Loader className="w-5 h-5 animate-spin" />
                      <span>Verifying...</span>
                    </>
                  ) : (
                    <>
                      <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                      <span>Access Link</span>
                    </>
                  )}
                </div>
              </button>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-400">
                Powered by{' '}
                <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent font-semibold">
                  Minli
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }


  return null;
};

export default UrlRedirect;