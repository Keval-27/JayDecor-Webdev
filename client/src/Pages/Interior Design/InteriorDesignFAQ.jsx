import React from "react";
import FAQSection from "/src/Components/FAQ";

const InteriorDesignFAQ = () => {
  const FAQs = [
    {
      question: "Do I need to design the entire house if I use this service?",
      answer:
        "No , This service is perfect even for renovating just one part of your house.",
    },
    {
      question: " How do you visualize design ideas for a house?",
      answer:
        "After a detailed design discussion with our interior designer and CES, they share the proposed designs of your house with the use of our state-of-the-art 3D visualiser. Once you’ve seen what the interior design of your house would look like. Any subsequent changes that you need to make will be made to fit into your taste and liking.",
    },
    {
      question: "How can I share my room design ideas with the professional?",
      answer:
        "You can share your ideas through mood boards, reference images, or detailed descriptions. Discuss your vision with the designer through meetings, emails, or shared online boards.",
    },
    {
      question: "Can I have different themes throughout my house?",
      answer:
        "Definitely! You will be involved in every design decision that is taken. The and interior designer will consider and incorporate your opinion and solicit your approval at all stages in the designing phase. The final design will be based on your tastes and on popular trends.",
    }
   
  ];

  return (
    <div className="  py-10">
      <FAQSection title="Interior Design FAQs" faqs={FAQs} />
    </div>
  );
};

export default InteriorDesignFAQ;
