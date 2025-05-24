import React, { useState } from 'react';
import { Link, Mail, Lock, User, Eye, EyeOff, ArrowRight, Github } from 'lucide-react';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Form submitted:', formData);
    };

    const toggleMode = () => {
        setIsLogin(!isLogin);
        setFormData({
            name: '',
            email: '',
            password: '',
            confirmPassword: ''
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative">
            {/* Fixed Background Gradient Overlay */}
            <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 -z-10"></div>

            {/* Animated Background Elements */}
            <div className="fixed inset-0 overflow-hidden -z-10">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-2000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse animation-delay-4000"></div>
                {/* Additional gradient orbs for better coverage */}
                <div className="absolute top-20 left-20 w-60 h-60 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse animation-delay-1000"></div>
                <div className="absolute bottom-20 right-20 w-60 h-60 bg-violet-500 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse animation-delay-3000"></div>
            </div>

            {/* Main Content Container */}
            <div className="flex items-center justify-center min-h-screen p-4 py-8">
                <div className="relative z-10 w-full max-w-md">
                    {/* Logo */}
                    <div className="text-center mb-8 animate-fade-in-up">
                        <div className="flex items-center justify-center space-x-2 mb-4">
                            <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-3 rounded-xl">
                                <Link className="w-8 h-8 text-white" />
                            </div>
                            <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Slink
                            </span>
                        </div>
                        <p className="text-gray-400">
                            {isLogin ? 'Welcome back! Sign in to your account' : 'Create your account and start shortening'}
                        </p>
                    </div>

                    {/* Auth Form */}
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-8 shadow-2xl animate-fade-in-up animation-delay-200">
                        <div className="mb-6">
                            <h2 className="text-2xl font-bold text-white mb-2">
                                {isLogin ? 'Sign In' : 'Create Account'}
                            </h2>
                            <p className="text-gray-400 text-sm">
                                {isLogin ? 'Enter your credentials to access your dashboard' : 'Fill in your details to get started'}
                            </p>
                        </div>

                        <div className="space-y-4">
                            {/* Name Field (Register only) */}
                            {!isLogin && (
                                <div className="transform transition-all duration-300 animate-slide-in">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Full Name
                                    </label>
                                    <div className="relative">
                                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                            placeholder="Enter your full name"
                                            required={!isLogin}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Email Field */}
                            <div className="animate-fade-in-up animation-delay-300">
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Enter your email"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password Field */}
                            <div className="animate-fade-in-up animation-delay-400">
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Enter your password"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors duration-200"
                                    >
                                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password Field (Register only) */}
                            {!isLogin && (
                                <div className="transform transition-all duration-300 animate-slide-in">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            name="confirmPassword"
                                            value={formData.confirmPassword}
                                            onChange={handleInputChange}
                                            className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                                            placeholder="Confirm your password"
                                            required={!isLogin}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors duration-200"
                                        >
                                            {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                        </button>
                                    </div>
                                </div>
                            )}



                            {/* Submit Button */}
                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="group w-full mt-6 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white hover:from-purple-700 hover:to-pink-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-purple-500/25 animate-fade-in-up animation-delay-600"
                            >
                                <div className="flex items-center justify-center space-x-2">
                                    <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
                                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                                </div>
                            </button>
                        </div>

                        {/* Divider */}
                        {/* <div className="my-6 flex items-center animate-fade-in-up animation-delay-700">
                            <div className="flex-1 border-t border-white/10"></div>
                            <span className="px-4 text-sm text-gray-400">or</span>
                            <div className="flex-1 border-t border-white/10"></div>
                        </div> */}

                        {/* Social Login */}
                        {/* <button className="w-full px-6 py-3 bg-white/5 border border-white/10 rounded-xl font-medium text-white hover:bg-white/10 transition-all duration-300 mb-6 animate-fade-in-up animation-delay-800">
                            <div className="flex items-center justify-center space-x-2">
                                <Github className="w-5 h-5" />
                                <span>Continue with GitHub</span>
                            </div>
                        </button> */}

                        {/* Toggle Auth Mode */}
                        <div className="text-center animate-fade-in-up animation-delay-900 mt-5">
                            <p className="text-gray-400 text-sm">
                                {isLogin ? "Don't have an account?" : "Already have an account?"}
                                <button
                                    type="button"
                                    onClick={toggleMode}
                                    className="ml-2 text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200"
                                >
                                    {isLogin ? 'Sign Up' : 'Sign In'}
                                </button>
                            </p>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="text-center mt-8 animate-fade-in-up animation-delay-1000">
                        <p className="text-gray-500 text-sm">
                            By continuing, you agree to our{' '}
                            <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors duration-200">
                                Terms of Service
                            </a>{' '}
                            and{' '}
                            <a href="#" className="text-purple-400 hover:text-purple-300 transition-colors duration-200">
                                Privacy Policy
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;