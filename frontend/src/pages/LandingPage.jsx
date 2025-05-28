import axios from 'axios';
import { Link as LinkIcon, ExternalLink, BarChart3, Zap, Shield, Globe,Settings,QrCode,Lock,Clock,Eye } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from "react-router-dom"
import { addUserData, setLogin } from '../redux/userSlice';
import { USERS_URL } from '../utils/constants';
import { useState } from 'react';
import Notification from '../components/Notification';
const LandingPage = () => {
    const dispatch = useDispatch();
    const isLoggedIn = useSelector(store => store.user.isLoggedIn);
    const navigate = useNavigate()
    const [errorMessage, setErrorMessage] = useState('')

    const handleLogout = async () => {
        try {
            await axios.post(`${USERS_URL}/logout`, {}, { withCredentials: true })
            dispatch(setLogin(false))
            dispatch(addUserData(null))
        }
        catch (err) {
            setErrorMessage(err.response?.data?.message || err.message);
        }
    }
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative text-white overflow-hidden">
            {/* Animated background elements */}
            <div className="fixed inset-0 -z-10">
                <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-pink-500/10 rounded-full blur-3xl animate-pulse animation-delay-1000"></div>
                <div className="absolute top-1/2 left-3/4 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
            </div>

            {/* Error notification placeholder */}
            {errorMessage && (
                <div className="fixed top-4 right-4 z-50 bg-red-500/20 border border-red-500/50 text-red-100 px-4 py-2 rounded-lg backdrop-blur-sm">
                    {errorMessage}
                </div>
            )}

            {/* Navigation */}
            <nav className="relative z-10 px-6 py-4 backdrop-blur-sm bg-white/5 border-b border-white/10">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-3">
                        <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-2 rounded-xl shadow-lg">
                            <LinkIcon className="w-6 h-6" />
                        </div>
                        <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Minli
                        </span>
                    </div>
                    <div className="hidden md:flex space-x-8 items-center">
                        <Link to="/contact" className="hover:text-purple-300 transition-all duration-300 hover:scale-105">
                            Contact Us
                        </Link>
                        <button
                            onClick={isLoggedIn ? handleLogout : () => {navigate("/login")}}
                            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full cursor-pointer  hover:from-purple-700 hover:to-pink-700 transition-all duration-300 hover:scale-105 shadow-lg"
                        >
                            {isLoggedIn ? "Logout" : "Login"}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
                <div className="text-center">
                    {/* Hero Section */}
                    <div className="mb-16 animate-fade-in-up">
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent leading-tight">
                            Shrink. Share. Shine
                        </h1>
                        <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-3xl mx-auto">
                            Transform your long URLs into smart, customizable links
                        </p>
                        <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
                            Create shortened URLs with custom domains, password protection, expiry dates, and detailed analytics.
                        </p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-20 animate-fade-in-up animation-delay-200">
                        <Link to="/generate" className="w-full sm:w-auto">
                            <button className="group relative px-10 py-4 bg-gradient-to-r cursor-pointer from-purple-600 to-pink-600 rounded-full font-semibold text-lg hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-xl hover:shadow-purple-500/25 w-full">
                                <div className="flex items-center justify-center space-x-3 relative z-10">
                                    <Zap className="w-5 h-5 group-hover:animate-pulse" />
                                    <span>Generate URL</span>
                                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                                </div>
                            </button>
                        </Link>

                        <Link to="/manage" className="w-full sm:w-auto">
                            <button className="group px-10 py-4 cursor-pointer bg-white/10 backdrop-blur-sm border border-white/20 rounded-full font-semibold text-lg hover:bg-white/20 transform hover:scale-105 transition-all duration-300 shadow-xl w-full">
                                <div className="flex items-center justify-center space-x-3">
                                    <Settings className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                                    <span>Manage URLs</span>
                                </div>
                            </button>
                        </Link>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 animate-fade-in-up animation-delay-400">
                        <div className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl">
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:animate-pulse">
                                <Globe className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Custom Domains</h3>
                            <p className="text-gray-400 text-sm">Use random or custom domains for your shortened URLs</p>
                        </div>

                        <div className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:animate-pulse">
                                <Clock className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Expiry Control</h3>
                            <p className="text-gray-400 text-sm">Set custom expiry dates and create one-time use URLs</p>
                        </div>

                        <div className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl">
                            <div className="bg-gradient-to-r from-pink-500 to-blue-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:animate-pulse">
                                <Lock className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Password Protection</h3>
                            <p className="text-gray-400 text-sm">Secure your links with password protection</p>
                        </div>

                        <div className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl">
                            <div className="bg-gradient-to-r from-green-500 to-teal-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:animate-pulse">
                                <QrCode className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">QR Codes</h3>
                            <p className="text-gray-400 text-sm">Generate QR codes for easy mobile sharing</p>
                        </div>
                    </div>

                    {/* Additional Features */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 animate-fade-in-up animation-delay-600">
                        <div className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl">
                            <div className="bg-gradient-to-r from-orange-500 to-red-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:animate-pulse">
                                <Eye className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">URL Control</h3>
                            <p className="text-gray-400 text-sm">Enable/disable URLs and edit original destinations</p>
                        </div>

                        <div className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl">
                            <div className="bg-gradient-to-r from-cyan-500 to-blue-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:animate-pulse">
                                <BarChart3 className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Click Analytics</h3>
                            <p className="text-gray-400 text-sm">Monitor your URL performance with click tracking</p>
                        </div>

                        <div className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl">
                            <div className="bg-gradient-to-r from-indigo-500 to-purple-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:animate-pulse">
                                <Zap className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Quick Generation</h3>
                            <p className="text-gray-400 text-sm">Fast URL shortening with instant link creation</p>
                        </div>

                        <div className="group p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300 hover:transform hover:scale-105 hover:shadow-xl">
                            <div className="bg-gradient-to-r from-violet-500 to-pink-500 w-14 h-14 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:animate-pulse">
                                <Settings className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold mb-3">Easy Management</h3>
                            <p className="text-gray-400 text-sm">Organize and manage all your shortened URLs</p>
                        </div>
                    </div>

                    {/* Call to Action */}
                    <div className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 backdrop-blur-sm rounded-3xl border border-white/10 p-8 animate-fade-in-up animation-delay-800">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Ready to get started?
                        </h2>
                        <p className="text-gray-300 mb-6 text-lg">
                            Create your first shortened URL and explore all the powerful features.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link to="/generate">
                                <button className="px-8 py-3 bg-gradient-to-r cursor-pointer from-purple-600 to-pink-600 rounded-full font-semibold hover:from-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-300 shadow-lg">
                                    Start Shortening
                                </button>
                            </Link>
                            <Link to="/contact">
                                <button className="px-8 py-3 border cursor-pointer border-white/20 rounded-full font-semibold hover:bg-white/10 transition-all duration-300">
                                    Contact Support
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;












