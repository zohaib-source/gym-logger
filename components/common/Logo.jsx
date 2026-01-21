const Logo = () => (
  <div className="flex items-center gap-3 select-none">
    <div className="w-10 h-10 md:w-12 md:h-12 relative">
       <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 90 V 10 H 90 L 90 35 H 35 V 90 H 10 Z" fill="#a3d114" />
          <circle cx="65" cy="65" r="12" fill="#a3d114" />
       </svg>
    </div>
    
    <div className="flex flex-col">
      <h1 className="text-2xl md:text-3xl font-bold tracking-tighter italic text-white leading-none">
        FORCE
      </h1>
      <span className="text-[0.5rem] tracking-[0.4em] text-gray-400 uppercase">Fit For Life</span>
    </div>
  </div>
);
export default Logo;