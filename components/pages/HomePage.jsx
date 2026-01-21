import React from 'react';
import TopBar from '../layout/TopBar';
import Navbar from '../layout/Navbar';
import Hero from '../sections/Hero';
import WhatsAppButton from '../common/WhatsAppButton';
import Features from '../sections/Features';
import Environment from '../sections/Environment';
import InfoSection from '../sections/InfoSection';
import QuoteSection from '../sections/QuoteSection';
import Footer from '../layout/Footer';

const HomePage = () => {
  return (
    <div className="min-h-screen font-sans text-white bg-black">
      <TopBar />
      <Navbar />
      <Hero />
      <Features />
      <Environment />
      <InfoSection />
      <QuoteSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};
export default HomePage;