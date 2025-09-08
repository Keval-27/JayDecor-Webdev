import React, { useState } from "react";
import { useCreateConsultantMessageMutation } from "../Redux/Features/ConsultantForm/consultantsApi";

const Consultants = () => {
  const [formData, setFormData] = useState({
    propertyType: "",
    name: "",
    email: "",
    phone: "",
    location: "",
    whatsappUpdates: false,
  });

  const [error, setError] = useState("");
  const [createConsultantMessage] = useCreateConsultantMessageMutation();

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };
  const validateForm = () => {
  const { propertyType, name, email, phone, location } = formData;

  if (!propertyType || !name || !email || !phone || !location) {
    return "All fields are required.";
  }

  // Basic email format check
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }

  // Phone number validation (digits only and 10-15 length)
  const phoneRegex = /^\d{10,15}$/;
  if (!phoneRegex.test(phone)) {
    return "Please enter a valid phone number (10-15 digits).";
  }

  return null; // No error
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await createConsultantMessage(formData).unwrap();
      alert("Message sent successfully!");
      setFormData({
        propertyType: "",
        name: "",
        email: "",
        phone: "",
        location: "",
        whatsappUpdates: false,
      });
    } catch (err) {
      console.error("Error submitting message:", err);
      setError("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white md:p-8 p-4 rounded-lg shadow-md">
      <h2 className="md:text-2xl text-xl font-bold text-center mb-6 text-blue-600">
        Book a Consultant
      </h2>
      
      {error && (
  <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded relative mb-4 text-sm">
    {error}
  </div>
)}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Property Type */}
        <div>
          <label
            htmlFor="propertyType"
            className="block text-sm font-medium text-gray-700"
          >
            Property Type
          </label>
          <select
            id="propertyType"
            name="propertyType"
            value={formData.propertyType}
            onChange={handleChange}
            className="block w-full mt-1 md:text-base text-sm md:p-2 p-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          >
            <option value="">Select Property Type</option>
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Industrial">Industrial</option>
            <option value="Land">Land</option>
          </select>
        </div>

        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="block w-full mt-1 md:text-base text-sm md:p-2 p-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your name"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="block w-full md:text-base text-sm md:p-2 p-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email"
            required
          />
        </div>

        {/* Phone Number */}
        <div>
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="block w-full mt-1 md:text-base text-sm md:p-2 p-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your phone number"
            required
          />
        </div>

        {/* Property Location */}
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-700"
          >
            Property Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="block w-full mt-1 md:text-base text-sm md:p-2 p-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter the property location"
            required
          />
        </div>

        {/* WhatsApp Updates */}
        <div className="flex items-center">
          <input
            type="checkbox"
            id="whatsappUpdates"
            name="whatsappUpdates"
            checked={formData.whatsappUpdates}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded"
          />
          <label
            htmlFor="whatsappUpdates"
            className="ml-2 md:text-sm text-xs text-gray-700"
          >
            Send me updates via WhatsApp
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full md:text-base text-xs bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Book Consultant
        </button>
      </form>
    </div>
  );
};

export default Consultants;
