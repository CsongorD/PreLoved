import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth.js';
import logo from '../../../assets/images/prelovedlogo.png';

/**
 * Main header component with navigation and authentication controls
 */
const Header = () => {
  const navigate = useNavigate();
  const { client, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-xl border-b border-neutral-200/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center">
            <img 
              className="h-12 w-12 cursor-pointer hover:scale-110 transition-all duration-300 hover:rotate-3 drop-shadow-sm" 
              src={logo} 
              alt="PreLoved Logo"
              onClick={() => navigate('/')}
            />
            <div className="ml-4 hidden sm:block">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 via-accent-600 to-primary-700 bg-clip-text text-transparent">
                PreLoved
              </h1>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-4">
            {client && (
              <button 
                className="bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
                onClick={() => navigate('/newproduct')}
              >
                <span className="flex items-center space-x-2">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span>
                Add Product
                  </span>
                </span>
              </button>
            )}
            {!client ? (
              <button 
                className="bg-gradient-to-r from-accent-600 to-accent-700 hover:from-accent-700 hover:to-accent-800 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
                onClick={() => navigate('/landing')}
              >
                Login / Sign up
              </button>
            ) : (
              <button 
                className="bg-gradient-to-r from-neutral-600 to-neutral-700 hover:from-neutral-700 hover:to-neutral-800 text-white px-6 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 transform"
                onClick={handleLogout}
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;