import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext"; // Import useAuth
import axios from "axios";




const SignupPage = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState(""); // For error messages

  const { registerUser } = useAuth(); // Destructure registerUser from context

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const validateForm = () => {
    let validationErrors = {};
    if (!formData.username) {
      validationErrors.username = "Username is required";
    }
    if (!formData.email) {
      validationErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      validationErrors.email = "Invalid email format";
    }
    if (!formData.password) {
      validationErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      validationErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Handle signup with Firebase Authentication
  const handleSignup = async (e) => {
  e.preventDefault();

  if (validateForm()) {
    try {
      const response = await axios.post("http://localhost:3000/api/auth/signup", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      setMessage("Registration successful!");
      alert("User registered successfully");

      navigate("/LoginPage");
    } catch (error) {
      const errorMsg = error.response?.data?.message || "Registration failed";
      setMessage(errorMsg);
    }
  }
};

  return (
    <div
      className="flex items-center p-5 justify-center min-h-screen bg-cover bg-center"
      style={{
        backgroundImage: "url('https://source.unsplash.com/random/1600x900/?nature')",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-2xl w-full max-w-md relative">
        <h1 className="md:text-2xl text-xl font-extrabold mb-6 text-center text-gray-800">
          Sign Up
        </h1>
        {message && (
          <p className="text-red-500 text-xs text-center">{message}</p>
        )}
        <form onSubmit={handleSignup} className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Username:</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className={`w-full md:p-3 p-2 md:text-lg text-xs border ${
                errors.username ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Enter your username"
            />
            {errors.username && (
              <p className="text-red-500 text-xs mt-1">{errors.username}</p>
            )}
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full md:p-3 p-2 md:text-lg text-xs border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Password:</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full md:p-3 p-2 md:text-lg text-xs border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">Confirm Password:</label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`w-full md:p-3 p-2 md:text-lg text-xs border ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>
            )}
          </div>
          <button
            type="submit"
            className="w-full md:text-base text-sm bg-gradient-to-r from-blue-500 to-purple-500 text-white md:py-3 py-2 rounded-md font-semibold hover:opacity-90 transition"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Already have an account?
            <Link
              to="/LoginPage"
              className="text-blue-500 font-medium hover:underline ml-1"
            >
              Log In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
