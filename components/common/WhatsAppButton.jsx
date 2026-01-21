import React from 'react';
import { MessageCircle } from 'lucide-react';

const WhatsAppButton = () => (
  <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 animate-fade-in-up">
     <div className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium shadow-lg hidden md:block">
      Contact us
     </div>
     <button className="bg-[#25D366] hover:bg-[#1ebc57] text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center w-14 h-14" onClick={() => window.open('https://wa.me/923358555573', '_blank')}>
       <MessageCircle size={32} 
      
       fill="white" className="text-white" />
     </button>
  </div>
);
export default WhatsAppButton;