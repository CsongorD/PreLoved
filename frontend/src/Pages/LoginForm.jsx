import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import { useState } from "react";
import Loading from "./Loading/Loading";
import { useClient } from "../Context/ClientContext";
import ErrorMessage from "../Components/ErrorMessage";
import { fetchWithToken } from "../Context/ClientContext";

const LoginForm = () => {
  const { client, login } = useClient();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const loginUser = (user) => {
    return fetchWithToken("POST", "", "/login", user)
      .then(function (res) {
        if (res.status === 404) {
          throw new Error("Username not found!");
        } else if (res.status === 401) {
          throw new Error("Wrong password!");
        } else {
          const token = res.headers.get("Authorization");
          localStorage.setItem("Token", token);
        }
      })
      .catch((error) => {
        throw error;
      });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const userdata = {};

    for (let [key, value] of formData.entries()) {
      userdata[key] = value;
    }
    handleLoginUser(userdata);
  };

  const onCancel = () => {
    navigate("/");
  };

  const handleLoginUser = (user) => {
    setLoading(true);
    loginUser(user)
      .then((data) => {
        login(data);
        navigate("/");
      })
      .catch((error) => {
        console.log(error.message);
        setError(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-primary-200 flex flex-col">
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="max-w-md w-full">
          <div className="card p-8 animate-scale-in">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-display font-bold text-gradient mb-2">
                Welcome Back
              </h1>
              <p className="text-neutral-600">
                Sign in to your PreLoved account
              </p>
            </div>

            {/* Form */}
            <form onSubmit={onSubmit} className="space-y-6">
              <div>
                <label htmlFor="clientName" className="form-label">
                  Username
                </label>
                <input
                  name="clientName"
                  id="clientName"
                  type="text"
                  required
                  className="input-field"
                  placeholder="Enter your username"
                />
              </div>

              <div>
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  name="password"
                  id="password"
                  type="password"
                  required
                  className="input-field"
                  placeholder="Enter your password"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button type="submit" className="btn-primary flex-1">
                  Sign In
                </button>
                <button type="button" onClick={onCancel} className="btn-outline flex-1">
                  Cancel
                </button>
              </div>
            </form>

            {/* Sign Up Link */}
            <div className="text-center mt-6 pt-6 border-t border-primary-200">
              <p className="text-neutral-600">
                Don't have an account?{" "}
                <button
                  onClick={() => navigate("/signup")}
                  className="text-accent-900 font-medium hover:text-accent-800 transition-colors duration-200"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {error && <ErrorMessage text={error} setError={setError} />}
      <Footer />
    </div>
  );
};

export default LoginForm;