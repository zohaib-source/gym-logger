import React from 'react';
import { Quote } from 'lucide-react';

const QuoteSection = () => {
  return (
    <section className="relative py-32 px-4 text-white text-center overflow-hidden">
      {/* Background Image with Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=2070&auto=format&fit=crop" 
          alt="Athlete in deep thought" 
          className="w-full h-full object-cover object-center scale-105"
        />
        {/* Dark gradient that fades from black to slightly transparent */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto max-w-5xl">
        {/* Large Quotation Mark Icon */}
        <div className="mb-8 animate-fade-in-up">
          <Quote 
            size={64} 
            className="text-[#a3d114] mx-auto rotate-180 opacity-50"
            fill="currentColor"
          />
        </div>

        <blockquote className="mb-12">
          <p className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight uppercase">
            "The only bad workout is the one that <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a3d114] to-white/80">didn't happen</span>."
          </p>
        </blockquote>

        {/* Author & Deco Line */}
        <div className="flex flex-col items-center animate-fade-in-up delay-200">
          <div className="w-20 h-1 bg-[#a3d114] mb-4"></div>
          <footer className="text-xl md:text-2xl font-light text-gray-300 tracking-widest uppercase">
            - Force Gym Philosophy
          </footer>
        </div>
      </div>
    </section>
  );
};

export default QuoteSection;