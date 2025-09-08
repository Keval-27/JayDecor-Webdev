import React from "react";

const titleCard = [
  {
    title: "Customised Design",
    url: "/src/Images/Home/Why Choose us/Customised design.png",
  },
  {
    title: "On Time Completion",
    url: "/src/Images/Home/Why Choose us/OnTime.png",
  },
  {
    title: "3D Visualization",
    url: "/src/Images/Home/Why Choose us/3DVisualization.png",
  },
  {
    title: "Project Management",
    url: "/src/Images/Home/Why Choose us/ProjectManagement.png",
  },
  {
    title: "On Budget",
    url: "/src/Images/Home/Why Choose us/onbudget.png",
  },
];
const WhyChooseUs = () => {
  return (
    <section className="text-darkblue bg-gray-100 w-full md:h-[500px] md:p-10 py-10 ">
        <h1 className= " text-darkblue md:text-3xl text-xl text-center font-bold font-primary">Why Choose Us?</h1>
      <div className=" md:max-w-6xl mx-auto overflow-hidden relative  text-center justify-center py-6">
        <div className="  animate-slide whitespace-nowrap grid grid-flow-col-dense  gap-7  ">
          {titleCard.map((Choose, index) => (
            <div
              key={index}
              className=" lg:py-[50px] sm:lg:py-[30px] py-[5px] flex flex-col items-center"
            >
              <img
                src={Choose.url}
                alt={Choose.title}
                className=" rounded-xl lg:w-[70px] lg:h-[70px] w-[50px] h-[50px]  mb-4"
              />
              <h1 className="lg:text-lg text-base font-semibold font-secondary">
                {Choose.title}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
