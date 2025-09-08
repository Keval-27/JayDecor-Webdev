import React, { useState } from "react";
import { useCreateContactMessageMutation } from "../Redux/Features/ContactForm/contactsApi";
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [error, setError] = useState("");
  const [createContactMessage] = useCreateContactMessageMutation();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setError("");
  };

  const validateForm = () => {
    const { name, phone, email, message } = formData;

    if (!name || !phone || !email || !message) {
      return "All fields are required.";
    }

    if (phone.length !== 10 || isNaN(phone)) {
      return "Phone number must be exactly 10 digits.";
    }

    if (!email.includes("@") || !email.includes(".")) {
      return "Please enter a valid email address.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await createContactMessage(formData).unwrap();
      alert("Message sent successfully!");
      setFormData({ name: "", phone: "", email: "", message: "" });
    } catch (err) {
      console.error("Error submitting message:", err);
      setError("Failed to send message. Please try again.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-gradient-to-r from-gray-700 to-gray-900 text-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-bold py-1">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>

        <div>
          <label className="block font-bold py-1">Phone:</label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your phone number"
          />
        </div>

        <div>
          <label className="block font-bold py-1">Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="block font-bold py-1">Message:</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="w-full h-32 px-4 py-2 border rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message here..."
          />
        </div>

        <button
          type="submit"
          className="font-bold w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default ContactForm;