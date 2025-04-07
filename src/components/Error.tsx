import { AlertTriangle, RefreshCw } from "lucide-react";

interface ErrorStateProps {
  message: string;
}

const ErrorState: React.FC<ErrorStateProps> = ({ message }) => {
  return (
    <div className="w-full py-16 flex flex-col items-center justify-center">
      <div className="w-16 h-16 bg-red-900/30 rounded-full flex items-center justify-center text-red-500 mb-4">
        <AlertTriangle size={32} />
      </div>
      <h3 className="text-xl font-bold text-red-400">
        Error Loading Skip Data
      </h3>
      <p className="mt-2 text-gray-300 text-center max-w-md">
        {message || "We couldn't load the skip options. Please try again."}
      </p>
      <button
        onClick={() => window.location.reload()}
        className="mt-6 px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-md flex items-center transition-colors duration-200"
      >
        <RefreshCw size={16} className="mr-2" /> Retry
      </button>
    </div>
  );
};

export default ErrorState;
