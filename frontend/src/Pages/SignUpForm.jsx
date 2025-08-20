import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import { useState } from "react";
import Loading from "./Loading/Loading";

const createNewUser = (user) => {
  return fetch("/clients", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });
};

const SignUpForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const user = {};

    for (let [key, value] of formData.entries()) {
      user[key] = value;
    }
    handleCreateNewUser(user);
  };

  const handleCreateNewUser = (user) => {
    setLoading(true);
    createNewUser(user)
      .then(() => {
        navigate("/");
      })
      .catch((err) => {
        throw err;
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onCancel = () => {
    navigate("/");
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
                Join PreLoved
              </h1>
              <p className="text-neutral-600">
                Create your account and start discovering amazing finds
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
                  placeholder="Choose a unique username"
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
                  placeholder="Create a secure password"
                />
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button type="submit" className="btn-primary flex-1">
                  Create Account
                </button>
                <button type="button" onClick={onCancel} className="btn-outline flex-1">
                  Cancel
                </button>
              </div>
            </form>

            {/* Sign In Link */}
            <div className="text-center mt-6 pt-6 border-t border-primary-200">
              <p className="text-neutral-600">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/login")}
                  className="text-accent-900 font-medium hover:text-accent-800 transition-colors duration-200"
                >
                  Sign in
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUpForm;