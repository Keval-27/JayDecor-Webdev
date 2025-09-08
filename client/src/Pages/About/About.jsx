import React from 'react'
import WelcomeJD from "./WelcomeJD";
import OurMission from "./OurMission";
import OurTeam from "./JD_Team"
import About_intro from './About_intro';
const About = () => {
  return (
    <div>
      <About_intro/>
      <WelcomeJD />
      <OurMission />
      <OurTeam />
      
    </div>
  )
}

export default About
