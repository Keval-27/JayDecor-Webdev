import React from "react";
import FAQSection from "/src/Components/FAQ";

const ConsultancyFAQ = () => {
    const ConsultancyFAQs=[
        {
            question: "What does an interior design consultant do?",
            answer: "An interior design consultant helps you plan, design, and create functional and aesthetically pleasing spaces that suit your style, needs, and budget."
        },
        {
            question :"Why should I hire an interior design consultant?",
            answer:"We provide expert advice, save you time, and ensure you make the most of your space and budget. Our experience helps avoid costly mistakes and delivers a cohesive, polished look."
        },
        {
            question:"How do I get started with your services?",
            answer:"Simply schedule a consultation with us! We'll discuss your vision, needs, and budget to tailor a design plan just for you."
        },
        {
            question:"How much do your services cost?",
            answer:"Our pricing varies based on the scope and complexity of your project. Contact us for a tailored quote after the initial consultation."
        },
        {
            question:"How long does a typical project take?",
            answer:"Timelines depend on the size and complexity of your project. Smaller consultations may take days, while larger renovations can span weeks or months."
        },
        {
            question:"Can you help me with just one room?",
            answer:"Of course! Whether it’s a single room or an entire property, we can tailor our services to meet your specific needs."
        },  
        {
            question:"Can you work within my budget?",
            answer:"Absolutely! We strive to deliver beautiful, functional designs that fit your budget without compromising quality."
        },
        

    ]; 
  return (
    <div>
      <FAQSection title="Consulatncy FAQs" faqs={ConsultancyFAQs} />
    </div>
  );
};

export default ConsultancyFAQ;
