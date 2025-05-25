import React, {useEffect } from 'react';
import { AlertCircle, CheckCircle, AlertTriangle, Info, X } from 'lucide-react';


const Notification = ({
    messageType = 'error',
    message,
    onClose
}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            if (onClose) onClose();
        }, 3000);

        return () => clearTimeout(timer);
    }, [onClose]);

    const getIcon = () => {
        switch (messageType) {
            case 'success':
                return <CheckCircle className="w-5 h-5 text-white" />;
            case 'warning':
                return <AlertTriangle className="w-5 h-5 text-white" />;
            case 'info':
                return <Info className="w-5 h-5 text-white" />;
            default:
                return <AlertCircle className="w-5 h-5 text-white" />;
        }
    };

    const getBgColor = () => {
        switch (messageType) {
            case 'success':
                return 'bg-green-500/90 border-green-400/30';
            case 'warning':
                return 'bg-yellow-500/90 border-yellow-400/30';
            case 'info':
                return 'bg-blue-500/90 border-blue-400/30';
            default:
                return 'bg-red-500/90 border-red-400/30';
        }
    };

    return (
        <div className="fixed top-4 left-1/2 z-50 animate-slide-down" style={{ transform: 'translateX(-50%)' }}>
            <div className={`${getBgColor()} backdrop-blur-lg border rounded-xl p-4 shadow-2xl max-w-md`}>
                <div className="flex items-start space-x-3">
                    {getIcon()}
                    <div className="flex-1">
                        <p className="text-white text-sm whitespace-pre-line">{message}</p>
                    </div>
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="text-white/70 hover:text-white transition-colors duration-200"
                        >
                            <X className="w-4 h-4" />
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notification