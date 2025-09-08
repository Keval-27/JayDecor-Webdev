import React from 'react';
import Welcome from "/src/Images/WelcomeJD.jpg";
import { useState,useEffect,useRef } from 'react';

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
      <div className="flex flex-col md:flex-row py-5 justify-between items-center gap-12">
          
          <div className="h-screen md:w-1/2 w-full text-darkblue px-10 pt-20 "
          >
              
                <div className={`md:text-5xl text-2xl font-medium m0b-7 text-right pt-10 px-20 font-boldtransition-opacity duration-1000 ${isInView ? 'animate-slide-Up' : 'opacity-0'
              }`}
              ref={textRef}>
                  <h1>WELCOME TO OUR STUDIO</h1>
              </div>
              <div className={`md:text-xl font-primary tracking-[0.2rem]  font-semibold 
              py-10'transition-opacity duration-3000 ${isInView ? 'animate-slide-Down' : 'opacity-0'
              }`}
              ref={textRef}>
                  <p className='pt-9 leading-[2rem]'>Welcome to Studio JayDecor, where creativity meets comfort and elegance. We specialize in crafting bespoke
                      interior spacesthat blend functionality with exquisite design. Whether you're looking torevamp a single room or transform your
                    entire home or office, our team of talented designers is here to bring your vision to life.
                    </p>
                    <p className='pt-9 leading-[2rem]'>
                      At Studio JayDecor, we believe that every space should reflect the unique personality and style of its inhabitants. From
                      concept to completion, we pay meticulous attention to detail, ensuring that every element contributes harmoniously to the
                      overall ambiance. Our goal is to create interiors that not only inspire but also enhance your daily living experience.
                  </p>
                  <p className="pt-9 leading-[2rem]">Explore our portfolio and discover how Studio JayDecor can redefine your space into a place you'll love to call your own.
                      Let's collaborate to turn your interior dreams into reality.
                    </p>
             </div>
          </div>
          <div className="md:w-1/2 w-full rounded">
              <img src={Welcome} alt="" className='w-[900px] h-[900px]' />
          </div>
    </div>
  )
}

export default WelcomeJD
