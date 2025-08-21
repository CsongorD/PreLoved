import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import { useState } from "react";
import Loading from "./Loading/Loading";
import { useClient } from "../Context/ClientContext";
import ErrorMessage from "../Components/ErrorMessage";
import { fetchWithToken } from "../Context/ClientContext";

const LoginForm = () => {
    const { client, login } = useClient();
    const [loading, setLoading] = useState();
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const loginUser = (user) => {
        return fetchWithToken("POST", "", "/login", user)
            .then(function (res) {
                if (res.status === 404) {
                    throw new Error("Username not found!");
                } else if(res.status === 401){
                    throw new Error("Wrong password!");
                }
                else {
                    const token = res.headers.get("Authorization");
                    localStorage.setItem("Token", token);
                }
            })
            .catch ((error) => {
                throw error;
            });
    }

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
        navigate("/")
    };

    const handleLoginUser = (user) => {
        setLoading(true);
        loginUser(user)
            .then((data) => {
                login(data)
                navigate("/");
            })
            .catch((error) => {
                console.log(error.message);
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }

    if (loading) {
        return <Loading/>
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 to-accent-100 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md animate-slide-up">
                <form onSubmit={onSubmit} className="space-y-6">
                    <div className="text-center mb-8">
                        <h1 className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-accent-600 bg-clip-text text-transparent">
                            Welcome Back
                        </h1>
                        <p className="text-neutral-600 mt-2">Sign in to your account</p>
                    </div>

                    <div className="space-y-4">
                        <div className="relative">
                            <input
                                name="clientName"
                                id="clientName"
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
                            Login
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
            {error && <ErrorMessage text={error} setError={setError} />}
            <Footer/>
        </div>
    );
};

export default LoginForm;