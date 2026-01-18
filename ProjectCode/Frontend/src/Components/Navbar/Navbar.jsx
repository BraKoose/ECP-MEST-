import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { TiThMenu } from "react-icons/ti";
import { MdClose } from "react-icons/md";
import { useNotification } from '../../context/Notification.jsx';
import axios from "axios";

export const Navbar = () => {
  const addNotification = useNotification();
  const url = `${import.meta.env.VITE_SERVER_URL}`;
  const token = localStorage.getItem('jwtToken');
  const [isOpen, setIsOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "About Us", path: "#about-us" },
    { name: "Features", path: "#features" },
    { name: "How It Works", path: "#how-it-works" },
  ];

  const [active, setActive] = useState(() => {
    const currentPath = location.pathname;
    const currentHash = location.hash.replace('#', '');

    const routeMatch = navLinks.find(link => link.type === "route" && link.path === currentPath);
    if (routeMatch) {
      return routeMatch.name;
    }

    if (currentPath === '/' && currentHash) {
      const foundLink = navLinks.find(link => link.type === "scroll" && link.path.replace('#', '') === currentHash);
      return foundLink ? foundLink.name : "Home";
    }

    return "Home";
  });

  const handleNavLinkClick = (itemName, itemPath, type) => {
    setActive(itemName);
    setIsOpen(false);

    if (type === "scroll") {
      const targetId = itemPath.substring(1);
      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        if (location.pathname !== '/') {
          navigate(`/${itemPath}`);
        } else {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    } else if (type === "route") {
      navigate(itemPath);
    }
  };

  const handleToggleMenu = () => {
    setIsOpen(!isOpen);
    setShowProfileDropdown(false);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  const fetchProfile = async () => {
    axios.get(`${url}/api/das/profile`, { headers: { Authorization: `Bearer ${token}` }, withCredentials: true })
      .then((response) => {
        console.log(response.data);
        setProfile(response.data);
      })
      .catch((error) => {
        console.log(error);
      })
  };

  const handleLogout = async () => {
    try {
      await axios.post(url + '/api/logout', {}, { withCredentials: true });
      setProfile(null);
      addNotification("Logged out successfully!", "success");
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response && error.response.data && error.response.data.message) {
        addNotification(error.response.data.message, 'error');
      } else {
        addNotification("An unexpected error occurred during logout. Please try again.", 'error');
      }
    } finally {
      setShowProfileDropdown(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const getInitials = (name) => {
    if (!name) return '';
    const parts = name.split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <div className='px-1 py-2 fixed w-full top-0 bg-white/95 backdrop-blur-md shadow-md text-gray-800 z-50 transition-all duration-300'>
      <div className='flex justify-between items-center container mx-auto'>
        <div className="flex items-center mb-4 md:mb-0">
          <svg className="w-10 md:w-12 mt-2 md:h-12 text-[#2bbbbb]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <h1 className='h-10 md:px-2 py-2 text-[#2bbbbb] text-xl md:text-xl lg:text-2xl font-extrabold tracking-tight'>ECP MEST</h1>
        </div>

        <nav className='hidden md:block'>
          <ul className='flex gap-6 px-2 items-center'>
            {navLinks.map((item, index) => (
              <li
                key={index}
                className={`font-semibold cursor-pointer text-lg
                  ${active === item.name ? "bg-[#2bbbbb] text-white px-3 py-1 rounded-full shadow-md" : "text-gray-600 hover:text-[#2bbbbb]"}
                  transition-all duration-300`}
              >
                <Link
                  to={item.path}
                  onClick={(e) => {
                    if (item.type === "scroll" && location.pathname === '/') {
                      e.preventDefault();
                    }
                    handleNavLinkClick(item.name, item.path, item.type);
                  }}
                  className="block px-1 py-1"
                >
                  {item.name}
                </Link>
              </li>
            ))}
            {profile ? (
              <li className="relative">
                <div
                  className="w-10 h-10 bg-[#2bbbbb] text-white rounded-full flex items-center justify-center cursor-pointer text-lg font-bold shadow-md hover:shadow-lg transition-all"
                  onClick={toggleProfileDropdown}
                >
                  {getInitials(profile.username)}
                </div>

                {showProfileDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
                    <div className="block px-4 py-2 text-gray-800 text-sm border-b border-gray-200">
                      Hello, {profile.username}!
                    </div>
                    {profile.role.includes('admin') && (
                      <Link to="/dashboard-type?=admin-dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={toggleProfileDropdown}>Admin Dashboard</Link>
                    )}
                    {profile.role.includes('agent') && (
                      <Link to="/dashboard-type?=agent-dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={toggleProfileDropdown}>Agent Dashboard</Link>
                    )}
                    {profile.role.includes('user') && (
                      <Link to="/dashboard-type?=user-dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={toggleProfileDropdown}>User Dashboard</Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
            ) : (
              <Link to="/login" className='bg-[#2bbbbb] hover:bg-[#25a0a0] text-white px-6 py-1 rounded-full text-xl ml-4 shadow-md transition-all'>Login</Link>
            )}
          </ul>
        </nav>

        <div className="md:hidden flex items-center">
          {profile && (
            <div className="relative mr-1">
              <div
                className="w-10 h-10 py-2 bg-[#2bbbbb] text-white rounded-full flex items-center justify-center cursor-pointer text-lg font-bold shadow-md"
                onClick={toggleProfileDropdown}
              >
                {getInitials(profile.username)}
              </div>
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg py-1 z-50">
                  <div className="block px-4 py-2 text-gray-800 text-sm border-b border-gray-200">
                    Hello, {profile.username}!
                  </div>

                  {profile.role.includes('admin') && (
                    <Link to="/dashboard-type?=admin-dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={toggleProfileDropdown}>Admin Dashboard</Link>
                  )}
                  {profile.role.includes('agent') && (
                    <Link to="/dashboard-type?=agent-dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={toggleProfileDropdown}>Agent Dashboard</Link>
                  )}
                  {profile.role.includes('user') && (
                    <Link to="/dashboard-type?=user-dashboard" className="block px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={toggleProfileDropdown}>User Dashboard</Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
          <button className="text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#2bbbbb] p-2 rounded-md" onClick={handleToggleMenu}>
            <TiThMenu className="w-8 h-8 text-[#2bbbbb]" />
          </button>
        </div>
      </div>

      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden
          ${isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}
          transition-opacity duration-300 ease-in-out`}
        onClick={handleToggleMenu}
      ></div>

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-40 md:hidden
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex justify-between items-center p-4 border-b border-gray-100">
          <span className="text-2xl font-extrabold text-[#2bbbbb]">ECP</span>
          <button className="text-gray-500 hover:text-[#2bbbbb] focus:outline-none transition-colors" onClick={handleToggleMenu}>
            <MdClose className="w-8 h-8" />
          </button>
        </div>
        <nav className='block px-4 py-4'>
          <ul className='flex flex-col gap-6 items-center'>
            {navLinks.map((item, index) => (
              <li
                key={index}
                className={`font-semibold cursor-pointer text-lg w-full text-center py-2 rounded-lg
                  ${active === item.name ? "bg-[#2bbbbb] text-white shadow-md" : "text-gray-600 hover:bg-gray-50 hover:text-[#2bbbbb]"}
                  transition-all duration-300`}
              >
                <Link
                  to={item.path}
                  onClick={(e) => {
                    if (item.type === "scroll" && location.pathname === '/') {
                      e.preventDefault();
                    }
                    handleNavLinkClick(item.name, item.path, item.type);
                  }}
                  className="block px-1 py-1"
                >
                  {item.name}
                </Link>
              </li>
            ))}
            {!profile && (
              <Link to="/login" className='bg-[#2bbbbb] text-white px-8 py-3 rounded-full text-xl mt-4 shadow-lg w-full text-center'>Login</Link>
            )}
          </ul>
        </nav>
      </div>
    </div>
  );
};
