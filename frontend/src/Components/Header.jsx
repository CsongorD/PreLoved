import logo from "../Images/prelovedlogo.png";
import twitterLogo from "../Images/twitter.svg"
import facebookLogo from "../Images/facebook.svg"
import instagramLogo from "../Images/instagram.svg"
import { useNavigate } from "react-router-dom";
import { useClient } from "../Context/ClientContext";

const Header = () => {
  const navigate = useNavigate();
  const { client, login } = useClient();

  const logout = () => {
    localStorage.setItem("Token", "");
    login(null);
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Social Icons */}
          <div className="flex items-center space-x-4">
            <img 
              className="h-10 w-10 cursor-pointer hover:scale-105 transition-transform duration-200" 
              src={logo} 
              alt="PreLoved Logo"
              onClick={() => navigate("/")}
            />
            <div className="hidden sm:flex items-center space-x-3">
              <img className="h-6 w-6 opacity-60 hover:opacity-100 transition-opacity cursor-pointer" src={twitterLogo} alt="Twitter" />
              <img className="h-6 w-6 opacity-60 hover:opacity-100 transition-opacity cursor-pointer" src={facebookLogo} alt="Facebook" />
              <img className="h-6 w-6 opacity-60 hover:opacity-100 transition-opacity cursor-pointer" src={instagramLogo} alt="Instagram" />
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex items-center space-x-3">
            {client && (
              <button 
                className="bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                onClick={() => navigate("/newproduct")}
              >
                Add Product
              </button>
            )}
            {!client ? (
              <button 
                className="bg-accent-600 hover:bg-accent-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                onClick={() => navigate("/landing")}
              >
                Login / Sign up
              </button>
            ) : (
              <button 
                className="bg-neutral-600 hover:bg-neutral-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 shadow-sm hover:shadow-md"
                onClick={() => logout()}
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header;