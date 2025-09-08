import React from "react";
import FAQSection from "/src/Components/FAQ";

const HomeFaq = () => {
  const HomeFAQs = [
    {
      question: "Why should I hire an interior designer?",
      answer:
        "Hiring an interior designer like Studio Jay Decor ensures that your space is designed with both functionality and style in mind. We help you maximize your space, avoid costly mistakes, and create a design that reflects your personal taste and lifestyle.",
    },
    {
        question: "What are the interior design services that you offer?",
        answer: (
          <ul className="list-disc pl-5">
            <li><strong>Interior Design</strong> </li>
            <li><strong>Conceptualisation</strong> </li>
            <li><strong>3D Visualisation</strong></li>
            <li><strong>2D Design + WD (Working Drawing)</strong> </li>
            <li><strong>Consultancy</strong> </li>
            <li><strong>Turnkey Contracting</strong></li>
          </ul>
        ),
      },
    {
      question: "How much does interior design cost?",
      answer:"The cost of interior design can vary depending on the scope of the project. Studio Jay Decor offers customized packages to suit different budgets, ensuring you get the best value for your investment while achieving a high-quality design."
       
    },
    {
      question: "Can you work with my existing furniture?",
      answer:
        "Yes, Studio Jay Decor can integrate your existing furniture with new design elements. We specialize in blending your current pieces with modern styles, creating a cohesive and refreshed look without completely replacing everything.",
    },
    {
        question: "Do you offer consultations?",
        answer:
          "Yes, Studio Jay Decor offers initial consultations where we assess your space, understand your style preferences, and discuss your budget. This helps us create a customized design plan that aligns with your vision.",
    },
    {
        question: " How do I start the design process with Studio Jay Decor?",
        answer:
          "Starting with Studio Jay Decor is easy. Simply contact us to schedule an initial consultation. We’ll discuss your vision, budget, and timeline, and from there, we’ll create a design plan that aligns with your goals.",
    },
    {
        question: " Can you help with both residential and commercial design?",
        answer:
          "Yes, Studio Jay Decor offers both residential and commercial interior design services. Whether it’s a home, office, or retail space, we specialize in creating designs that are functional, aesthetic, and tailored to the space’s purpose.",
    },
    {
        question: "Can you work with my budget?",
        answer:
          "Yes, Studio Jay Decor works with clients at various budget levels. We’ll create a design plan that suits your budget, making recommendations for where to invest and where to save, ensuring you get the most value for your money.",
    },



    
  ];

  return (
    <div>
      <FAQSection title=" FAQs"  faqs={HomeFAQs} />
    </div>
  );
};

export default HomeFaq;
