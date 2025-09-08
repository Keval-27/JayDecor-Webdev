import React from "react";
import FAQSection from "/src/Components/FAQ";
const TurnkeyFAQ = () => {
    const TurnkeyFAQs =[
        {
            question:"What is turnkey contracting?",
            answer:"Turnkey contracting is a project delivery method where we manage the entire process—from initial design to final construction. Once the project is complete, it's ready for use without additional effort from the client."
        },
        {
            question:"What types of projects can turnkey contracting handle?",
            answer:"We handle a wide range of projects, including residential, commercial, industrial, and specialty builds."
        },
        {
            question:"Who oversees the project during construction?",
            answer:"A dedicated project manager oversees the project to ensure it meets quality, timeline, and budgetary goals."
        },
        {
            question:"What is included in a turnkey project?",
            answer:(
                <ul className="list-disc pl-5">
          <li>
            <strong>Initial consultation and feasibility studies</strong>
          </li>
          <li>
            <strong>
            Design and architectural planning
            </strong>
          </li>
          <li>
            <strong>
            Permits and approvals
            </strong>
          </li>
          <li>
            <strong>
            Construction and quality assurance
            </strong>
          </li>
          <li>
            <strong>
            Final handover of the completed project
            </strong>
          </li>
        </ul>
            ),
        },
        {
            question:"How long does a turnkey project typically take?",
            answer:"The timeline depends on the project's size and complexity. After the initial consultation, we’ll provide a detailed timeline for your specific project."
        },
        {
            question:"What is the process for getting started?",
            answer:"Contact us for an initial consultation. We'll assess your needs, discuss your goals, and provide a proposal outlining the project scope, timeline, and costs."
        },
        {
            question:"How is the cost of a turnkey project determined?",
            answer:"Costs are based on factors such as project size, materials, design complexity, and location. We’ll provide a transparent breakdown during the proposal stage."
        },
        {
            question:"Can turnkey contracting handle unique or custom designs?",
            answer:"Absolutely! We specialize in tailoring each project to meet our clients’ specific needs and vision."
        },
    ];

  return (
    <div>
      <FAQSection title="TurnKey Contracting FAQs" faqs={TurnkeyFAQs} />
    </div>
  );
};

export default TurnkeyFAQ;
