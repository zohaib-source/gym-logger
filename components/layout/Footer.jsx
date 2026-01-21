import React from 'react';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, ArrowUp } from 'lucide-react';


const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111111] text-gray-400 font-sans">
      {/* Call to Action Strip */}
      <div className="bg-[#1a1a1a] py-12 px-4 border-b border-white/5">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-2">Achieve Your Fitness Goals</h2>
            <p className="text-gray-400">Flexible membership packages to suit all levels of athlete and achieve your fitness goals</p>
          </div>
          <button   className="px-8 py-3 border border-white/30 text-white hover:bg-[#a3d114] hover:border-[#a3d114] hover:text-black transition-all duration-300 font-medium tracking-wide uppercase">
          <a href="https://wa.me/923358555573" target="_blank" rel="noopener noreferrer">
            Join Now
          </a>
          </button>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Column 1: Contact Info */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">Come Find Us</h3>
            <div className="space-y-4 text-sm leading-relaxed">
              <p className="text-white font-medium mb-2">Lahore Branch:</p>
              <p className="flex gap-3">
                <MapPin size={18} className="text-[#a3d114] flex-shrink-0" />
                <span>Pine Avenue,<br/> Lahore</span>
              </p>
              <p className="flex gap-3">
                <Phone size={18} className="text-[#a3d114] flex-shrink-0" />
                <span>0346 6888896</span>
              </p>
              <p className="flex gap-3">
                <Mail size={18} className="text-[#a3d114] flex-shrink-0" />
                <span>info@forcegym.com</span>
              </p>
            </div>
          </div>

          {/* Column 2: Map Location (Replaces Recent Posts) */}
          <div className="flex flex-col">
            <h3 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">Our Location</h3>
            <div className="w-full h-48 rounded-lg overflow-hidden border border-gray-800 relative group">
              {/* Grayscale filter applied, removed on hover */}
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.438562383845!2d74.256795!3d31.4571705!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x391901a6021b4e93%3A0x9dc0380d285c9838!2sForce%20Gym!5e0!3m2!1sen!2s!4v1701755123456!5m2!1sen!2s" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(100%) invert(90%)' }} 
                className="transition-all duration-500 group-hover:filter-none"
                allowFullScreen="" 
                loading="lazy"
                title="Force Gym Location"
              ></iframe>
            </div>
          </div>

          {/* Column 3: Opening Times */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">Opening Times</h3>
            <div className="space-y-4 text-sm">
              <div>
                <span className="text-white block mb-1">Monday - Saturday</span>
                <span className="text-[#a3d114] text-xs uppercase tracking-wide">Gym Hall 1</span>
                <p className="mt-1">06:00 am - 01:00 am MIXED</p>
              </div>
              <div>
                <span className="text-white block mb-1">Monday - Saturday</span>
                <span className="text-[#a3d114] text-xs uppercase tracking-wide">Gym Hall 2</span>
                <p className="mt-1">10:00 am - 04:00 pm LADIES ONLY</p>
              </div>
            </div>
          </div>

          {/* Column 4: Logo */}
          <div className="flex flex-col items-center lg:items-end justify-start">
            <div className="w-32 h-32 mb-4 relative">
               <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 90 V 10 H 90 L 90 35 H 35 V 90 H 10 Z" fill="#a3d114" />
                  <circle cx="65" cy="65" r="12" fill="#a3d114" />
               </svg>
            </div>
            <h2 className="text-3xl font-bold text-white italic tracking-tighter">FORCE</h2>
            <span className="text-xs tracking-[0.4em] uppercase text-gray-500">Fit For Life</span>
          </div>

        </div>
      </div>

      {/* Copyright Bar */}
      <div className="bg-black py-6 border-t border-gray-900">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm">
          <p>© Copyright 2024 - 2025 | All Rights Reserved | Developed by Force Devs</p>
          
          <div className="flex items-center gap-2">
            <SocialIcon icon={<Instagram size={16} />}
             href="https://www.instagram.com/forcegym.lhr/"
            />
            <SocialIcon icon={<Facebook size={16} />}
            href="https://www.facebook.com/forcegym.lhr"
            />
            
            <button 
              onClick={scrollToTop}
              className="w-8 h-8 bg-zinc-800 hover:bg-[#a3d114] hover:text-black flex items-center justify-center rounded-sm transition-all ml-4"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon, href }) => (
  <a href={href} className="w-8 h-8 bg-[#a3d114] hover:bg-[#8eb810] text-black flex items-center justify-center rounded-sm transition-colors" target="_blank" rel="noopener noreferrer">
    {icon}
  </a>
);

export default Footer;