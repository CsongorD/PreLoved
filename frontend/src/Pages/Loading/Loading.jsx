const Loading = () => (
  <div className="min-h-screen bg-primary-50 flex items-center justify-center">
    <div className="text-center">
      {/* Spinner */}
      <div className="relative w-16 h-16 mx-auto mb-6">
        <div className="absolute inset-0 border-4 border-primary-200 rounded-full"></div>
        <div className="absolute inset-0 border-4 border-accent-900 rounded-full border-t-transparent animate-spin"></div>
      </div>
      
      {/* Loading Text */}
      <p className="text-neutral-600 font-medium">Loading...</p>
    </div>
  </div>
);

export default Loading;