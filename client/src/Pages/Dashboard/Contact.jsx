import React from "react";
import { useGetContactMessagesQuery } from "../../Redux/Features/ContactForm/contactsApi";

const Contacts = () => {
  const { data: messages = [], error, isLoading } = useGetContactMessagesQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading messages: {error.message}</p>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-md">
      <h2 className="text-2xl font-bold mb-4">Contact Messages</h2>
      
      <table className="min-w-full table-auto">
        <thead className="bg-gray-100">
          <tr>
            <th className="px-4 py-2 text-left">Name</th>
            <th className="px-4 py-2 text-left">Phone</th>
            <th className="px-4 py-2 text-left">Email</th>
            <th className="px-4 py-2 text-left">Message</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((message) => (
            <tr key={message.id} className="border-t">
              <td className="px-4 py-2">{message.name}</td>
              <td className="px-4 py-2">{message.phone}</td>
              <td className="px-4 py-2">{message.email}</td>
              <td className="px-4 py-2">{message.message}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Contacts;
