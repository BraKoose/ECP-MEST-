import React, { useEffect } from 'react';
import { FaEnvelope } from 'react-icons/fa';
import { useLocation, useNavigate, Link } from 'react-router-dom';
export const Fottor = () => {
  const location = useLocation();
  useEffect(() => {

    const timer = setTimeout(() => {
      if (location.hash) {
        const id = location.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
      else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [location.hash]);
  const teamMembers = [
    { name: "Godfred A . Amoako", github: "https://github.com/brakoose" },
    { name: "Amina Sall", github: "https://linkedin.com/in/aminata-sall-9a930a2ab" },
    { name: "Timilehin Olamijulo", github: "https://linkedin.com/in/timix" },
    { name: "Adorgloh Eric", github: "https://linkedin.com/in/eric-adorgloh" },

  ];

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "#about-us" },
    { name: "Features", href: "#features" },
    { name: "How It Works", href: "#how-it-works" },
  ];

  const contactInfo = {
    email: "eugene@meltwater.org",
    phone: "+233 24488 8558",
    address: "Buro, Osu, Accra",
  };

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-10 text-center md:text-left">
        {/* Company Info / Copyright */}
        <div className="col-span-1 md:col-span-1">
          <p className="text-xl font-bold mb-4 text-white">ECP Mest</p>
          <p className="text-sm leading-relaxed mb-4">
            Dedicated to providing innovative solutions and seamless experiences.
          </p>
          <p className="text-md font-semibold">&copy; {new Date().getFullYear()} Class of MEST AI all right reserved.</p>
        </div>

        {/* Quick Links */}
        <div className="col-span-1 md:col-span-1">
          <p className="text-xl font-bold mb-4 text-white">Quick Links</p>
          <ul className="space-y-2">
            {quickLinks.map((link, index) => (
              <li key={index}>
                <a
                  href={link.href}
                  className="text-gray-400 hover:text-[#2bbbbb] transition-colors duration-200 text-lg"
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>
        </div>


        <div className="col-span-1 md:col-span-1">
          <p className="text-xl font-bold mb-4 text-white">Our Team</p>
          <div className="flex flex-col items-center md:items-start space-y-2">
            {teamMembers.map((member, index) => (
              <a
                key={index}
                href={member.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-[#2bbbbb] transition-colors duration-200 text-lg"
              >
                {member.name}
              </a>
            ))}
          </div>
        </div>

        <div className="col-span-1 md:col-span-1">
          <p className="text-xl font-bold mb-4 text-white">Contact Us</p>
          <div className="space-y-3 mb-6">
            <p className="flex items-center justify-center md:justify-start text-lg">
              <FaEnvelope className="mr-2 text-[#2bbbbb]" />
              <a href={`mailto:${contactInfo.email}`} className="hover:text-[#2bbbbb]">{contactInfo.email}</a>
            </p>
            <p className="flex items-center justify-center md:justify-start text-lg">
              <span className="mr-2 text-[#2bbbbb]">&#9742;</span> {/* Unicode for phone icon */}
              {contactInfo.phone}
            </p>
            <p className="text-lg">
              {contactInfo.address}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};