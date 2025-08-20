import { useNavigate } from "react-router-dom";

function ErrorMessage({ text, setError }) {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 animate-scale-in">
        {/* Error Icon */}
        <div className="flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mx-auto mb-6">
          <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
          </svg>
        </div>

        {/* Error Content */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-bold text-neutral-900 mb-2">
            Oops! Something went wrong
          </h2>
          <p className="text-neutral-600">
            {text}
          </p>
        </div>

        {/* Action Button */}
        <button 
          onClick={() => setError(null)}
          className="btn-primary w-full"
        >
          Try Again
        </button>
      </div>
    </div>
  );
}

export default ErrorMessage;