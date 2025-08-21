import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createNewUser } from '../services/auth.js';
import Loading from '../components/common/Loading/Loading.jsx';
import Footer from '../components/layout/Footer/Footer.jsx';

/**
 * Sign up page component
 */
const SignUpPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    clientName: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createNewUser(formData);
      navigate('/');
    } catch (err) {
      console.error('Registration failed:', err);
      // You might want to add error handling here
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate('/');
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md animate-slide-up">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
              Join PreLoved
            </h1>
            <p className="text-neutral-600 mt-2">Create your account to get started</p>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <input
                name="clientName"
                id="clientName"
                type="text"
                required
                value={formData.clientName}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 peer placeholder-transparent"
                placeholder="Username"
              />
              <label 
                htmlFor="clientName"
                className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-medium text-neutral-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary-600"
              >
                Username
              </label>
            </div>

            <div className="relative">
              <input
                name="password"
                id="password"
                type="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-200 peer placeholder-transparent"
                placeholder="Password"
              />
              <label 
                htmlFor="password"
                className="absolute left-4 -top-2.5 bg-white px-2 text-sm font-medium text-neutral-600 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-400 peer-placeholder-shown:top-3 peer-focus:-top-2.5 peer-focus:text-sm peer-focus:text-primary-600"
              >
                Password
              </label>
            </div>
          </div>

          <div className="flex space-x-4 pt-4">
            <button 
              className="flex-1 bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-lg font-medium transition-colors duration-200 shadow-sm hover:shadow-md" 
              type="submit"
              disabled={loading}
            >
              Sign Up
            </button>
            <button 
              className="flex-1 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 py-3 px-6 rounded-lg font-medium transition-colors duration-200" 
              type="button" 
              onClick={handleCancel}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default SignUpPage;