import React from "react";
import Intro from "./Intro";
import OurVision from "./OurVision";
import StudioGallery from "./StudioGallery";
import HomeFaq from "./HomeFaq";
import WhyChooseUs from "./WhyChooseUs";
import InteriorProcess from "./process";
const Home = () => {
  
  return (
    <div>
      <Intro />
      <StudioGallery />
      <OurVision />
      <WhyChooseUs />
      <InteriorProcess />
      <HomeFaq />
      
    </div>
  );
};

export default Home;
