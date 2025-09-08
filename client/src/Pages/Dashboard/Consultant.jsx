import React from "react";
import { useGetConsultantMessagesQuery } from "../../Redux/Features/ConsultantForm/consultantsApi";

const Consultants = () => {
  const {
    data: messages = [],
    isLoading,
    isError,
  } = useGetConsultantMessagesQuery();

  if (isLoading) return <div>Loading consultant messages...</div>;
  if (isError)
    return (
      <div>Error loading consultant messages. {isError.message}</div>
    );

  return (
    <div className="p-4 overflow-x-auto">
      <h2 className="text-2xl font-bold mb-4 text-blue-600">Consultant Messages</h2>
      {messages.length === 0 ? (
        <p>No messages yet.</p>
      ) : (
        <table className="min-w-full border border-gray-300 bg-white text-sm md:text-base">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Email</th>
              <th className="border px-4 py-2 text-left">Phone</th>
              <th className="border px-4 py-2 text-left">Property Type</th>
              <th className="border px-4 py-2 text-left">Location</th>
              <th className="border px-4 py-2 text-left">WhatsApp Updates</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg) => (
              <tr key={msg._id} className="hover:bg-gray-50">
                <td className="border px-4 py-2">{msg.name}</td>
                <td className="border px-4 py-2">{msg.email}</td>
                <td className="border px-4 py-2">{msg.phone}</td>
                <td className="border px-4 py-2">{msg.propertyType}</td>
                <td className="border px-4 py-2">{msg.location}</td>
                <td className="border px-4 py-2">
                  {msg.whatsappUpdates ? "Yes" : "No"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Consultants;
