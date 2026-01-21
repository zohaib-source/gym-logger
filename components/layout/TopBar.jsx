import React from 'react';
import { Phone, Mail, Youtube, Instagram, Facebook } from 'lucide-react';
import SocialButton from '../common/SocialButton'; // Adjust path if needed
import WhatsAppButton from '../common/WhatsAppButton';
const TopBar = () => {
  return (
    <div className="bg-black py-2 px-4 md:px-12 flex justify-between items-center text-xs md:text-sm border-b border-gray-900 z-50 relative h-[40px] md:h-[45px]">
      <div className="flex items-center gap-4 text-gray-300">
        <span className="flex items-center gap-2">
          <Phone size={14} className="text-[#a3d114]" /> Call Us : 0346 6888896
        </span>
        <span className="hidden md:flex items-center gap-2">
          | <Mail size={14} className="text-[#a3d114]" /> lhr@forcegym.com
        </span>
      </div>
      <div className="flex gap-2">
        <SocialButton  
    icon={<Instagram size={16} />}  
    href="https://www.instagram.com/forcegym.lhr/"
  />
        <SocialButton  
    icon={<Facebook size={16} />}  
    href="https://www.facebook.com/forcegym.lhr"
  />
   
      </div>
    </div>
  );
};

export default TopBar;