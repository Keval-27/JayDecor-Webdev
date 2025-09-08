import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

const LoginPage = () => {
  const navigate = useNavigate();
  const { login } = useAuth(); // 👈 use context login

  // For Google login
  const loginwithgoogle = () => {
    window.open("http://localhost:3000/auth/google/callback", "_self");
  };

  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};
    if (!formData.identifier.trim()) newErrors.identifier = "Email or Username is required.";
    if (!formData.password) {
      newErrors.password = "Password is required.";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters long.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

const handleLogin = async (e) => {
  e.preventDefault();
  if (validateForm()) {
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        identifier: formData.identifier,
        password: formData.password,
      });

      const { user, token } = res.data;

      // Save to context
      login({
        _id: user.id,
        username: user.username,
        displayName: user.username, // Use username as displayName
        email: user.email,
        role: user.role
        // image will be set by the context
      }, token);

      // Redirect based on role
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (err) {
      setErrors({ form: err.response?.data?.message || "Login failed" });
    }
  }
};

  return (
    <div
      className="flex items-center justify-center min-h-screen p-5 bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://source.unsplash.com/random/1600x900/?technology')",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-2xl w-full max-w-md relative">
        <h1 className="text-2xl font-extrabold mb-6 text-center text-gray-800">
          Login
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email or Username:
            </label>
            <input
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleInputChange}
              className={`w-full p-3 border rounded-md ${
                errors.identifier ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your Email or Username"
            />
            {errors.identifier && <p className="text-red-500 text-sm mt-1">{errors.identifier}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password:
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full p-3 border rounded-md ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>

          {errors.form && <p className="text-red-500 text-center mb-2">{errors.form}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-md font-semibold hover:opacity-90 transition"
          >
            Login
          </button>

          <button
            type="button"
            onClick={loginwithgoogle}
            className="flex items-center w-full justify-center gap-2 px-6 py-2 border border-gray-300 rounded-lg shadow-sm bg-white text-gray-700 hover:bg-gray-100 transition duration-200"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span className="text-sm font-medium">Sign in with Google</span>
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?
            <Link
              to="/SignupPage"
              className="text-blue-500 font-medium hover:underline ml-1"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
