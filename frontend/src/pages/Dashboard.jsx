import React, { useState, useEffect } from 'react';
import {
    Link as LinkIcon,
    ArrowLeft,
    Eye,
    Calendar,
    TrendingUp,
    Monitor,
    Smartphone,
    Globe,
    Clock,
    Copy,
    ExternalLink,
    BarChart3,
    Loader2,
    Menu,
    X
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';


const AnalyticsDashboard = () => {
    const [copied, setCopied] = useState(false);
    const [analyticsData, setAnalyticsData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { urlId } = useParams();

    // Helper function to format date in IST
    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: 'Asia/Kolkata'
        });
    };



    // Helper function to format chart date labels in IST
    const formatChartDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            month: 'short',
            day: 'numeric',
            timeZone: 'Asia/Kolkata'
        });
    };

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                setLoading(true);
                const { data } = await axios.get(`/api/analytics/${urlId}`);
                setAnalyticsData(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchAnalytics();
    }, [urlId]);

    const handleCopyUrl = () => {
        navigator.clipboard.writeText(`minli.info/${analyticsData.shortUrl.shortCode}`);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const chartColors = ['#8b5cf6', '#ec4899', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#f97316'];

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
                <div className="text-center">
                    <Loader2 className="w-12 h-12 text-purple-400 animate-spin mx-auto mb-4" />
                    <p className="text-gray-300 text-lg">Loading analytics...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
                <div className="text-center max-w-md">
                    <div className="bg-red-500/20 backdrop-blur-sm rounded-full p-4 mb-4 inline-flex">
                        <ExternalLink className="w-8 h-8 text-red-400" />
                    </div>
                    <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">Error Loading Analytics</h2>
                    <p className="text-gray-300 mb-4 text-sm sm:text-base">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-gradient-to-r cursor-pointer from-purple-600 to-pink-600 rounded-full text-white font-semibold hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
                    >
                        Try Again
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative text-white">
            {/* Fixed Background */}
            <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 -z-10"></div>

            {/* Navigation */}
            <div className="flex flex-row   items-center justify-between mb-4 animate-fade-in-up space-y-0 text-white px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                <div className="flex items-center space-x-3 sm:space-x-4">
                    <Link to="/my-links">
                        <button className="p-2 bg-white/10 cursor-pointer backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 flex-shrink-0">
                            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                    </Link>
                    <div className="min-w-0">
                        <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            URL Analytics Dashboard
                        </h1>
                    </div>
                </div>
                <Link to="/">
                    <div className="flex items-center space-x-2 flex-shrink-0">
                        <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-2 rounded-lg">
                            <LinkIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <span className="text-lg sm:text-2xl font-bold">Minli</span>
                    </div>
                </Link>
            </div>


            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
                {/* Header Section */}
                <div className="mb-6 sm:mb-8">


                    {/* URL and Date Info */}
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-4">
                        <div className="flex items-center justify-between sm:justify-start space-x-2 bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-full px-4 py-3 sm:py-2 border border-white/20">
                            <div className="flex items-center space-x-2 min-w-0 flex-1">
                                <span className="text-gray-300 text-sm sm:text-base whitespace-nowrap">Short URL:</span>
                                <span className="text-white font-mono text-sm sm:text-base truncate">{`minli.info/${analyticsData.shortUrl.shortCode}`}</span>
                            </div>
                            <button
                                onClick={handleCopyUrl}
                                className="p-1 hover:bg-white/20 cursor-pointer rounded transition-colors duration-200 flex-shrink-0"
                            >
                                <Copy className={`w-4 h-4 ${copied ? 'text-green-400' : 'text-gray-400'}`} />
                            </button>
                        </div>

                        <div className="text-gray-400 text-sm sm:text-base bg-white/5 backdrop-blur-sm rounded-xl px-4 py-2 border border-white/10 sm:bg-transparent sm:border-none sm:px-0 sm:py-0">
                            Created: {formatDate(analyticsData.createdAt)} IST
                        </div>
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-6 sm:mb-8">
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-2 sm:p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                <Eye className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <div className="text-right">
                                <p className="text-2xl sm:text-3xl font-bold text-white">{analyticsData.totalClicks.toLocaleString()}</p>
                                <p className="text-gray-400 text-xs sm:text-sm">Total Clicks</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-2 sm:p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                <Calendar className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <div className="text-right">
                                <p className="text-2xl sm:text-3xl font-bold text-white">{analyticsData.todayClicks.toLocaleString()}</p>
                                <p className="text-gray-400 text-xs sm:text-sm">Today's Clicks</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-gradient-to-r from-green-500 to-blue-500 p-2 sm:p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <div className="text-right">
                                <p className="text-2xl sm:text-3xl font-bold text-white">{analyticsData.avgDailyClicks.toLocaleString()}</p>
                                <p className="text-gray-400 text-xs sm:text-sm">Avg Daily Clicks</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 group">
                        <div className="flex items-center justify-between mb-4">
                            <div className="bg-gradient-to-r from-pink-500 to-orange-500 p-2 sm:p-3 rounded-xl group-hover:scale-110 transition-transform duration-300">
                                <Clock className="w-5 h-5 sm:w-6 sm:h-6" />
                            </div>
                            <div className="text-right">
                                <p className="text-2xl sm:text-3xl font-bold text-white">{Math.round((Date.now() - new Date(analyticsData.createdAt)) / (1000 * 60 * 60 * 24))}</p>
                                <p className="text-gray-400 text-xs sm:text-sm">Days Active</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8 mb-6 sm:mb-8">
                    {/* 30 Days Trend */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                        <h3 className="text-lg sm:text-xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Last 30 Days Trend
                        </h3>
                        <div className="h-64 sm:h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={analyticsData.last30Days} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                    <XAxis
                                        dataKey="_id"
                                        stroke="#9CA3AF"
                                        tick={{ fontSize: 11 }}
                                        tickFormatter={(value) => formatChartDate(value)}
                                        interval="preserveStartEnd"
                                    />
                                    <YAxis stroke="#9CA3AF" tick={{ fontSize: 11 }} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'rgba(30, 41, 59, 0.95)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            borderRadius: '12px',
                                            color: 'white',
                                            fontSize: '14px'
                                        }}
                                        labelFormatter={(value) => formatDate(value) + ' IST'}
                                    />
                                    <Line
                                        type="monotone"
                                        dataKey="count"
                                        stroke="#8b5cf6"
                                        strokeWidth={3}
                                        dot={{ fill: '#8b5cf6', strokeWidth: 2, r: 3 }}
                                        activeDot={{ r: 5, stroke: '#8b5cf6', strokeWidth: 2 }}
                                    />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    </div>

                    {/* 24 Hours Trend */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                        <h3 className="text-lg sm:text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                            Last 24 Hours (IST)
                        </h3>
                        <div className="h-64 sm:h-80">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={analyticsData.last24HoursHourly} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                    <XAxis
                                        dataKey="_id.hour"
                                        stroke="#9CA3AF"
                                        tick={{ fontSize: 11 }}
                                        tickFormatter={(value) => {
                                            const istHour = (value + 5.5) % 24;
                                            const hour = Math.floor(istHour);
                                            const minutes = (istHour % 1) * 60;
                                            return minutes === 0 ? `${hour}:00` : `${hour}:${minutes.toFixed(0)}`;
                                        }}
                                        interval="preserveStartEnd"
                                    />
                                    <YAxis stroke="#9CA3AF" tick={{ fontSize: 11 }} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'rgba(30, 41, 59, 0.95)',
                                            border: '1px solid rgba(255, 255, 255, 0.2)',
                                            borderRadius: '12px',
                                            color: 'white',
                                            fontSize: '14px'
                                        }}
                                        labelFormatter={(value) => {
                                            const istHour = (value + 5.5) % 24;
                                            const hour = Math.floor(istHour);
                                            const minutes = (istHour % 1) * 60;
                                            return minutes === 0 ? `${hour}:00 IST` : `${hour}:${minutes.toFixed(0)} IST`;
                                        }}
                                    />
                                    <Bar
                                        dataKey="count"
                                        fill="url(#blueGradient)"
                                        radius={[4, 4, 0, 0]}
                                    />
                                    <defs>
                                        <linearGradient id="blueGradient" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.9} />
                                            <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0.9} />
                                        </linearGradient>
                                    </defs>
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* Device and Browser Analytics */}
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 sm:gap-8">
                    {/* Device Distribution */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                        <h3 className="text-lg sm:text-xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                            Device Distribution
                        </h3>
                        <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
                            <div className="h-48 sm:h-60 w-full max-w-xs">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={analyticsData.deviceWise}
                                            cx="50%"
                                            cy="50%"
                                            outerRadius="80%"
                                            fill="#8884d8"
                                            dataKey="count"
                                            label={({ _id, percent }) => `${_id} ${(percent * 100).toFixed(0)}%`}
                                            labelLine={false}
                                        >
                                            {analyticsData.deviceWise.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={chartColors[index % chartColors.length]} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: 'rgba(30, 41, 59, 0.95)',
                                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                                borderRadius: '12px',
                                                color: 'white',
                                                fontSize: '14px'
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="space-y-4 w-full lg:w-auto">
                                {analyticsData.deviceWise.map((device, index) => (
                                    <div key={device._id} className="flex items-center justify-between lg:justify-start space-x-3 bg-white/5 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                                        <div className="flex items-center space-x-3">
                                            {device._id === 'Mobile' ? (
                                                <Smartphone className="w-5 h-5 text-purple-400" />
                                            ) : (
                                                <Monitor className="w-5 h-5 text-blue-400" />
                                            )}
                                            <div>
                                                <p className="text-white font-semibold text-sm sm:text-base">{device._id}</p>
                                                <p className="text-gray-400 text-xs sm:text-sm">{device.count.toLocaleString()} clicks</p>
                                            </div>
                                        </div>
                                        <div
                                            className="w-3 h-3 rounded-full flex-shrink-0"
                                            style={{ backgroundColor: chartColors[index % chartColors.length] }}
                                        ></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Browser Distribution */}
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 sm:p-6 border border-white/20 hover:bg-white/15 transition-all duration-300">
                        <h3 className="text-lg sm:text-xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-orange-400 bg-clip-text text-transparent">
                            Browser Distribution
                        </h3>
                        <div className="space-y-4">
                            {analyticsData.browserWise.map((browser) => {
                                const percentage = (browser.count / analyticsData.totalClicks) * 100;
                                return (
                                    <div key={browser._id} className="space-y-3 bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:bg-white/10 transition-all duration-300">
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center space-x-3">
                                                <Globe className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                                <span className="text-white font-semibold text-sm sm:text-base truncate">{browser._id}</span>
                                            </div>
                                            <div className="text-right flex-shrink-0">
                                                <span className="text-white font-semibold text-sm sm:text-base">{browser.count.toLocaleString()}</span>
                                                <span className="text-gray-400 text-xs sm:text-sm ml-2">({percentage.toFixed(1)}%)</span>
                                            </div>
                                        </div>
                                        <div className="w-full bg-gray-700 rounded-full h-2">
                                            <div
                                                className="h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-500 ease-out"
                                                style={{ width: `${percentage}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsDashboard;