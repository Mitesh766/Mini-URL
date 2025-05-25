import React from 'react';
import { Link, Home, ArrowLeft, Search, AlertTriangle } from 'lucide-react';

const PageNotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative text-white">
            {/* Fixed Background */}
            <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 -z-10"></div>

            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse animation-delay-4000"></div>
            </div>

            {/* Navigation */}
            <nav className="relative z-10 px-6 py-4">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                        <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-2 rounded-lg">
                            <Link className="w-6 h-6" />
                        </div>
                        <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Minli
                        </span>
                    </div>
                </div>
            </nav>

            {/* Main 404 Content */}
            <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
                {/* 404 Number with Animation */}
                <div className="animate-fade-in-up mb-8">
                    <div className="relative">
                        <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent leading-none mb-4">
                            404
                        </h1>
                        <div className="absolute inset-0 text-8xl md:text-9xl font-bold text-white/5 blur-sm">
                            404
                        </div>
                    </div>
                </div>

                {/* Error Icon with Animation */}
                <div className="animate-fade-in-up animation-delay-200 mb-8">
                    <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-sm rounded-full border border-white/10 mb-6">
                        <AlertTriangle className="w-12 h-12 text-purple-400 animate-pulse" />
                    </div>
                </div>

                {/* Error Messages */}
                <div className="animate-fade-in-up animation-delay-400 mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Oops! Page Not Found
                    </h2>
                    <p className="text-xl text-gray-300 mb-4 max-w-2xl mx-auto">
                        The page you're looking for seems to have vanished into the digital void.
                    </p>
                    <p className="text-lg text-gray-400 max-w-xl mx-auto">
                        Don't worry though - let's get you back on track with a shortened URL that actually works!
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="animate-fade-in-up animation-delay-600 flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
                    <button className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-purple-500/25 w-full sm:w-auto">
                        <div className="flex items-center justify-center space-x-2 relative z-10">
                            <Home className="w-5 h-5 group-hover:animate-pulse" />
                            <span>Go Home</span>
                        </div>
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300 z-0"></div>
                    </button>

                    <button className="group px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full font-semibold text-lg hover:bg-white/20 transform hover:scale-105 transition-all duration-300 shadow-lg w-full sm:w-auto">
                        <div className="flex items-center justify-center space-x-2">
                            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                            <span>Go Back</span>
                        </div>
                    </button>

                    <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full font-semibold text-lg hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-blue-500/25 w-full sm:w-auto">
                        <div className="flex items-center justify-center space-x-2">
                            <Search className="w-5 h-5 group-hover:animate-bounce" />
                            <span>Search</span>
                        </div>
                    </button>
                </div>

                {/* Helpful Links */}
                <div className="animate-fade-in-up animation-delay-800 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 p-8">
                    <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        What you can do instead:
                    </h3>
                    <div className="grid md:grid-cols-3 gap-6 text-left">
                        <div className="group p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                                <Link className="w-6 h-6" />
                            </div>
                            <h4 className="text-lg font-semibold mb-2 text-white">Create New URL</h4>
                            <p className="text-gray-400 text-sm">Generate a fresh shortened link that works perfectly.</p>
                        </div>

                        <div className="group p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                                <Search className="w-6 h-6" />
                            </div>
                            <h4 className="text-lg font-semibold mb-2 text-white">Search Links</h4>
                            <p className="text-gray-400 text-sm">Find your existing shortened URLs in your dashboard.</p>
                        </div>

                        <div className="group p-4 bg-white/5 backdrop-blur-sm rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                            <div className="bg-gradient-to-r from-pink-500 to-blue-500 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                                <Home className="w-6 h-6" />
                            </div>
                            <h4 className="text-lg font-semibold mb-2 text-white">Visit Homepage</h4>
                            <p className="text-gray-400 text-sm">Go back to the main page and start fresh.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PageNotFound;