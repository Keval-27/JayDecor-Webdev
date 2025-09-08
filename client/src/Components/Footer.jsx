import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const QuickLinks = [
    {
      Title: "Home",
      link: "/",
    },
    {
      Title: "Design Gallery",
      link: "/Gallery",
    },
    {
      Title: "Recent Project",
      link: "/Projects",
    },
    {
      Title: "About",
      link: "/About",
    },
    {
      Title: "Contact Us",
      link: "/contact",
    },
  ];

  const services = [
    {
      Title: "Interrior Design",
      link: "/InteriorDesign",
    },
    {
      Title: "Conceptualisation",
      link: "/Conceptualisation",
    },
    {
      Title: "Consultancy",
      link: "/Consultancy",
    },
    {
      Title: "Turnkey Contracting",
      link: "/TurnkeyContracting",
    },
  ];

  const email = "studiojaydecor1969@gmail.com";

  return (
    <footer className="bg-darkblue text-white py-8">
      <div className="container mx-auto px-4 space-x-7">
        <div className="md:flex flex-wrap justify-evenly items-start  ">
          {/* Left Side: Logo and Address */}
          <div className="md:w-56 w-40 mb-6 md:mb-0 md:py-0 py-16 flex flex-col justify-center items-center text-center">
            <div className="flex justify-center  cursor-pointer pb-5 ">
              <img
                src="/src/Images/LOGO-Model.png"
                alt=""
                className="sm:w-[70px] sm:h-[60px] w-[50px] h-[40px] bg-transparent"
              />
              <Link to="/" className="text-2xl font-bold text-silver ">
                JD Studio{" "}
              </Link>
            </div>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Vrindavan+Rd,+Ovaripada,+Dahisar+East,+Mumbai,+Maharashtra+400068,+India"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium hover:text-blue-700 text-sm"
            >
              Vrindavan Rd, Ovaripada, Dahisar East, Mumbai, Maharashtra 400068,
              India
            </a>
          </div>

          <div className="text-center">
            <h1 className="text-md pt-4  font-semibold">Email ID</h1>
            <a
              href={`mailto:${email}`}
              className="text-silver hover:text-blue-700 text-sm pb-3 font-semibold"
            >
              {email}
            </a>

            <h1 className=" pt-4 text-md">Phone Number</h1>
            <h2>
              <a
                href="tel:+919820208503"
                className="text-silver text-sm hover:text-blue-700"
              >
                +91 9820208503
              </a>
            </h2>
            <h2>
              <a
                href="tel:+919167333845"
                className="text-silver text-sm hover:text-blue-700"
              >
                +91 9167333845
              </a>
            </h2>
          </div>

          <div className="flex flex-wrap justify-evenly gap-20">
            {/* Right Side: Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <nav className="flex flex-col space-y-2 ">
                {QuickLinks.map((item) => (
                  <Link
                    key={item.Title}
                    to={item.link}
                    className=" block text-sm hover:border-b-2 rounded-sm"
                  >
                    {" "}
                    {item.Title}{" "}
                  </Link>
                ))}
              </nav>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Services</h4>
              <nav className="flex flex-col space-y-2 ">
                {services.map((item) => (
                  <Link
                    to={item.link}
                    className=" block text-md hover:border-b-2 rounded-sm"
                  >
                    {" "}
                    {item.Title}{" "}
                  </Link>
                ))}
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Center: Social Media Icons */}
        <div className="mt-8 text-center ">
          <div className="flex justify-center space-x-6">
            <a href="#">
              <img
                src="/src/Images/Footer/whatsapp.png"
                alt=""
                className="w-8 h-8 hover:w-9 hover:h-9"
              />
            </a>
            <a
              href="https://www.instagram.com/studiojaydecor?igsh=d2pqaWY0bnMxaXFr"
              className="text-gray-400 hover:text-teal-400 transition-colors"
            >
              <img
                src="/src/Images/Footer/instagram.png"
                alt=""
                className="w-8 h-8 hover:w-9 hover:h-9"
              />
            </a>
            <a href="#">
              <img
                src="/src/Images/Footer/linkedin.png"
                alt=""
                className="w-8 h-8 hover:w-9 hover:h-9"
              />
            </a>
            <a href="#">
              <img
                src="/src/Images/Footer/facebook.png"
                alt=""
                className="w-8 h-8 hover:w-9 hover:h-9"
              />
            </a>
          </div>
          <p className="mt-4 text-sm text-gray-500">
            © {new Date().getFullYear()} | Jay Decor Studio | All Rights
            Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
