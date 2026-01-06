import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient, Authenticated, Unauthenticated, AuthLoading } from "convex/react";
import Dashboard from './components/Dashboard';

// Initialize Convex Client
const convexUrl = import.meta.env.VITE_CONVEX_URL || "https://loyal-salamander-373.convex.cloud";
const convex = new ConvexReactClient(convexUrl);

// Import your publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
         <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={
                 <>
                   <AuthLoading>
                      <div className="flex h-screen w-full items-center justify-center">
                        Loading...
                      </div>
                   </AuthLoading>
                   <Unauthenticated>
                      <LandingPage />
                   </Unauthenticated>
                   <Authenticated>
                      <Navigate to="/dashboard" />
                   </Authenticated>
                 </>
            } />
            
            {/* Protected Routes */}
            <Route path="/dashboard" element={
              <Authenticated>
                <Dashboard />
              </Authenticated>
            } />

            <Route path="/features" element={
              <div className="flex items-center justify-center min-h-screen">
                  <h1 className="text-3xl font-bold">Features Page - Routing Working!</h1>
              </div>
            } />
          </Routes>
        </Router>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
}

export default App;
