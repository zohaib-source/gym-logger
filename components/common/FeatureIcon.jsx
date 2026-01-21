const FeatureIcon = ({ icon, label }) => (
  <div className="flex flex-col items-center gap-4 group cursor-pointer">
    <div className="w-20 h-20 rounded-full border-2 border-[#a3d114] flex items-center justify-center text-[#a3d114] transition-all duration-300 group-hover:bg-[#a3d114] group-hover:text-black shadow-[0_0_15px_rgba(163,209,20,0.2)]">
      {icon}
    </div>
    {/* Added label text rendering here */}
    <span className="text-gray-300 font-medium tracking-wide text-sm text-center max-w-[150px] uppercase">{label}</span>
  </div>
);

export default FeatureIcon;