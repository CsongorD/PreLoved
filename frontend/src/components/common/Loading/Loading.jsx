/**
 * Loading spinner component
 */
const Loading = () => (
  <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-100 flex items-center justify-center">
    <div className="text-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto"></div>
        <div className="w-12 h-12 border-4 border-accent-200 border-t-accent-600 rounded-full animate-spin absolute top-2 left-1/2 transform -translate-x-1/2 animate-pulse"></div>
      </div>
      <p className="mt-4 text-neutral-600 font-medium animate-pulse">Loading...</p>
    </div>
  </div>
);

export default Loading;