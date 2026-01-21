
import { Phone, Mail, Facebook, Instagram, Youtube, Menu, X, ArrowUp, MapPin, CheckCircle } from 'lucide-react';


 import TopBar from '../layout/TopBar';
 import Navbar from '../layout/Navbar';
 import Footer from '../layout/Footer';
 import WhatsAppButton from '../common/WhatsAppButton';

const PoliciesPage = () => {
  return (
    <div className="min-h-screen bg-[#111] text-white flex flex-col">
      {/* Layout Header Components (Inline for preview) */}
      <TopBar />
      <Navbar currentPage="policies" />

      {/* Main Content - Added padding top (pt) to account for fixed navbar */}
      <main className="flex-grow pt-[120px] pb-20 px-4">
        <div className="container mx-auto max-w-5xl">
          
          {/* Header Title */}
          <div className="text-center mb-16 animate-fade-in-up">
            <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wide text-white mb-4">
              Our <span className="text-[#a3d114]">Policies</span>
            </h1>
            <div className="w-24 h-1 bg-[#a3d114] mx-auto"></div>
            <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
              To ensure a safe and enjoyable environment for all members, please review our club rules and regulations.
            </p>
          </div>

          {/* Policies List Card */}
          <div className="bg-zinc-900/50 border border-white/5 p-8 md:p-12 rounded-lg backdrop-blur-sm shadow-xl">
            <ul className="space-y-6">
              <PolicyItem text="Membership is non-refundable." />
              <PolicyItem text="The Management will make final approval of the membership." />
              <PolicyItem text="All dues/cheques are non-refundable and non-transferable." />
              <PolicyItem text="Monthly dues must be paid within 5 days of the due date." />
              <PolicyItem text="Smoking, alcoholic drinks and drugs are strictly prohibited at Force Gym premises." />
              <PolicyItem text="Abusive or provocative language or uncivilized behavior is not allowed." />
              <PolicyItem text="Members or Guests may not display actions that the Force Gym staff deem unsportsmanlike or rude." />
              <PolicyItem text="Members or Guests may not misuse, move or alter any portion or item of the environment or property. Equipment must be handled with care and should be returned to their proper place after use; any abuse will result in loss of privileges and Membership and any damage caused to the Force Gym property is to be paid at the replacement cost decided by the Management." />
              <PolicyItem text="Good odor, proper hygiene and consideration of the rights and comfort of others must be observed at all times." />
              <PolicyItem text="Proper attire is must. Please wear T-shirts, sports trousers or shorts and non-marking joggers for exercise." />
              <PolicyItem text="Females should cover themselves appropriately in the parking area, walkways and other common areas." />
              <PolicyItem text="Any sound equipment such as radio or CD/MP3 players are not allowed in the facilities except with the use of headphones." />
              <PolicyItem text="All personal belongings brought into the premises or in the lockers are at the owner's risk." />
              <PolicyItem text="Rights of entry at Force Gym are reserved. Management can cancel any membership without assigning a reason." />
              <PolicyItem text="A member must accompany all his/her guests to enter Force Gym facilities, and must take the responsibility of their good conduct and safety." />
              <PolicyItem text="All exercises, swimming and playing sessions are done on Members' or Visitors' own risk. Individuals should be aware of their personal fitness limits. The use of equipment and exercises may be strenuous. Exercise at your own level and pace. Force Gym management will not be responsible for any compensation." />
            </ul>
          </div>

        </div>
      </main>

      {/* Layout Footer Component (Inline for preview) */}
      <Footer />
       <WhatsAppButton />
    </div>
  );
};

// --- Helper Component for Policy Items ---
const PolicyItem = ({ text }) => (
  <li className="flex gap-4 items-start group">
    <div className="mt-1 flex-shrink-0">
      <div className="w-2 h-2 rounded-full bg-[#a3d114] group-hover:scale-150 transition-transform duration-300 shadow-[0_0_10px_#a3d114]"></div>
    </div>
    <span className="text-gray-300 text-sm md:text-base leading-relaxed group-hover:text-white transition-colors duration-300">
      {text}
    </span>
  </li>
);

export default PoliciesPage;