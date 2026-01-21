import React from 'react';

const SocialButton = ({ icon, href }) => (
  <a 
    href={href} 
    target="_blank" 
    rel="noopener noreferrer"
    className="w-8 h-8 bg-[#a3d114] hover:bg-[#8eb810] flex items-center justify-center text-black transition-colors rounded-sm"
  >
    {icon}
  </a>
);

export default SocialButton;