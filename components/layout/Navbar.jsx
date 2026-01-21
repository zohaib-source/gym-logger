import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import Logo from '../common/Logo';       // Adjust path if needed
import NavLink from '../common/NavLink'; // Adjust path if needed
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll effect for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav 
     className={`fixed w-full z-40 transition-all duration-300 ${
        // CHANGED: bg-black/90 -> bg-black/30 to make it transparent
        // backdrop-blur-md creates the blurry glass effect behind it
        isScrolled ? 'top-0 bg-black/30 backdrop-blur-md py-2 shadow-lg' : 'top-[40px] md:top-[45px] bg-transparent py-4 md:py-6' 
      }`}
    >
    
      <div className="container mx-auto px-4 md:px-12 flex justify-between items-center">
        {/* Logo Section */}
        <Logo />

        {/* Desktop Navigation Links - Traditional Title Case */}
        <div className="hidden lg:flex items-center gap-8 text-[15px] font-medium">
          <NavLink text="Home" to="/" />
          <NavLink text="Facilities" to="/facilities" />
          <NavLink text="Our Policies" to="/policies" />
           <NavLink text="Contact us" to="/contact" />
          
         
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden text-white hover:text-[#a3d114] transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-zinc-900 absolute top-full left-0 w-full flex flex-col items-center py-8 gap-6 shadow-xl border-t border-zinc-800 animate-in slide-in-from-top-5">
          <NavLink text="Home" to="/" mobile />         
          <NavLink text="Facilities" to="/facilities" mobile /> 
          <NavLink text="Our Policies" to="/policies" mobile />
          <NavLink text="Contact us" to="/contact" mobile />
        </div>
      )}
    </nav>
  );
};

export default Navbar;