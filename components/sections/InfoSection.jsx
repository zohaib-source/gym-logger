import React, { useState } from 'react';
import { Plus, Minus, Clock } from 'lucide-react';

const InfoSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    { question: "What facilities do you offer?", answer: "We offer state-of-the-art cardio equipment, a dedicated free weights area, a CrossFit zone, sauna & spa, and professional health checkups." },
    { question: "What are your operating times?", answer: "We are open from 6am to 1am daily, with specific slots for co-ed and ladies-only training." },
    { question: "Can I work out with a personal trainer?", answer: "Yes, we have certified personal trainers available for 1-on-1 sessions to help you reach your specific goals." },
    { question: "Is there care for my kids?", answer: "Yes, we have a supervised play area for children while you workout." },
    { question: "Can I bring my guests to gym?", answer: "Members are allowed to bring a guest 2 times a month for free. Additional visits require a day pass." },
    { question: "Do you have separate females gym?", answer: "We have dedicated 'Ladies Only' hours from 10am to 4pm daily to ensure privacy and comfort." },
    { question: "Can I freeze my membership?", answer: "Yes, annual memberships can be frozen for up to 3 months for medical or travel reasons." },
  ];

  const timings = [
    { label: "Co-ed / Mixed", time: "06:00 AM - 10:00 AM" },
    { label: "Ladies Only", time: "10:00 AM - 04:00 PM" },
    { label: "Co-ed / Mixed", time: "04:00 PM - 01:00 AM" },
  ];

  return (
    <section className="relative py-20 px-4 text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?q=80&w=2069&auto=format&fit=crop" 
          alt="Gym Background" 
          className="w-full h-full object-cover"
        />
        {/* Low Opacity Dark Overlay */}
        <div className="absolute inset-0 bg-black/85"></div>
      </div>

      <div className="container mx-auto relative z-10 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          
          {/* Left Side: Timings */}
          <div className="flex flex-col h-full justify-center">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="text-[#a3d114]" size={32} />
              <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide">
                Operating Hours
              </h2>
            </div>
            
            <p className="text-gray-400 mb-8">
              We offer flexible schedules to accommodate everyone. Please note our dedicated ladies-only hours.
            </p>

            <div className="space-y-6">
              {timings.map((item, index) => (
                <div key={index} className="bg-white/5 border-l-4 border-[#a3d114] p-6 rounded-r-lg hover:bg-white/10 transition-colors">
                  <h3 className="text-[#a3d114] font-bold uppercase tracking-wider text-sm mb-1">
                    {item.label}
                  </h3>
                  <p className="text-2xl font-light">
                    {item.time}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: FAQs */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold uppercase tracking-wide mb-8 text-center lg:text-left">
              Frequently Asked Questions
            </h2>
            
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="border-b border-gray-800">
                  <button 
                    onClick={() => toggleFaq(index)}
                    className="w-full py-4 flex justify-between items-center text-left hover:text-[#a3d114] transition-colors group"
                  >
                    <span className="font-medium text-lg pr-4">{faq.question}</span>
                    {openIndex === index ? (
                      <Minus size={20} className="text-[#a3d114] flex-shrink-0" />
                    ) : (
                      <Plus size={20} className="text-gray-500 group-hover:text-[#a3d114] flex-shrink-0" />
                    )}
                  </button>
                  
                  <div 
                    className={`grid transition-all duration-300 ease-in-out ${
                      openIndex === index ? 'grid-rows-[1fr] opacity-100 pb-4' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-gray-400 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default InfoSection;