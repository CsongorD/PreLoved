import { useRouteError } from "react-router-dom";
import Footer from "../Components/Footer";

const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-100 flex flex-col">
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="mb-6">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-neutral-800 mb-2">Oops! Something went wrong</h1>
            <p className="text-neutral-600 mb-4">
              We're sorry, but an unexpected error has occurred.
            </p>
          </div>
          
          <div className="bg-neutral-50 rounded-lg p-4 mb-6">
            <p className="text-sm text-neutral-700 font-medium mb-2">Error Details:</p>
            <p className="text-sm text-neutral-600 break-words">
              {error?.statusText || error?.message || "Unknown error"}
            </p>
          </div>

          <div className="space-y-3">
            <button 
              onClick={() => window.location.reload()}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Try Again
            </button>
            <button 
              onClick={() => window.history.back()}
              className="w-full bg-neutral-200 hover:bg-neutral-300 text-neutral-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Go Back
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ErrorPage;