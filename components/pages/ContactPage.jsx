import React from 'react';
import { Phone, Instagram, MessageCircle, Send } from 'lucide-react';
// Imports from your local project structure
import TopBar from '../layout/TopBar';
import Navbar from '../layout/Navbar';
import Footer from '../layout/Footer';
import WhatsAppButton from '../common/WhatsAppButton';

const ContactPage = () => {
  return (
    <>
    <div className=" bg-black text-white">
      {/* Layout Header Components */}
      <TopBar />
      {/* Pass the current page name so Navbar can highlight the link */}
      <Navbar currentPage="contact" />
      


      {/* 1. Page Hero Section */}
       <header className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1574680376345-b2995af0324f?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
          alt="Gym Background" 
          className="w-full h-full object-cover object-top opacity-60"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
        <h1 className="text-7xl md:text-9xl font-bold tracking-tight mb-4 text-white drop-shadow-2xl">
         Get In Touch
        </h1>
        
        <p className="text-gray-300 mb-10 leading-relaxed text-lg">
                Have a question about memberships, personal training, or our facilities? Reach out to our team directly. We're here to help you crush your fitness goals.
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
          <section className="relative py-24 px-4 bg-[#0a0a0a] text-white overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black/80"></div>
      
      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          
          {/* Left Column: Contact Info */}
          <div className="space-y-12 animate-fade-in-left">
            <div>
              <h2 className="text-4xl font-black mb-6 text-white uppercase tracking-wide border-l-4 border-[#a3d114] pl-6 leading-none">
                Get In Touch
              </h2>
              <p className="text-gray-300 mb-10 leading-relaxed text-lg">
                Have a question about memberships, personal training, or our facilities? Reach out to our team directly. We're here to help you crush your fitness goals.
              </p>
              
              <div className="space-y-8">
                <ContactItem 
                  icon={<Phone />} 
                  title="Call Us Directly" 
                  content="+92 335 8555573" 
                />
                
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-1 ml-4">Social & Messaging</h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <SocialButton 
                      icon={<Instagram />} 
                      label="Follow on Instagram" 
                      href="https://www.instagram.com/forcegym.lhr" // Replace with actual Instagram URL
                      bgColor="bg-gradient-to-r from-[#833ab4] via-[#fd1d1d] to-[#fcb045]"
                    />
                    <SocialButton 
                      icon={<MessageCircle />} 
                      label="Chat on WhatsApp" 
                      href="https://wa.me/923358555573" // Replace with actual WhatsApp link
                      bgColor="bg-[#25D366]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-zinc-900/60 p-8 md:p-12 rounded-2xl border border-white/10 backdrop-blur-md shadow-2xl animate-fade-in-right relative">
            <div className="absolute -top-2 -left-2 w-20 h-20 bg-[#a3d114]/20 blur-3xl rounded-full"></div>
            <div className="absolute -bottom-2 -right-2 w-20 h-20 bg-[#a3d114]/20 blur-3xl rounded-full"></div>
            <h2 className="text-3xl font-bold mb-10 text-white uppercase tracking-wide">
              Send Us a Message
            </h2>
            
            <form className="space-y-8 relative z-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <InputGroup label="First Name" type="text" placeholder="John" />
                <InputGroup label="Last Name" type="text" placeholder="Doe" />
              </div>
              
              <InputGroup label="Email Address" type="email" placeholder="john@example.com" />
              <InputGroup label="Phone Number" type="tel" placeholder="+92 300 1234567" />
              
              <div className="flex flex-col gap-3 group">
                <label className="text-xs font-bold uppercase tracking-widest text-gray-400 group-focus-within:text-[#a3d114] transition-colors">Message</label>
                <textarea 
                  rows="5"
                  placeholder="Tell us about your fitness goals..." 
                  className="bg-black/40 border-b-2 border-gray-700 rounded-t-md px-4 py-4 text-white placeholder-gray-500 focus:border-[#a3d114] focus:bg-black/60 focus:outline-none transition-all duration-300 resize-none"
                ></textarea>
              </div>

              <button 
                type="button"
                className="w-full bg-[#a3d114] text-black font-black uppercase tracking-widest py-5 px-8 hover:bg-[#8eb810] transition-all duration-300 transform hover:-translate-y-1 active:translate-y-0 shadow-[0_4px_0_0_#6a8a0a] hover:shadow-[0_2px_0_0_#6a8a0a] active:shadow-none rounded-sm flex items-center justify-center gap-3 group"
              >
                <span>Send Message</span>
                <Send size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </form>
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


//helper components

const ContactItem = ({ icon, title, content }) => (
  <div className="flex items-center gap-5 p-5 bg-white/5 rounded-xl border border-white/5 hover:border-[#a3d114]/50 hover:bg-white/10 transition-all duration-300 group">
    <div className="p-4 rounded-full bg-zinc-800 text-[#a3d114] group-hover:bg-[#a3d114] group-hover:text-black transition-colors duration-300 shadow-[0_0_15px_-3px_rgba(163,209,20,0.3)]">
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <div>
      <h3 className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-1">{title}</h3>
      <div className="text-xl font-bold text-white tracking-wide">{content}</div>
    </div>
  </div>
);

const SocialButton = ({ icon, label, href, bgColor }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className={`flex items-center gap-4 p-4 rounded-xl border border-white/5 hover:border-white/20 transition-all duration-300 group flex-1 ${bgColor} bg-opacity-10 hover:bg-opacity-20`}
  >
    <div className={`p-3 rounded-full text-white ${bgColor}`}>
      {React.cloneElement(icon, { size: 24 })}
    </div>
    <span className="text-sm font-bold uppercase tracking-wider text-white">{label}</span>
  </a>
);

const InputGroup = ({ label, type, placeholder }) => (
  <div className="flex flex-col gap-3 group">
    <label className="text-xs font-bold uppercase tracking-widest text-gray-400 group-focus-within:text-[#a3d114] transition-colors">{label}</label>
    <input 
      type={type} 
      placeholder={placeholder}
      className="bg-black/40 border-b-2 border-gray-700 rounded-t-md px-4 py-4 text-white placeholder-gray-500 focus:border-[#a3d114] focus:bg-black/60 focus:outline-none transition-all duration-300 w-full"
    />
  </div>
);

export default ContactPage;