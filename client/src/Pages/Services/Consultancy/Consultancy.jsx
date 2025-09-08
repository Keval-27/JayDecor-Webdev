import React from "react";
import Consultancy_intro from "./Consultancy_intro";
import ConsultancyOffer from "./ConsultancyOffer";
import ConsultancyProcess from "./ConsultancyProcess";
import ConsultancyFrom from "./ConsultancyFrom";
import ConsultancyFAQ from "./ConsultancyFAQ";
const Consultancy = () => {
  return (
    <div className="">
        <Consultancy_intro/>
        <ConsultancyOffer/>
        <ConsultancyProcess/>
        <ConsultancyFrom/>
        <ConsultancyFAQ/>
    </div>
  );
};

export default Consultancy;
