import React from 'react';
import { QrCode } from 'lucide-react'; // or replace with your QR icon

const QrCodeModal = ({ show, selectedUrl, onClose, onDownload }) => {
  if (!show || !selectedUrl) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/20 backdrop-blur-lg border border-white/20 rounded-2xl p-4 sm:p-6 w-full max-w-md text-center">
        <h3 className="text-xl font-semibold text-white mb-4">QR Code</h3>
        <div className="bg-white rounded-xl p-4 mb-4 inline-block">
          {selectedUrl.qrUrl ? (
            <img
              src={selectedUrl.qrUrl}
              alt="QR Code"
              className="w-40 h-40 sm:w-48 sm:h-48 object-contain"
            />
          ) : (
            <div className="w-40 h-40 sm:w-48 sm:h-48 bg-gray-200 rounded flex items-center justify-center">
              <QrCode className="w-20 h-20 sm:w-24 sm:h-24 text-gray-400" />
            </div>
          )}
        </div>
        <p className="text-gray-400 text-sm mb-4">Scan to access your short URL</p>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all duration-300"
          >
            Close
          </button>
          {selectedUrl.qrUrl && (
            <button
              onClick={() => onDownload(selectedUrl.qrUrl, 'url.png')}
              className="flex-1 px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl text-white hover:from-purple-700 hover:to-pink-700 transition-all duration-300"
            >
              Download
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default QrCodeModal;
