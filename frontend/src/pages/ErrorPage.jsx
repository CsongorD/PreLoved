import { useRouteError } from 'react-router-dom';
import Footer from '../components/layout/Footer/Footer.jsx';

/**
 * Error page component for handling route errors
 */
const ErrorPage = () => {
  const error = useRouteError();
  console.error(error);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 to-accent-100">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-8 max-w-md w-full mx-4 text-center animate-fade-in">
        <div className="mb-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-neutral-800 mb-2">Oops!</h1>
          <p className="text-neutral-600 mb-4">Sorry, an unexpected error has occurred.</p>
          <p className="text-sm text-neutral-500 italic">
            {error.statusText || error.message}
          </p>
        </div>
        <button 
          onClick={() => window.location.href = '/'}
          className="bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-lg transition-colors duration-200"
        >
          Go Home
        </button>
      </div>
      <Footer />
    </div>
  );
};

export default ErrorPage;