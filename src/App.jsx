import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  NavLink as RouterNavLink,
  Link,
} from "react-router-dom";
import {
  ClerkProvider,
  useAuth,
  SignInButton,
  UserButton,
} from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import {
  ConvexReactClient,
  Authenticated,
  Unauthenticated,
  AuthLoading,
} from "convex/react";
import Dashboard from "./components/Dashboard";
import {
  Phone,
  Mail,
  Youtube,
  Instagram,
  Facebook,
  Menu,
  X,
  Dumbbell,
  Bike,
  Waves,
  HeartPulse,
  Clock,
  Plus,
  Minus,
  Quote,
  MapPin,
  ArrowUp,
  MessageCircle,
  Search,
  Trash2,
} from "lucide-react";

// Initialize Convex Client
const convexUrl =
  import.meta.env.VITE_CONVEX_URL ||
  "https://loyal-salamander-373.convex.cloud";
const convex = new ConvexReactClient(convexUrl);

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

// --- CLONED COMPONENTS START ---

// 1. Logo
// 1. Logo
const Logo = () => (
  <Link
    to="/"
    className="flex items-center gap-3 select-none cursor-pointer hover:opacity-90 transition-opacity"
  >
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
      <span className="text-[0.5rem] tracking-[0.4em] text-gray-400 uppercase">
        FITNESS & LOGGER
      </span>
    </div>
  </Link>
);

// 2. SocialButton
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

// 3. NavLink
const NavLink = ({ text, to, mobile }) => (
  <RouterNavLink
    to={to}
    className={`
      relative group transition-colors duration-300
      ${mobile ? "text-xl font-semibold" : "text-[15px] tracking-wide"}
    `}
    style={({ isActive }) => ({
      color: isActive ? "#a3d114" : mobile ? "#d4d4d8" : "#d4d4d8", // gray-300
    })}
  >
    {({ isActive }) => (
      <>
        {text}
        {!mobile && (
          <span
            className={`absolute -bottom-1 left-0 h-0.5 bg-[#a3d114] transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`}
          ></span>
        )}
      </>
    )}
  </RouterNavLink>
);

// 4. FeatureIcon
const FeatureIcon = ({ icon, label }) => (
  <div className="flex flex-col items-center gap-4 group cursor-pointer">
    <div className="w-20 h-20 rounded-full border-2 border-[#a3d114] flex items-center justify-center text-[#a3d114] transition-all duration-300 group-hover:bg-[#a3d114] group-hover:text-black shadow-[0_0_15px_rgba(163,209,20,0.2)]">
      {icon}
    </div>
    <span className="text-gray-300 font-medium tracking-wide text-sm text-center max-w-[150px] uppercase">
      {label}
    </span>
  </div>
);

// 5. SocialIcon (for Footer)
const SocialIcon = ({ icon, href }) => (
  <a
    href={href}
    className="w-8 h-8 bg-[#a3d114] hover:bg-[#8eb810] text-black flex items-center justify-center rounded-sm transition-colors"
    target="_blank"
    rel="noopener noreferrer"
  >
    {icon}
  </a>
);

// 6. TopBar
const TopBar = () => {
  return (
    <div className="bg-black py-2 px-4 md:px-12 flex justify-between items-center text-xs md:text-sm border-b border-gray-900 z-50 relative h-[40px] md:h-[45px]">
      <div className="flex items-center gap-4 text-gray-300">
        <span className="flex items-center gap-2">
          <Phone size={14} className="text-[#a3d114]" /> Call Us : 0346 6888896
        </span>
        <span className="hidden md:flex items-center gap-2">
          | <Mail size={14} className="text-[#a3d114]" />{" "}
          support@forcefitness.com
        </span>
      </div>
      <div className="flex gap-2">
        <SocialButton
          icon={<Instagram size={16} />}
          href="https://www.instagram.com/forcegym.lhr/"
        />
        <SocialButton
          icon={<Facebook size={16} />}
          href="https://www.facebook.com/forcegym.lhr"
        />
      </div>
    </div>
  );
};

// 7. Navbar (Updated with Auth)
const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { isSignedIn } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed w-full z-40 transition-all duration-300 ${
        isScrolled
          ? "top-0 bg-black/30 backdrop-blur-md py-2 shadow-lg"
          : "top-[40px] md:top-[45px] bg-transparent py-4 md:py-6"
      }`}
    >
      <div className="container mx-auto px-4 md:px-12 flex justify-between items-center">
        <Logo />
        <div className="hidden lg:flex items-center gap-8 text-[15px] font-medium">
          <NavLink text="Home" to="/" />

          {isSignedIn ? (
            <>
              <Link
                to="/dashboard"
                className="text-[#a3d114] hover:text-white transition-colors"
              >
                Dashboard
              </Link>
              <UserButton />
            </>
          ) : (
            <div className="ml-4">
              <SignInButton mode="modal">
                <button className="px-6 py-2 bg-[#a3d114] text-black font-bold uppercase tracking-wide text-sm rounded-sm hover:bg-[#8eb810] transition-all">
                  Sign In
                </button>
              </SignInButton>
            </div>
          )}
        </div>

        <button
          className="lg:hidden text-white hover:text-[#a3d114] transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-zinc-900 absolute top-full left-0 w-full flex flex-col items-center py-8 gap-6 shadow-xl border-t border-zinc-800 animate-in slide-in-from-top-5">
          <NavLink text="Home" to="/" mobile />
          {isSignedIn ? (
            <>
              <Link
                to="/dashboard"
                className="text-xl font-bold text-[#a3d114]"
              >
                Dashboard
              </Link>
              <div className="scale-125">
                <UserButton />
              </div>
            </>
          ) : (
            <SignInButton mode="modal">
              <button className="px-8 py-3 bg-[#a3d114] text-black font-bold uppercase tracking-wide text-lg rounded-sm">
                Sign In
              </button>
            </SignInButton>
          )}
        </div>
      )}
    </nav>
  );
};

// 8. Hero (Updated Text)
const Hero = () => {
  return (
    <header className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2070&auto=format&fit=crop"
          alt="Gym Background"
          className="w-full h-full object-cover object-top opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/40 to-black/90"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-4 text-white drop-shadow-2xl">
          FORCE <span className="text-[#a3d114]">FITNESS</span>
        </h1>

        <p className="text-lg md:text-2xl text-gray-200 font-light tracking-wide mb-12 max-w-3xl mx-auto">
          Track your workouts, monitor your calories, and achieve your dream
          physique. Join the revolution of data-driven fitness.
        </p>

        <button className="group relative px-8 py-4 border border-white/30 bg-transparent overflow-hidden transition-all duration-300 hover:border-[#a3d114]">
          <span className="absolute inset-0 w-0 bg-[#a3d114] transition-all duration-[250ms] ease-out group-hover:w-full opacity-10"></span>
          <a className="relative text-white group-hover:text-black tracking-[0.2em] text-sm md:text-base font-bold uppercase cursor-pointer">
            Start Logging
          </a>
        </button>
      </div>
    </header>
  );
};

// 9. Features (Updated for Gym Logger)
const Features = () => {
  return (
    <section className="bg-[#1a1a1a] py-20 px-4 relative">
      <div className="container mx-auto text-center max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-wide text-white uppercase">
          Why Use Force Fitness Logger?
        </h2>

        <p className="text-gray-400 text-lg leading-relaxed mb-20 max-w-3xl mx-auto">
          We provide the tools you need to take control of your health. Log your
          sets, track your meals, and visualize your progress over time.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 justify-items-center">
          <FeatureIcon icon={<Dumbbell size={32} />} label="Workout Logging" />
          <FeatureIcon icon={<Bike size={32} />} label="Cardio Tracking" />
          <FeatureIcon icon={<Waves size={32} />} label="Calorie Counter" />
          <FeatureIcon
            icon={<HeartPulse size={32} />}
            label="Progress Analytics"
          />
        </div>
      </div>
    </section>
  );
};

// 10. Calorie Demo Section (New)
const CalorieDemo = () => {
  const [query, setQuery] = useState("");
  const [foodResults, setFoodResults] = useState([]);
  const [demoCart, setDemoCart] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchFood = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_CALORIE_API;
      const res = await fetch(
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${apiKey}&query=${query}&pageSize=5`,
      );
      const data = await res.json();
      setFoodResults(data.foods || []);
    } catch (err) {
      console.error("Failed to fetch food data", err);
    } finally {
      setLoading(false);
    }
  };

  const addToDemo = (food) => {
    // Energy is nutrientId 1008 (KCAL)
    const energy =
      food.foodNutrients.find((n) => n.nutrientId === 1008)?.value || 0;
    setDemoCart([...demoCart, { ...food, calories: energy }]);
  };

  const totalCalories = demoCart.reduce((acc, curr) => acc + curr.calories, 0);

  return (
    <section className="bg-black py-20 px-4 border-t border-gray-900">
      <div className="container mx-auto max-w-5xl">
        <div className="flex items-center gap-3 mb-8 justify-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-white uppercase text-center">
            Calorie Counter <span className="text-[#a3d114]">Demo</span>
          </h2>
        </div>
        <p className="text-center text-gray-400 mb-12 max-w-2xl mx-auto">
          Try our calorie counting feature right here. Search for foods like
          "Cheddar Cheese", "Apple", or "Milk" and see how easily you can track
          your daily intake.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Search Pane */}
          <div className="bg-[#1a1a1a] p-8 rounded-lg border border-white/5">
            <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
              <Search size={20} className="text-[#a3d114]" /> Search Foods
            </h3>
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && searchFood()}
                placeholder="e.g. Peanut Butter"
                className="w-full bg-black border border-gray-700 text-white px-4 py-3 rounded-sm focus:border-[#a3d114] focus:outline-none transition-colors"
              />
              <button
                onClick={searchFood}
                disabled={loading}
                className="bg-[#a3d114] text-black font-bold px-6 rounded-sm hover:bg-[#8eb810] disabled:opacity-50"
              >
                {loading ? "..." : "GO"}
              </button>
            </div>

            <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar">
              {foodResults.map((food) => {
                const cals =
                  food.foodNutrients.find((n) => n.nutrientId === 1008)
                    ?.value || 0;
                return (
                  <div
                    key={food.fdcId}
                    className="flex justify-between items-center bg-black/50 p-3 rounded border border-gray-800 hover:border-[#a3d114] transition-colors group"
                  >
                    <div>
                      <p className="text-white font-medium text-sm truncate max-w-[200px]">
                        {food.description}
                      </p>
                      <p className="text-xs text-gray-500">
                        {food.brandOwner || "Generic"}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-[#a3d114] font-bold text-sm">
                        {cals} kcal
                      </span>
                      <button
                        onClick={() => addToDemo(food)}
                        className="p-1 hover:bg-[#a3d114] hover:text-black rounded transition-colors text-white"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </div>
                );
              })}
              {foodResults.length === 0 && !loading && (
                <p className="text-center text-gray-600 italic">
                  No results found. Try searching.
                </p>
              )}
            </div>
          </div>

          {/* Results Pane */}
          <div className="bg-[#1a1a1a] p-8 rounded-lg border border-white/5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#a3d114] blur-[100px] opacity-10 pointer-events-none"></div>

            <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-wider flex items-center gap-2">
              Your Plate
            </h3>

            <div className="space-y-3 mb-8 min-h-[150px]">
              {demoCart.map((item, idx) => (
                <div
                  key={idx}
                  className="flex justify-between items-center text-sm border-b border-gray-800 pb-2"
                >
                  <span className="text-gray-300 truncate max-w-[60%]">
                    {item.description}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-white">{item.calories}</span>
                    <button
                      onClick={() =>
                        setDemoCart(demoCart.filter((_, i) => i !== idx))
                      }
                      className="text-red-500 hover:text-red-400"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              ))}
              {demoCart.length === 0 && (
                <div className="flex flex-col items-center justify-center h-[150px] text-gray-600">
                  <p>Your plate is empty.</p>
                  <p className="text-xs">Add items from search to see total.</p>
                </div>
              )}
            </div>

            <div className="border-t border-gray-700 pt-4 flex justify-between items-center">
              <span className="text-lg font-bold text-white">
                TOTAL CALORIES
              </span>
              <span className="text-3xl font-black text-[#a3d114]">
                {Math.round(totalCalories)}
              </span>
            </div>

            <p className="text-xs text-gray-500 mt-4 text-center">
              * Powered by USDA FoodData Central. Sign in to save your daily
              logs!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

// 12. QuoteSection (Minor update)
const QuoteSection = () => {
  return (
    <section className="relative py-32 px-4 text-white text-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=2070&auto=format&fit=crop"
          alt="Athlete in deep thought"
          className="w-full h-full object-cover object-center scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black/80"></div>
      </div>

      <div className="relative z-10 container mx-auto max-w-5xl">
        <div className="mb-8 animate-fade-in-up">
          <Quote
            size={64}
            className="text-[#a3d114] mx-auto rotate-180 opacity-50"
            fill="currentColor"
          />
        </div>

        <blockquote className="mb-12">
          <p className="text-4xl md:text-5xl lg:text-6xl font-black tracking-tight leading-tight uppercase">
            "We don't just build bodies, we build{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a3d114] to-white/80">
              Lifestyles
            </span>
            ."
          </p>
        </blockquote>

        <div className="flex flex-col items-center animate-fade-in-up delay-200">
          <div className="w-20 h-1 bg-[#a3d114] mb-4"></div>
          <footer className="text-xl md:text-2xl font-light text-gray-300 tracking-widest uppercase">
            - Force Fitness Philosophy
          </footer>
        </div>
      </div>
    </section>
  );
};

// 13. Footer
const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-[#111111] text-gray-400 font-sans">
      <div className="bg-[#1a1a1a] py-12 px-4 border-b border-white/5">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-bold text-white mb-2">
              Ready to Start?
            </h2>
            <p className="text-gray-400">
              Join Force Fitness today and take key step towards your goals.
            </p>
          </div>
          <button className="px-8 py-3 border border-white/30 text-white hover:bg-[#a3d114] hover:border-[#a3d114] hover:text-black transition-all duration-300 font-medium tracking-wide uppercase">
            <a
              href="https://wa.me/923358555573"
              target="_blank"
              rel="noopener noreferrer"
            >
              Contact Support
            </a>
          </button>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="text-white font-bold uppercase tracking-wider mb-6 text-sm">
              About Us
            </h3>
            <p className="text-sm leading-relaxed mb-4">
              Force Fitness is a comprehensive gym management and logging
              platform designed to help you track every rep, meal, and
              milestone.
            </p>
            <div className="space-y-4 text-sm leading-relaxed">
              <p className="flex gap-3">
                <Mail size={18} className="text-[#a3d114] flex-shrink-0" />
                <span>support@forcefitness.com</span>
              </p>
            </div>
          </div>

          <div className="flex flex-col"></div>

          <div>{/* Spacing holder */}</div>

          <div className="flex flex-col items-center lg:items-end justify-start">
            <div className="w-32 h-32 mb-4 relative">
              <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 90 V 10 H 90 L 90 35 H 35 V 90 H 10 Z"
                  fill="#a3d114"
                />
                <circle cx="65" cy="65" r="12" fill="#a3d114" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-white italic tracking-tighter">
              FORCE
            </h2>
            <span className="text-xs tracking-[0.4em] uppercase text-gray-500">
              FITNESS
            </span>
          </div>
        </div>
      </div>

      <div className="bg-black py-6 border-t border-gray-900">
        <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4 text-xs md:text-sm">
          <p>© Copyright 2024 - 2025 | Force Fitness | All Rights Reserved</p>

          <div className="flex items-center gap-2">
            <SocialIcon
              icon={<Instagram size={16} />}
              href="https://www.instagram.com/forcegym.lhr/"
            />
            <SocialIcon
              icon={<Facebook size={16} />}
              href="https://www.facebook.com/forcegym.lhr"
            />

            <button
              onClick={scrollToTop}
              className="w-8 h-8 bg-zinc-800 hover:bg-[#a3d114] hover:text-black flex items-center justify-center rounded-sm transition-all ml-4"
            >
              <ArrowUp size={16} />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

// 14. WhatsAppButton
const WhatsAppButton = () => (
  <div className="fixed bottom-8 right-8 z-50 flex items-center gap-3 animate-fade-in-up">
    <div className="bg-white text-black px-4 py-2 rounded-full text-sm font-medium shadow-lg hidden md:block">
      Need Help?
    </div>
    <button
      className="bg-[#25D366] hover:bg-[#1ebc57] text-white p-3 rounded-full shadow-lg transition-transform hover:scale-110 flex items-center justify-center w-14 h-14"
      onClick={() => window.open("https://wa.me/923358555573", "_blank")}
    >
      <MessageCircle size={32} fill="white" className="text-white" />
    </button>
  </div>
);

// --- MAIN HOME COMPONENT ---
const Home = () => {
  return (
    <div className="min-h-screen font-sans text-white bg-black">
      <TopBar />
      <Navbar />
      <Hero />
      <Features />
      <CalorieDemo />
      <QuoteSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

// --- APP COMPONENT ---
function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/"
              element={
                <>
                  <AuthLoading>
                    <div className="flex h-screen w-full bg-black text-[#a3d114] items-center justify-center font-bold tracking-widest uppercase">
                      Loading Force Fitness...
                    </div>
                  </AuthLoading>
                  <Unauthenticated>
                    <Home />
                  </Unauthenticated>
                  <Authenticated>
                    <Navigate to="/dashboard" />
                  </Authenticated>
                </>
              }
            />

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <Authenticated>
                  <Dashboard />
                </Authenticated>
              }
            />

            <Route
              path="/features"
              element={
                <div className="flex items-center justify-center min-h-screen">
                  <h1 className="text-3xl font-bold">
                    Features Page - Routing Working!
                  </h1>
                </div>
              }
            />
          </Routes>
        </Router>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

export default App;
