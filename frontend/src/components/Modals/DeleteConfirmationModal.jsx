import { AlertTriangle } from "lucide-react";

const DeleteConfirmationModal = ({ onCancel, onConfirm }) => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl p-4 sm:p-6 w-full max-w-md">
        <div className="flex items-center space-x-3 mb-4">
          <div className="bg-red-500/20 rounded-full p-2">
            <AlertTriangle className="w-6 h-6 text-red-400" />
          </div>
          <h3 className="text-xl font-semibold text-white">Delete URL</h3>
        </div>
        <p className="text-gray-300 mb-6">Are you sure you want to delete this URL? This action is permanent.</p>
        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <button
            onClick={onCancel}
            className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white hover:bg-white/10 transition-all duration-300"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 rounded-xl text-white transition-all duration-300"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
  export default DeleteConfirmationModal