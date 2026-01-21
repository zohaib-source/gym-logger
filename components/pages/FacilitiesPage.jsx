import React from 'react';
import { MapPin, Phone } from 'lucide-react';
import TopBar from '../layout/TopBar';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import WhatsAppButton from '../common/WhatsAppButton';

const FacilitiesPage = () => {
  return (
    <>
    <div className=" bg-black text-white">
      {/* Layout Header Components */}
      <TopBar />
      {/* Pass the current page name so Navbar can highlight the link */}
      <Navbar currentPage="facilities" />
      


      {/* 1. Page Hero Section */}
       <header className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1605296867424-35fc25c9212a?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Gym Background" 
          className="w-full h-full object-cover object-top opacity-60"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
        <h1 className="text-7xl md:text-9xl font-bold tracking-tight mb-4 text-white drop-shadow-2xl">
         Club Facilities
        </h1>
        
        <p className="text-lg md:text-2xl text-gray-200 font-light tracking-wide mb-12 max-w-3xl mx-auto">
        The finish line is just the beginning of a whole new race
        </p>
        
        <button className="group relative px-8 py-4 border border-white/30 bg-transparent overflow-hidden transition-all duration-300 hover:border-[#a3d114]">
          <span className="absolute inset-0 w-0 bg-[#a3d114] transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></span>
          <span className="relative text-white group-hover:text-[#a3d114] tracking-[0.2em] text-sm md:text-base font-medium">
            <a className="relative text-white group-hover:text-[#a3d114] tracking-[0.2em] text-sm md:text-base font-medium" href="https://wa.me/923358555573" target="_blank" rel="noopener noreferrer">
            JOIN US TODAY
          </a>
          </span>
        </button>
      </div>
    </header>

      {/* 2. Facilities Grid */}
      <section className="py-20 px-4 bg-[#111]">
        <div className="container mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center uppercase tracking-wide">
            World Class Facilities
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            <FacilityCard 
              image="https://images.unsplash.com/photo-1593079831268-3381b0db4a77?q=80&w=2069&auto=format&fit=crop"
              title="Cardio"
            />
            <FacilityCard 
              image="https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=2070&auto=format&fit=crop"
              title="Strength & Conditioning"
            />
            <FacilityCard 
              image="https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=2070&auto=format&fit=crop"
              title="Spa, Steam & Sauna"
            />
            <FacilityCard 
              image="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              title="Personal Training"
            />
          </div>
        </div>
      </section>

      {/* 3. Free Classes for Females Section */}
      <section className="py-20 px-4 relative overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 bg-[#0a0a0a]">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        </div>

        <div className="container mx-auto relative z-10 max-w-5xl">
          <div className="text-center mb-16">
             <span className="text-[#ff0080] font-bold tracking-[0.3em] uppercase text-sm mb-2 block">Exclusive Offer</span>
             <h2 className="text-4xl md:text-6xl font-black uppercase text-white mb-2 italic">
               Free Classes
             </h2>
             <div className="inline-block bg-[#ff0080] text-white px-6 py-1 transform -skew-x-12">
               <span className="font-bold text-xl uppercase tracking-widest not-italic">Female</span>
             </div>
          </div>

          {/* Schedule Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <ClassCard day="Monday" title="HIIT" icon="🏃‍♀️" />
            <ClassCard day="Tuesday" title="Zumba" icon="💃" />
            <ClassCard day="Wednesday" title="Bootcamp" icon="🏋️‍♀️" />
            <ClassCard day="Thursday" title="Strength Training" icon="💪" />
            <ClassCard day="Friday" title="Yoga / Meditation" icon="🧘‍♀️" />
            
            {/* Timings Card */}
            <div className="bg-zinc-900/80 border border-white/10 p-6 flex flex-col justify-center items-center text-center relative group overflow-hidden">
               <div className="absolute top-0 left-0 w-1 h-full bg-[#ff0080]"></div>
               <h3 className="text-[#ff0080] font-bold text-xl mb-4 uppercase tracking-wider">Timings</h3>
               <div className="space-y-2 text-white font-medium">
                 <p>12:00 PM to 12:30 PM</p>
                 <span className="text-[#ff0080] font-bold text-xs">- OR -</span>
                 <p>02:00 PM to 02:30 PM</p>
               </div>
            </div>
          </div>

          {/* Contact Info Box */}
          <div className="flex flex-col md:flex-row justify-between items-center bg-white/5 rounded-lg p-6 border border-white/10 backdrop-blur-sm gap-6">
            <div className="flex items-center gap-3">
              <MapPin className="text-[#ff0080]" />
              <span className="font-bold uppercase tracking-wide">Pine Avenue</span>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-400 uppercase tracking-widest mb-1">Contact Us</p>
              <div className="flex items-center gap-2 text-xl font-bold">
                <Phone size={20} className="text-[#ff0080]" />
                +92 335 8555573
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Layout Footer Component */}
      <Footer />
       <WhatsAppButton />
    </div>
    </>
  );
};

// --- Subcomponents for this page ---

const FacilityCard = ({ image, title }) => (
  <div className="group relative h-80 overflow-hidden cursor-pointer">
    <img 
      src={image} 
      alt={title} 
      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
    />
    {/* Gradient Overlay */}
    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
    {/* Title Positioned at Bottom */}
    <div className="absolute bottom-0 left-0 w-full p-6">
      <h3 className="text-2xl font-bold text-white uppercase tracking-wider border-l-4 border-[#a3d114] pl-4">
        {title}
      </h3>
    </div>
  </div>
);

const ClassCard = ({ day, title, icon }) => (
  <div className="bg-white text-black p-6 transform transition-all hover:-translate-y-2 duration-300 relative overflow-hidden">
    <div className="absolute top-0 right-0 p-4 opacity-10 text-6xl select-none grayscale">
      {icon}
    </div>
    <span className="text-gray-500 font-bold text-sm uppercase tracking-wider block mb-2">{day}</span>
    <h3 className="text-2xl md:text-3xl font-black uppercase italic leading-none">{title}</h3>
  </div>
);

export default FacilitiesPage;