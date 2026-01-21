// --- Component 3: Hero Section ---
const Hero = () => {
  return (
    <header className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop" 
          alt="Gym Background" 
          className="w-full h-full object-cover object-top opacity-60"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
        <h1 className="text-7xl md:text-9xl font-bold tracking-tight mb-4 text-white drop-shadow-2xl">
          FORCE
        </h1>
        
        <p className="text-lg md:text-2xl text-gray-200 font-light tracking-wide mb-12 max-w-3xl mx-auto">
          Motivation is what gets you started. Habit is what keeps you going.
        </p>
        
        <button className="group relative px-8 py-4 border border-white/30 bg-transparent overflow-hidden transition-all duration-300 hover:border-[#a3d114]">
          <span className="absolute inset-0 w-0 bg-[#a3d114] transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></span>
          <a className="relative text-white group-hover:text-[#a3d114] tracking-[0.2em] text-sm md:text-base font-medium" href="https://wa.me/923358555573" target="_blank" rel="noopener noreferrer">
            JOIN US TODAY
          </a>
        </button>
      </div>
    </header>
  );
};
export default Hero;