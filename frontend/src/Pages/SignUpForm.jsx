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

const SignUpForm = (user) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState();

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

  if(loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md animate-slide-up">
            <form onSubmit={onSubmit} className="space-y-6">
                <div className="text-center mb-8">
                    <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                        Join PreLoved
                    </h1>
                    <p className="text-neutral-600 mt-2">Create your account to get started</p>
                </div>

                <input type="hidden" name="_id" defaultValue={user._id} />

                <div className="space-y-4">
                    <div className="relative">
                        <input
                            name="clientName"
                            id="clientName"
                            type="text"
                            required
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
                    >
                        Sign Up
                    </button>
                    <button 
                        className="flex-1 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 py-3 px-6 rounded-lg font-medium transition-colors duration-200" 
                        type="button" 
                        onClick={onCancel}
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

export default SignUpForm;