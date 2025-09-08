import React from "react";
import PropertyForm from "./PropertyForm"; // Adjust the import path as necessary

const Popup = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white md:w-[500px] p-8 rounded-lg shadow-md relative">
        <button onClick={onClose} className="text-3xl absolute top-2 right-2 text-gray-600">
          &times;
        </button>
        <PropertyForm />
      </div>
    </div>
  );
};

export default Popup;

