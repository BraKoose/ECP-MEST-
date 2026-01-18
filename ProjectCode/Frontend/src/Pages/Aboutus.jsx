import React from 'react'
import { Heading } from './Heading'
import About from "../assets/About.avif"
import { FaFastForward } from 'react-icons/fa';
import { IoSyncOutline } from 'react-icons/io5';
import { MdOutlineFactCheck } from 'react-icons/md';
import { FaMagic } from 'react-icons/fa'
import { MdOutlineGavel } from 'react-icons/md';
export const AboutUs = () => {
  const content = [
    { name: "Efficiency", icon: <FaFastForward />, info: "Streamlined process from submission to resolution." },
    { name: "Transparency", icon: <IoSyncOutline />, info: "Real-time tracking and clear communication." },
    { name: "Accountability", icon: <MdOutlineFactCheck />, info: "Ensures complaints are handled seriously and recorded." },
    { name: "User-Friendly", icon: <FaMagic />, info: "Intuitive interface for all users." },
    { name: "Compliance", icon: <MdOutlineGavel />, info: "Helps organizations meet regulatory obligations." },
  ]
  return (
    <div className='max-w-6xl mx-auto px-4 py-12 md:py-16 lg:py-20'>
      <div className='text-center mb-16'>
        <Heading Heading={"About us"} />
        <p className='mt-4 text-xl text-gray-600 max-w-2xl mx-auto'>
          Our mission is to ensure you have the best experience at the MEST Apartments by making it easy to report, track, and resolve your complaints efficiently        </p>
      </div>

      <div className='flex flex-col md:flex-row items-center gap-8 md:gap-12 lg:gap-16 mt-2 md:mt-4'>
        <div className='w-full md:w-1/2'>
          <img
            src={About}
            alt="About  EIT complaint - efficient complaint management"
            className='w-full h-auto object-cover rounded-lg shadow-sm'
            loading="lazy"
          />
        </div>

        <div className='flex-1 text-gray-700 space-y-6 md:space-y-2'>
          <p className='text-lg leading-relaxed'>
            Welcome to <strong className='font-semibold text-blue-600'>EIT complaint</strong>, your dedicated platform for efficient complaint registration and management.
            We understand that encountering issues can be frustrating, and our mission is to provide a seamless,
            transparent, and effective channel for you to voice your concerns and track their resolution.
          </p>
          <p className='text-lg leading-relaxed'>
            ECP (Eits Complaint Platform) is built to make your 7-month to 1-year stay in Accra safe, convenient, and comfortable.
            It empowers underdog entrepreneurs to log issues—like a faulty AC—without stress. Instead of chasing fixes, you simply submit a complaint,
            track its progress in real time, receive notifications as it’s being resolved, and stay focused on what truly matters:
            building your ideas and growing your impact.
          </p>
          <p className='text-lg leading-relaxed'>
            For the MEST community, ECP serves as a centralized internal platform where EITs can safely share their concerns and worries.
            It streamlines how complaints are received, categorized, assigned, and tracked, ensuring every issue is acknowledged and addressed.
            By bringing everything into one place, ECP helps the MEST management team respond efficiently, maintain a safe and supportive living environment, and ensure that no concern from the community goes unheard.
          </p>
        </div>
      </div>

      <div className='mt-20 sm:mt-24 lg:mt-28'>
        <div className='text-center mb-12'>
          <h3 className='text-3xl text-[#007FFF] font-extrabold  tracking-tight sm:text-4xl lg:text-5xl mb-4'>
            Our Core Values
          </h3>
          <p className='mt-4 text-xl text-gray-600 max-w-2xl mx-auto'>
            Why Choose ECP? We stand for these principles.
          </p>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8'>
          {content.map((item, index) => (
            <div
              key={index}
              className='flex flex-col items-center justify-center bg-white rounded-xl shadow-md p-8
                           transition-all duration-300 ease-in-out transform hover:-translate-y-2 hover:shadow-xl
                           border border-gray-200 hover:border-blue-300'
            >
              <div className='text-5xl text-blue-600 mb-6 flex-shrink-0'>
                {item.icon}
              </div>
              <h3 className='text-2xl font-semibold text-gray-900 mb-3 text-center'>
                {item.name}
              </h3>
              <p className='text-gray-600 text-center leading-relaxed'>
                {item.info}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}