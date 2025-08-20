import logo from "../Images/prelovedlogo.png";
import { useNavigate } from "react-router-dom";
import { useClient } from "../Context/ClientContext";

const Header = () => {
  const navigate = useNavigate();
  const { client, login } = useClient();

  const logout = () => {
    localStorage.setItem("Token", "");
    login(null);
  };

  return (
    <header className="sticky top-0 z-50 glass border-b border-primary-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center space-x-4 cursor-pointer" onClick={() => navigate("/")}>
            <img 
              className="h-10 w-10 rounded-full shadow-sm hover:shadow-md transition-shadow duration-200" 
              src={logo} 
              alt="PreLoved Logo"
            />
            <span className="text-xl font-display font-bold text-gradient hidden sm:block">
              PreLoved
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => navigate("/")}
              className="text-neutral-600 hover:text-accent-900 transition-colors duration-200 font-medium"
            >
              Browse
            </button>
            <button 
              onClick={() => navigate("/about")}
              className="text-neutral-600 hover:text-accent-900 transition-colors duration-200 font-medium"
            >
              About
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center space-x-3">
            {client ? (
              <>
                <button 
                  onClick={() => navigate("/newproduct")}
                  className="btn-secondary text-sm px-4 py-2"
                >
                  <svg className="w-4 h-4 mr-2 inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Sell Item
                </button>
                <button 
                  onClick={logout}
                  className="btn-outline text-sm px-4 py-2"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <button 
                onClick={() => navigate("/landing")}
                className="btn-primary text-sm px-4 py-2"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;