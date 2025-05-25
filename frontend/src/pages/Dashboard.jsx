import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Link, Eye, Calendar, Clock, TrendingUp, ExternalLink, Copy, BarChart3, Globe, MousePointer } from 'lucide-react';

const Dashboard = () => {
    const [selectedUrl, setSelectedUrl] = useState(0);
    const [timeFrame, setTimeFrame] = useState('daily');
    const [copiedUrl, setCopiedUrl] = useState(null);

    // Mock data for URLs
    const urlData = [
        {
            id: 1,
            originalUrl: 'https://www.example.com/very-long-article-title-about-technology',
            shortUrl: 'slink.ly/abc123',
            title: 'Tech Article',
            totalClicks: 1247,
            todayClicks: 23,
            createdAt: '2024-01-15',
            hourlyData: [
                { hour: '00:00', clicks: 5 }, { hour: '01:00', clicks: 3 }, { hour: '02:00', clicks: 1 },
                // { hour: '03:00', clicks: 2 }, { hour: '04:00', clicks: 4 }, { hour: '05:00', clicks: 8 },
                // { hour: '06:00', clicks: 12 }, { hour: '07:00', clicks: 18 }, { hour: '08:00', clicks: 25 },
                // { hour: '09:00', clicks: 32 }, { hour: '10:00', clicks: 28 }, { hour: '11:00', clicks: 35 },
                // { hour: '12:00', clicks: 42 }, { hour: '13:00', clicks: 38 }, { hour: '14:00', clicks: 45 },
                // { hour: '15:00', clicks: 40 }, { hour: '16:00', clicks: 33 }, { hour: '17:00', clicks: 29 },
                // { hour: '18:00', clicks: 24 }, { hour: '19:00', clicks: 20 }, { hour: '20:00', clicks: 16 },
                // { hour: '21:00', clicks: 12 }, { hour: '22:00', clicks: 8 }, { hour: '23:00', clicks: 6 }
            ],
            dailyData: [
                { date: 'Mon', clicks: 145 }, { date: 'Tue', clicks: 168 }, { date: 'Wed', clicks: 192 },
                { date: 'Thu', clicks: 156 }, { date: 'Fri', clicks: 203 }, { date: 'Sat', clicks: 134 },
                { date: 'Sun', clicks: 118 }
            ],
            weeklyData: [
                { week: 'Week 1', clicks: 856 }, { week: 'Week 2', clicks: 923 },
                { week: 'Week 3', clicks: 1134 }, { week: 'Week 4', clicks: 1047 }
            ],
            monthlyData: [
                { month: 'Jan', clicks: 3456 }, { month: 'Feb', clicks: 2987 }, { month: 'Mar', clicks: 3821 },
                { month: 'Apr', clicks: 4123 }, { month: 'May', clicks: 3654 }
            ],
            referrerData: [
                { name: 'Direct', value: 45, color: '#8B5CF6' },
                { name: 'Google', value: 25, color: '#EC4899' },
                { name: 'Twitter', value: 15, color: '#3B82F6' },
                { name: 'Facebook', value: 10, color: '#10B981' },
                { name: 'Others', value: 5, color: '#F59E0B' }
            ],
            deviceData: [
                { name: 'Desktop', value: 60, color: '#8B5CF6' },
                { name: 'Mobile', value: 35, color: '#EC4899' },
                { name: 'Tablet', value: 5, color: '#3B82F6' }
            ]
        },
        {
            id: 2,
            originalUrl: 'https://github.com/awesome-project/repository-name',
            shortUrl: 'slink.ly/gh456',
            title: 'GitHub Project',
            totalClicks: 892,
            todayClicks: 15,
            createdAt: '2024-01-20',
            hourlyData: [
                { hour: '00:00', clicks: 2 }, { hour: '01:00', clicks: 1 }, { hour: '02:00', clicks: 0 },
                { hour: '03:00', clicks: 1 }, { hour: '04:00', clicks: 3 }, { hour: '05:00', clicks: 5 },
                { hour: '06:00', clicks: 8 }, { hour: '07:00', clicks: 12 }, { hour: '08:00', clicks: 18 },
                { hour: '09:00', clicks: 25 }, { hour: '10:00', clicks: 22 }, { hour: '11:00', clicks: 28 },
                { hour: '12:00', clicks: 32 }, { hour: '13:00', clicks: 30 }, { hour: '14:00', clicks: 35 },
                { hour: '15:00', clicks: 32 }, { hour: '16:00', clicks: 26 }, { hour: '17:00', clicks: 22 },
                { hour: '18:00', clicks: 18 }, { hour: '19:00', clicks: 15 }, { hour: '20:00', clicks: 12 },
                { hour: '21:00', clicks: 9 }, { hour: '22:00', clicks: 6 }, { hour: '23:00', clicks: 4 }
            ],
            dailyData: [
                { date: 'Mon', clicks: 98 }, { date: 'Tue', clicks: 123 }, { date: 'Wed', clicks: 145 },
                { date: 'Thu', clicks: 112 }, { date: 'Fri', clicks: 167 }, { date: 'Sat', clicks: 89 },
                { date: 'Sun', clicks: 76 }
            ],
            weeklyData: [
                { week: 'Week 1', clicks: 612 }, { week: 'Week 2', clicks: 734 },
                { week: 'Week 3', clicks: 845 }, { week: 'Week 4', clicks: 723 }
            ],
            monthlyData: [
                { month: 'Jan', clicks: 2134 }, { month: 'Feb', clicks: 1876 }, { month: 'Mar', clicks: 2456 },
                { month: 'Apr', clicks: 2789 }, { month: 'May', clicks: 2345 }
            ],
            referrerData: [
                { name: 'Direct', value: 35, color: '#8B5CF6' },
                { name: 'Google', value: 30, color: '#EC4899' },
                { name: 'GitHub', value: 20, color: '#3B82F6' },
                { name: 'Reddit', value: 10, color: '#10B981' },
                { name: 'Others', value: 5, color: '#F59E0B' }
            ],
            deviceData: [
                { name: 'Desktop', value: 75, color: '#8B5CF6' },
                { name: 'Mobile', value: 20, color: '#EC4899' },
                { name: 'Tablet', value: 5, color: '#3B82F6' }
            ]
        }
    ];

    const currentUrl = urlData[selectedUrl];

    const getChartData = () => {
        switch (timeFrame) {
            case 'hourly':
                return currentUrl.hourlyData;
            case 'daily':
                return currentUrl.dailyData;
            case 'weekly':
                return currentUrl.weeklyData;
            case 'monthly':
                return currentUrl.monthlyData;
            default:
                return currentUrl.dailyData;
        }
    };

    const getDataKey = () => {
        switch (timeFrame) {
            case 'hourly':
                return 'hour';
            case 'daily':
                return 'date';
            case 'weekly':
                return 'week';
            case 'monthly':
                return 'month';
            default:
                return 'date';
        }
    };

    const copyToClipboard = (url, index) => {
        navigator.clipboard.writeText(url);
        setCopiedUrl(index);
        setTimeout(() => setCopiedUrl(null), 2000);
    };

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-gray-800/90 backdrop-blur-sm border border-purple-500/30 rounded-lg p-3 shadow-xl">
                    <p className="text-white font-medium">{`${label}: ${payload[0].value} clicks`}</p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center space-x-3 mb-4">
                        <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-3 rounded-xl">
                            <BarChart3 className="w-8 h-8 text-white" />
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Analytics Dashboard
                            </h1>
                            <p className="text-gray-400">Track your link performance and engagement</p>
                        </div>
                    </div>
                </div>

                {/* URL Selection */}
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 mb-8">
                    <h2 className="text-xl font-semibold text-white mb-4">Your Links</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        {urlData.map((url, index) => (
                            <div
                                key={url.id}
                                onClick={() => setSelectedUrl(index)}
                                className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                                    selectedUrl === index
                                        ? 'bg-purple-500/20 border-purple-400/50 ring-2 ring-purple-400/30'
                                        : 'bg-white/5 border-white/10 hover:bg-white/8 hover:border-white/20'
                                }`}
                            >
                                <div className="flex items-start justify-between mb-3">
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-white font-medium mb-1">{url.title}</h3>
                                        <p className="text-gray-400 text-sm truncate">{url.originalUrl}</p>
                                    </div>
                                    <div className="flex items-center space-x-2 ml-4">
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                copyToClipboard(url.shortUrl, index);
                                            }}
                                            className="p-2 hover:bg-white/10 rounded-lg transition-colors duration-200"
                                        >
                                            <Copy className={`w-4 h-4 ${copiedUrl === index ? 'text-green-400' : 'text-gray-400'}`} />
                                        </button>
                                        <ExternalLink className="w-4 h-4 text-gray-400" />
                                    </div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <Link className="w-4 h-4 text-purple-400" />
                                        <span className="text-purple-400 font-mono text-sm">{url.shortUrl}</span>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        <div className="text-right">
                                            <p className="text-white font-semibold">{url.totalClicks.toLocaleString()}</p>
                                            <p className="text-gray-400 text-xs">Total Clicks</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-green-400 font-semibold">+{url.todayClicks}</p>
                                            <p className="text-gray-400 text-xs">Today</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm mb-1">Total Clicks</p>
                                <p className="text-2xl font-bold text-white">{currentUrl.totalClicks.toLocaleString()}</p>
                            </div>
                            <div className="bg-purple-500/20 p-3 rounded-lg">
                                <MousePointer className="w-6 h-6 text-purple-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm mb-1">Today's Clicks</p>
                                <p className="text-2xl font-bold text-white">{currentUrl.todayClicks}</p>
                            </div>
                            <div className="bg-green-500/20 p-3 rounded-lg">
                                <TrendingUp className="w-6 h-6 text-green-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm mb-1">Created</p>
                                <p className="text-2xl font-bold text-white">{new Date(currentUrl.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className="bg-blue-500/20 p-3 rounded-lg">
                                <Calendar className="w-6 h-6 text-blue-400" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-400 text-sm mb-1">Avg. Daily</p>
                                <p className="text-2xl font-bold text-white">
                                    {Math.round(currentUrl.dailyData.reduce((sum, day) => sum + day.clicks, 0) / currentUrl.dailyData.length)}
                                </p>
                            </div>
                            <div className="bg-pink-500/20 p-3 rounded-lg">
                                <BarChart3 className="w-6 h-6 text-pink-400" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main Chart */}
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6 mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                        <h2 className="text-xl font-semibold text-white mb-4 sm:mb-0">Click Analytics</h2>
                        <div className="flex flex-wrap gap-2">
                            {['hourly', 'daily', 'weekly', 'monthly'].map((frame) => (
                                <button
                                    key={frame}
                                    onClick={() => setTimeFrame(frame)}
                                    className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                                        timeFrame === frame
                                            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white'
                                            : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                                    }`}
                                >
                                    {frame.charAt(0).toUpperCase() + frame.slice(1)}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={getChartData()}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                                <XAxis 
                                    dataKey={getDataKey()} 
                                    stroke="#9CA3AF"
                                    fontSize={12}
                                />
                                <YAxis stroke="#9CA3AF" fontSize={12} />
                                <Tooltip content={<CustomTooltip />} />
                                <Bar 
                                    dataKey="clicks" 
                                    fill="url(#colorGradient)"
                                    radius={[4, 4, 0, 0]}
                                />
                                <defs>
                                    <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#8B5CF6" />
                                        <stop offset="100%" stopColor="#EC4899" />
                                    </linearGradient>
                                </defs>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Additional Analytics */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Referrer Sources */}
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                        <h3 className="text-xl font-semibold text-white mb-6">Traffic Sources</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={currentUrl.referrerData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {currentUrl.referrerData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 space-y-2">
                            {currentUrl.referrerData.map((item, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                        <span className="text-gray-300">{item.name}</span>
                                    </div>
                                    <span className="text-white font-medium">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Device Analytics */}
                    <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-6">
                        <h3 className="text-xl font-semibold text-white mb-6">Device Types</h3>
                        <div className="h-64">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={currentUrl.deviceData}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={100}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {currentUrl.deviceData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip content={<CustomTooltip />} />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="mt-4 space-y-2">
                            {currentUrl.deviceData.map((item, index) => (
                                <div key={index} className="flex items-center justify-between">
                                    <div className="flex items-center space-x-2">
                                        <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                                        <span className="text-gray-300">{item.name}</span>
                                    </div>
                                    <span className="text-white font-medium">{item.value}%</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;