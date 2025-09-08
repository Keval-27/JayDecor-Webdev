import React from "react";
import TurnkeyContracting_intro from "./TurnkeyContracting_intro";
import TurnkeyContractingServices from "./TurnkeyContractingServices";
import TurnkeyProcess from "./TrunkeyProcess";
import WhyJDStudio from "./whyJDStudio";
import TurnkeyFAQ from "./TurnkeyFAQ";
const TurnkeyContracting = () => {
  return (
    <div>
      <TurnkeyContracting_intro />
      <TurnkeyContractingServices />
      <TurnkeyProcess />
      <WhyJDStudio />
      <TurnkeyFAQ />
    </div>
  );
};

export default TurnkeyContracting;
