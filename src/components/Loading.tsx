const LoadingState: React.FC = () => {
  return (
    <div className="w-full py-16 flex flex-col items-center justify-center">
      <div className="relative w-20 h-20">
        <div className="absolute inset-0 border-t-4 border-blue-600 border-solid rounded-full animate-spin"></div>
        <div className="absolute inset-3 border-t-4 border-blue-400 border-solid rounded-full animate-spin-slow"></div>
      </div>
      <h3 className="mt-6 text-xl font-bold">Loading Skip Data...</h3>
      <p className="mt-2 text-gray-400 text-center max-w-md">
        We're finding the best skip options for your location. This should only
        take a moment.
      </p>
    </div>
  );
};

export default LoadingState;
