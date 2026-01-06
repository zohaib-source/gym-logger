import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { SignInButton, SignUpButton, useUser, SignOutButton } from "@clerk/clerk-react";
import { ArrowRight, Dumbbell, Flame, Salad, ListTodo } from "lucide-react";

export default function LandingPage() {
  const { isSignedIn } = useUser();

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 flex items-center gap-2">
            <Dumbbell className="w-6 h-6 text-primary" />
            GymLogger
          </div>
          <div className="flex gap-4 items-center">
            {isSignedIn ? (
                <>
                    <Link to="/dashboard">
                        <Button>Go to Dashboard</Button>
                    </Link>
                    <SignOutButton>
                        <Button variant="ghost">Sign Out</Button>
                    </SignOutButton>
                </>
            ) : (
                <>
                    <SignInButton mode="modal">
                        <Button variant="ghost">Log In</Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                        <Button>Get Started</Button>
                    </SignUpButton>
                </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]"></div>
        
        <div className="container mx-auto px-6 text-center">
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6">
            Track your <span className="text-primary">Gains</span> & <span className="text-orange-500">Habits</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            The ultimate companion for your fitness journey. Log workouts, track calories, and build lasting habits with our all-in-one platform.
          </p>
          <div className="flex justify-center gap-4">
             {isSignedIn ? (
                <Link to="/dashboard">
                    <Button size="lg" className="h-12 px-8 text-lg shadow-lg shadow-primary/20 transition-all hover:scale-105">
                    Go to Dashboard <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </Link>
             ) : (
                <SignUpButton mode="modal">
                    <Button size="lg" className="h-12 px-8 text-lg shadow-lg shadow-primary/20 transition-all hover:scale-105">
                    Start Tracking Free <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                </SignUpButton>
             )}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Everything you need to succeed</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <FeatureCard 
              icon={<Dumbbell className="h-8 w-8 text-blue-500" />}
              title="Workout Logger"
              description="Log categories, exercises, sets, weights, and reps with ease."
            />
            <FeatureCard 
              icon={<Flame className="h-8 w-8 text-orange-500" />}
              title="Streak Tracking"
              description="Keep your streak alive! Weekends are safe, but consistency is key."
            />
             <FeatureCard 
              icon={<ListTodo className="h-8 w-8 text-purple-500" />}
              title="Habit Tracker"
              description="Build better lifestyle habits alongside your training."
            />
            <FeatureCard 
              icon={<Salad className="h-8 w-8 text-green-500" />}
              title="Calorie Counter"
              description="Track your nutrition to fuel your workouts properly."
            />
          </div>
        </div>
      </section>
      

    </div>
  );
}

function FeatureCard({ icon, title, description }) {
  return (
    <Card className="border-none shadow-md hover:shadow-xl transition-all duration-300 bg-card hover:-translate-y-1">
      <CardHeader>
        <div className="mb-4 inline-block p-3 rounded-2xl bg-muted">
          {icon}
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-base">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  )
}
