import FeatureIcon from "../common/FeatureIcon";
import { Dumbbell, Bike, Waves, HeartPulse } from "lucide-react";
const Features = () => {
  return (
    <section className="bg-[#1a1a1a] py-20 px-4 relative">
      <div className="container mx-auto text-center max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-wide text-white uppercase">
          World Class Fitness
        </h2>
        
        <p className="text-gray-400 text-lg leading-relaxed mb-20 max-w-3xl mx-auto">
          At Force Gym, everything we do from top to bottom is of the highest quality to ensure we're equipped to help you reach your goals of a healthy and fit lifestyle.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
          <FeatureIcon icon={<Dumbbell size={32} />} label="Strength and Conditioning" />
          <FeatureIcon icon={<Bike size={32} />} label="Fitness and Cardio" />
          <FeatureIcon icon={<Waves size={32} />} label="Flexibility and Rest" />
          <FeatureIcon icon={<HeartPulse size={32} />} label="Health and Diet" />
        </div>
      </div>
    </section>
  );
};

export default Features;