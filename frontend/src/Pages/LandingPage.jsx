import logo from "../Images/prelovedlogo.png";
import { Link } from "react-router-dom";
import Footer from "../Components/Footer.jsx"

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-100 flex items-center justify-center p-4">
      <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-12 max-w-md w-full text-center animate-fade-in">
        <div className="space-y-8">
          <div className="animate-scale-in">
            <img src={logo} alt="PreLoved Logo" className="w-24 h-24 mx-auto mb-6 hover:scale-105 transition-transform duration-300" />
            <h1 className="text-3xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent mb-2">
              Welcome to PreLoved!
            </h1>
            <p className="text-neutral-600">Discover treasures, share stories</p>
          </div>
          
          <div className="space-y-4 animate-slide-up">
            <Link to="/signup" className="block">
              <button className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 transform">
                Sign Up
              </button>
            </Link>
            <Link to="/login" className="block">
              <button className="w-full bg-accent-600 hover:bg-accent-700 text-white py-3 px-6 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl hover:scale-105 transform">
                Login
              </button>
            </Link>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LandingPage;