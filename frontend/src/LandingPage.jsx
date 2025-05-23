import React from 'react';
import { Link, ExternalLink, BarChart3, Zap, Shield, Globe } from 'lucide-react';

const LandingPage = () => {
    return (
             <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative text-white">
            
            <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 -z-10"></div>
          
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
            </div>

            {/* Navigation */}
            <nav className="relative z-10 px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-2 rounded-lg">
                            <Link className="w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Slink
                        </span>
                    </div>
                    <div className="hidden md:flex space-x-8">
                        <a href="#features" className="hover:text-purple-300 transition-colors duration-200">Features</a>
                        <a href="#pricing" className="hover:text-purple-300 transition-colors duration-200">Pricing</a>
                        <a href="#contact" className="hover:text-purple-300 transition-colors duration-200">Contact</a>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-20">
                <div className="text-center">
                    {/* Hero Section */}
                    <div className="animate-fade-in-up">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent leading-tight">
                            Shrink. Share. Shine
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
                            Transform your long URLs into powerful, trackable links
                        </p>
                        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
                            The fastest way to create, manage, and analyze your shortened URLs with real-time analytics and custom branding.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 animate-fade-in-up animation-delay-200">
                        <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 w-full sm:w-auto">
                            <div className="flex items-center justify-center space-x-2 relative z-10">
                                <Zap className="w-5 h-5 group-hover:animate-pulse" />
                                <span>Generate URL</span>
                            </div>
                            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300 z-0"></div>
                        </button>


                        <button className="group px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full font-semibold text-lg hover:bg-white/20 transform hover:scale-105 transition-all duration-300 shadow-lg w-full sm:w-auto">
                            <div className="flex items-center justify-center space-x-2">
                                <ExternalLink className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                                <span>Manage URLs</span>
                            </div>
                        </button>

                        {/* <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 w-full sm:w-auto">
              <div className="flex items-center justify-center space-x-2">
                <BarChart3 className="w-5 h-5 group-hover:animate-bounce" />
                <span>Dashboard</span>
              </div>
            </button> */}
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-8 mb-20 animate-fade-in-up animation-delay-400">
                        <div className="group p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:transform hover:scale-105">
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:animate-pulse">
                                <Zap className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Lightning Fast</h3>
                            <p className="text-gray-400">Generate shortened URLs in milliseconds with our optimized infrastructure and global CDN.</p>
                        </div>

                        <div className="group p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:transform hover:scale-105">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:animate-pulse">
                                <BarChart3 className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Advanced Analytics</h3>
                            <p className="text-gray-400">Track clicks, geographic data, devices, and referrers with detailed real-time analytics.</p>
                        </div>

                        <div className="group p-8 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:transform hover:scale-105">
                            <div className="bg-gradient-to-r from-pink-500 to-blue-500 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:animate-pulse">
                                <Shield className="w-8 h-8" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">Secure & Reliable</h3>
                            <p className="text-gray-400">Enterprise-grade security with 99.9% uptime guarantee and automatic malware detection.</p>
                        </div>
                    </div>

                    {/* Stats Section */}
                    <div className="bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8 animate-fade-in-up animation-delay-600">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">1M+</div>
                                <div className="text-gray-400">Links Created</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">50K+</div>
                                <div className="text-gray-400">Users</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-400 to-blue-400 bg-clip-text text-transparent mb-2">99.9%</div>
                                <div className="text-gray-400">Uptime</div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mb-2">24/7</div>
                                <div className="text-gray-400">Support</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
          opacity: 0;
        }

        .animation-delay-2000 {
          animation-delay: 2s;
        }

        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
        </div>
    );
};

export default LandingPage;