
import { Link, Zap, Loader2 } from 'lucide-react';

const LoadingOverlay = ({ isLoading, message = "Processing..." }) => {
    if (!isLoading) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="bg-gradient-to-br from-slate-900/90 via-purple-900/90 to-slate-900/90 backdrop-blur-md rounded-2xl border border-white/20 p-8 text-center shadow-2xl">
                {/* Animated Minli Logo */}
                <div className="flex items-center justify-center space-x-2 mb-6">
                    <div className="bg-gradient-to-r from-purple-400 to-pink-400 p-3 rounded-lg animate-pulse">
                        <Link className="w-8 h-8 text-white" />
                    </div>
                    <span className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                        Minli
                    </span>
                </div>

                {/* Loading Animation */}
                <div className="relative mb-6">
                    <div className="w-16 h-16 mx-auto">
                        <div className="absolute inset-0 rounded-full border-4 border-purple-500/20"></div>
                        <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-purple-400 border-r-pink-400 animate-spin"></div>
                        <div className="absolute inset-2 rounded-full border-4 border-transparent border-t-pink-400 border-l-blue-400 animate-spin" style={{ animationDirection: 'reverse', animationDuration: '1.5s' }}></div>
                    </div>

                    {/* Pulsing dots */}
                    <div className="flex justify-center space-x-2 mt-4">
                        <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce"></div>
                        <div className="w-3 h-3 bg-pink-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                </div>

                {/* Loading Message */}
                <p className="text-white text-lg font-medium mb-2">{message}</p>
                <p className="text-gray-400 text-sm">Please wait a moment...</p>
            </div>
        </div>
    );
};



{/* <LoadingOverlay isLoading={isLoading} message={loadingMessage} /> */ }
export default LoadingOverlay;