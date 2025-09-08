import React from "react";
import { useState, useEffect, useRef } from "react";

const WelcomeJD = () => {
  const [isInView, setIsInView] = useState(false);
  const textRef = useRef(null);

  // Intersection Observer Callback function
  const handleIntersection = (entries) => {
    const [entry] = entries;
    if (entry.isIntersecting) {
      setIsInView(true); // Set the state to true when the element is in view
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(handleIntersection, {
      root: null, // Use the viewport as the root
      threshold: 0.5, // Trigger when 50% of the element is in view
    });

    if (textRef.current) {
      observer.observe(textRef.current); // Start observing the text element
    }

    return () => {
      if (textRef.current) {
        observer.unobserve(textRef.current); // Cleanup observer when component unmounts
      }
    };
  }, []);

  return (

  

    <section className="w-full flex flex-col-reverse md:flex-row items-center justify-center mt-14 gap-4 md:p-5 p-3">
       
        {/*Welcome section*/}

      <div className="md:w-1/2 w-full  text-darkblue  ">

        {/*Welcome Title*/}
        <div
          className={` md:pb-10 pb-5  font-boldtransition-opacity duration-1000 ${
            isInView ? "animate-slide-Left" : "opacity-0"
          }`}
          ref={textRef}
        >
          <h1 className=" md:text-3xl text-xl font-bold flex  justify-center">
            WELCOME TO OUR STUDIO
          </h1>
        </div>

        {/*Welcome Content*/}
        <div
          className={`  md:xl:text-lg  text-sm font-primary md:tracking-[0.1rem] font-semibold 'transition-opacity duration-3000
             ${isInView ? "animate-slide-Down" : "opacity-0"}`}
          ref={textRef}
        >
          <p className="lg:pt-9 pt-4 md:leading-normal leading-relaxed">
            Welcome to Studio JayDecor, where creativity meets comfort and
            elegance. We specialize in crafting bespoke interior spacesthat
            blend functionality with exquisite design. Whether you're looking
            torevamp a single room or transform your entire home or office, our
            team of talented designers is here to bring your vision to life.
          </p>
          <p className="lg:pt-9 pt-4 md:leading-normal leading-relaxed">
            At Studio JayDecor, we believe that every space should reflect the
            unique personality and style of its inhabitants. From concept to
            completion, we pay meticulous attention to detail, ensuring that
            every element contributes harmoniously to the overall ambiance. Our
            goal is to create interiors that not only inspire but also enhance
            your daily living experience.
          </p>
          <p className="lgpt-9 pt-4 md:leading-normal leading-relaxed">
            Explore our portfolio and discover how Studio JayDecor can redefine
            your space into a place you'll love to call your own. Let's
            collaborate to turn your interior dreams into reality.
          </p>
        </div>
      </div>
      
      {/*Welcome Image*/}
      <div className=" " >
        <img
          src="/src/Images/About/WelcomeJD.jpg"
          alt=""
          className=" w-full md:h-[600px] sm:h-[500px] h-[360px] rounded-lg md:object-contain object-cover"
        />
      </div>
      
    </section>
  );
};

export default WelcomeJD;
