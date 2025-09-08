import React, { useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";

const FAQSection = ({ title, faqs }) => {
  return (
    <div className=" text-darkblue container mx-auto md:p-6 p-3 w-full h-auto">
      <h2 className="md:text-3xl text-xl font-bold text-center mb-8">{title}</h2>
      <div className="md:space-y-4 space-y-3">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} />
        ))}
      </div>
    </div>
  );
};

const FAQItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border  border-gray-300 rounded-lg ">
    {/* Question */}
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="w-full text-left px-4 py-3 flex md:text-2xl items-center justify-between bg-gray-100 hover:bg-gray-200 rounded-t-lg cursor-pointer"
    >
      <span className="text-sm md:text-base font-semibold ">{question}</span>
      {!isOpen ? <IoIosArrowDown />:<IoIosArrowUp />  }
    </button>
    {/* Answer */}
    {isOpen && (
      <div className="text-sm md:text-base font-medium px-4 py-3 text-gray-700 bg-white rounded-b-lg">
        {answer}
      </div>
    )}
  </div>
  );
};

export default FAQSection;