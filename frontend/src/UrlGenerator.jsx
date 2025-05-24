import React, { useState } from 'react';
import {
    Link,
    Copy,
    QrCode,
    Settings,
    ChevronDown,
    ChevronUp,
    Calendar,
    Lock,
    RefreshCw,
    Eye,
    EyeOff,
    Check,
    X,
    ExternalLink,
    Download,
    ArrowLeft
} from 'lucide-react';

const UrlGenerator = () => {
    const [formData, setFormData] = useState({
        originalUrl: '',
        customAlias: '',
        aliasType: 'random', // 'random' or 'custom'
        expirationTime: '',
        isPasswordProtected: false,
        password: '',
        isOneTime: false
    });

    const [showAdvanced, setShowAdvanced] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isGenerating, setIsGenerating] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [showQRCode, setShowQRCode] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));

        // Clear error when user starts typing
        if (error) setError('');
    };

    const generateRandomAlias = () => {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let result = '';
        for (let i = 0; i < 6; i++) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return result;
    };

    const generateQRCode = (url) => {
        // Simple QR code placeholder - in real implementation, use a QR library
        return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(url)}`;
    };

    const handleGenerate = async () => {
        // Basic validation
        if (!formData.originalUrl) {
            setError('Please enter a URL to shorten');
            return;
        }

        if (!formData.originalUrl.startsWith('http://') && !formData.originalUrl.startsWith('https://')) {
            setError('Please enter a valid URL starting with http:// or https://');
            return;
        }

        if (formData.aliasType === 'custom' && !formData.customAlias) {
            setError('Please enter a custom alias or choose random');
            return;
        }

        if (formData.isPasswordProtected && !formData.password) {
            setError('Please enter a password for protection');
            return;
        }

        setIsGenerating(true);
        setError('');

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Simulate random success/error for demo
            const isSuccess = Math.random() > 0.3;

            if (isSuccess) {
                const alias = formData.aliasType === 'custom' ? formData.customAlias : generateRandomAlias();
                const shortUrl = `https://slink.io/${alias}`;

                setResult({
                    originalUrl: formData.originalUrl,
                    shortUrl: shortUrl,
                    alias: alias,
                    clicks: 0,
                    createdAt: new Date().toISOString()
                });
            } else {
                // Simulate different error types
                const errorTypes = [
                    'This alias is already taken. Please try another one.',
                    'Something went wrong. Please try again.',
                    'Invalid URL format. Please check your input.'
                ];
                setError(errorTypes[Math.floor(Math.random() * errorTypes.length)]);
            }
        } catch (err) {
            setError('Network error. Please check your connection and try again.');
        } finally {
            setIsGenerating(false);
        }
    };

    const handleCopy = async () => {
        if (result?.shortUrl) {
            try {
                await navigator.clipboard.writeText(result.shortUrl);
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
            } catch (err) {
                // Fallback for older browsers
                console.error('Copy failed:', err);
            }
        }
    };

    const handleReset = () => {
        setFormData({
            originalUrl: '',
            customAlias: '',
            aliasType: 'random',
            expirationTime: '',
            isPasswordProtected: false,
            password: '',
            isOneTime: false
        });
        setResult(null);
        setError('');
        setShowAdvanced(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative">
            

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 animate-fade-in-up space-y-4 sm:space-y-0">
                    <div className="flex items-center space-x-3 sm:space-x-4">
                        <button className="p-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 flex-shrink-0">
                            <ArrowLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                        </button>
                        <div className="min-w-0">
                            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                                Generate Short URL
                            </h1>
                            <p className="text-gray-400 mt-1 text-sm sm:text-base">Create your shortened link with custom options</p>
                        </div>
                    </div>
                    <div className="flex items-center space-x-2 flex-shrink-0">
                        <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-2 rounded-lg">
                            <Link className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <span className="text-lg sm:text-xl font-bold">slink</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 lg:gap-8">
                    {/* Form Section */}
                    <div className="space-y-6 order-1">
                        {/* Main Form */}
                        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 sm:p-6 animate-fade-in-up animation-delay-200">
                            <h2 className="text-lg sm:text-xl font-semibold mb-4 flex items-center space-x-2">
                                <Link className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" />
                                <span>URL Details</span>
                            </h2>

                            {/* Original URL Input */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Enter your long URL
                                </label>
                                <input
                                    type="url"
                                    name="originalUrl"
                                    value={formData.originalUrl}
                                    onChange={handleInputChange}
                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                                    placeholder="https://example.com/very-long-url"
                                    required
                                />
                            </div>

                            {/* Alias Type Selection */}
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Short URL Alias
                                </label>
                                <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-3">
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, aliasType: 'random', customAlias: '' }))}
                                        className={`p-2.5 sm:p-3 rounded-lg border transition-all duration-300 ${formData.aliasType === 'random'
                                                ? 'bg-purple-600/50 border-purple-500 text-white'
                                                : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                                            }`}
                                    >
                                        <RefreshCw className="w-4 h-4 mx-auto mb-1" />
                                        <div className="text-xs sm:text-sm font-medium">Random</div>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setFormData(prev => ({ ...prev, aliasType: 'custom' }))}
                                        className={`p-2.5 sm:p-3 rounded-lg border transition-all duration-300 ${formData.aliasType === 'custom'
                                                ? 'bg-purple-600/50 border-purple-500 text-white'
                                                : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                                            }`}
                                    >
                                        <Settings className="w-4 h-4 mx-auto mb-1" />
                                        <div className="text-xs sm:text-sm font-medium">Custom</div>
                                    </button>
                                </div>

                                {formData.aliasType === 'custom' && (
                                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                                        <span className="text-gray-400 text-sm flex-shrink-0">slink.io/</span>
                                        <input
                                            type="text"
                                            name="customAlias"
                                            value={formData.customAlias}
                                            onChange={handleInputChange}
                                            className="flex-1 px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm"
                                            placeholder="your-custom-alias"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Advanced Options Toggle */}
                            <button
                                type="button"
                                onClick={() => setShowAdvanced(!showAdvanced)}
                                className="flex items-center justify-between w-full p-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all duration-300 mb-4"
                            >
                                <div className="flex items-center space-x-2">
                                    <Settings className="w-4 h-4 flex-shrink-0" />
                                    <span className="font-medium text-sm sm:text-base">Advanced Options</span>
                                </div>
                                {showAdvanced ? <ChevronUp className="w-4 h-4 flex-shrink-0" /> : <ChevronDown className="w-4 h-4 flex-shrink-0" />}
                            </button>

                            {/* Advanced Options */}
                            {showAdvanced && (
                                <div className="space-y-4 animate-slide-down">
                                    {/* Expiration Time */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            <Calendar className="w-4 h-4 inline mr-1" />
                                            Expiration Time
                                        </label>
                                        <select
                                            name="expirationTime"
                                            value={formData.expirationTime}
                                            onChange={handleInputChange}
                                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                                        >
                                            <option value="">Never expires</option>
                                            <option value="1h">1 Hour</option>
                                            <option value="24h">24 Hours</option>
                                            <option value="7d">7 Days</option>
                                            <option value="30d">30 Days</option>
                                            <option value="1y">1 Year</option>
                                        </select>
                                    </div>

                                    {/* Password Protection */}
                                    <div>
                                        <label className="flex items-start sm:items-center space-x-2 mb-2">
                                            <input
                                                type="checkbox"
                                                name="isPasswordProtected"
                                                checked={formData.isPasswordProtected}
                                                onChange={handleInputChange}
                                                className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500 mt-0.5 sm:mt-0 flex-shrink-0"
                                            />
                                            <span className="text-sm font-medium text-gray-300">
                                                <Lock className="w-4 h-4 inline mr-1" />
                                                Password Protection
                                            </span>
                                        </label>
                                        {formData.isPasswordProtected && (
                                            <div className="relative">
                                                <input
                                                    type={showPassword ? "text" : "password"}
                                                    name="password"
                                                    value={formData.password}
                                                    onChange={handleInputChange}
                                                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300 text-sm sm:text-base"
                                                    placeholder="Enter password"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-300"
                                                >
                                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                                </button>
                                            </div>
                                        )}
                                    </div>

                                    {/* One-time URL */}
                                    <div>
                                        <label className="flex items-start sm:items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                name="isOneTime"
                                                checked={formData.isOneTime}
                                                onChange={handleInputChange}
                                                className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-500 mt-0.5 sm:mt-0 flex-shrink-0"
                                            />
                                            <span className="text-sm font-medium text-gray-300">
                                                One-time use URL (expires after first click)
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            )}

                            {/* Error Display */}
                            {error && (
                                <div className="mt-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg flex items-start space-x-2 animate-shake">
                                    <X className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                                    <span className="text-red-300 text-sm">{error}</span>
                                </div>
                            )}

                            {/* Generate Button */}
                            <button
                                onClick={handleGenerate}
                                disabled={isGenerating}
                                className="w-full mt-6 px-4 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white hover:from-purple-700 hover:to-pink-700 transform hover:scale-[1.02] transition-all duration-300 shadow-lg hover:shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm sm:text-base"
                            >
                                {isGenerating ? (
                                    <div className="flex items-center justify-center space-x-2">
                                        <RefreshCw className="w-4 h-4 animate-spin" />
                                        <span>Generating...</span>
                                    </div>
                                ) : (
                                    'Generate Short URL'
                                )}
                            </button>
                        </div>
                    </div>

                    {/* Result Section */}
                    <div className="space-y-6 order-2">
                        {result ? (
                            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 sm:p-6 animate-fade-in-up">
                                <div className="flex items-start sm:items-center justify-between mb-4">
                                    <h2 className="text-lg sm:text-xl font-semibold flex items-start sm:items-center space-x-2">
                                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5 sm:mt-0" />
                                        <span className="leading-tight">URL Generated Successfully!</span>
                                    </h2>
                                </div>

                                {/* Short URL Display */}
                                <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 mb-4">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Your Short URL
                                    </label>
                                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                                        <div className="flex-1 px-3 py-2 bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30 rounded-lg min-w-0">
                                            <a
                                                href={result.shortUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-purple-300 hover:text-purple-200 transition-colors duration-200 break-all text-sm sm:text-base"
                                            >
                                                {result.shortUrl}
                                            </a>
                                        </div>
                                        <button
                                            onClick={handleCopy}
                                            className={`p-2 rounded-lg transition-all duration-300 flex-shrink-0 ${copied
                                                    ? 'bg-green-600 text-white'
                                                    : 'bg-white/10 hover:bg-white/20 text-gray-300'
                                                }`}
                                        >
                                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                        </button>
                                    </div>
                                </div>

                                {/* Original URL */}
                                <div className="bg-white/5 border border-white/10 rounded-xl p-3 sm:p-4 mb-6">
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Original URL
                                    </label>
                                    <div className="text-gray-400 text-sm break-all">
                                        {result.originalUrl}
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3">
                                    <button
                                        onClick={() => setShowQRCode(!showQRCode)}
                                        className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 text-sm"
                                    >
                                        <QrCode className="w-4 h-4 flex-shrink-0" />
                                        <span>QR Code</span>
                                    </button>

                                    <button className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-white/10 border border-white/20 rounded-xl hover:bg-white/20 transition-all duration-300 text-sm">
                                        <ExternalLink className="w-4 h-4 flex-shrink-0" />
                                        <span>Manage URLs</span>
                                    </button>

                                    <button
                                        onClick={handleReset}
                                        className="flex items-center justify-center space-x-2 px-3 sm:px-4 py-2.5 sm:py-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-300 text-sm"
                                    >
                                        <RefreshCw className="w-4 h-4 flex-shrink-0" />
                                        <span>New URL</span>
                                    </button>
                                </div>

                                {/* QR Code Modal */}
                                {showQRCode && (
                                    <div className="mt-6 p-3 sm:p-4 bg-white/5 border border-white/10 rounded-xl animate-fade-in">
                                        <div className="text-center">
                                            <h3 className="text-base sm:text-lg font-semibold mb-4">QR Code</h3>
                                            <div className="bg-white p-2 sm:p-4 rounded-lg inline-block mb-4">
                                                <img
                                                    src={generateQRCode(result.shortUrl)}
                                                    alt="QR Code"
                                                    className="w-32 h-32 sm:w-48 sm:h-48"
                                                />
                                            </div>
                                            <div className="flex flex-col sm:flex-row justify-center space-y-2 sm:space-y-0 sm:space-x-3">
                                                <button className="flex items-center justify-center space-x-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg hover:bg-white/20 transition-all duration-300 text-sm">
                                                    <Download className="w-4 h-4" />
                                                    <span>Download PNG</span>
                                                </button>
                                                <button
                                                    onClick={() => setShowQRCode(false)}
                                                    className="px-4 py-2 bg-red-600/20 border border-red-500/30 rounded-lg hover:bg-red-600/30 transition-all duration-300 text-sm"
                                                >
                                                    Close
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="bg-white/5 backdrop-blur-lg border border-white/10 rounded-2xl p-6 sm:p-8 text-center animate-fade-in-up animation-delay-400">
                                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Link className="w-6 h-6 sm:w-8 sm:h-8" />
                                </div>
                                <h3 className="text-lg sm:text-xl font-semibold mb-2">Ready to Generate</h3>
                                <p className="text-gray-400 text-sm sm:text-base">
                                    Enter your URL details and click generate to create your shortened link
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default UrlGenerator;