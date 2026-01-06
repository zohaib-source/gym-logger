import React, { useEffect } from 'react';
import { useUser, UserButton } from "@clerk/clerk-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Flame } from "lucide-react";

export default function Dashboard() {
  const { user } = useUser();
  const storeUser = useMutation(api.users.store);
  const userData = useQuery(api.users.getUser, {}); // We will need to implement getUser

  useEffect(() => {
    // Store user in Convex on first load
    if (user) {
        storeUser();
    }
  }, [user, storeUser]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navbar */}
      <nav className="border-b border-border bg-card p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-purple-600 bg-clip-text text-transparent">
             GymLogger Dashboard
          </h1>
          <div className="flex items-center gap-4">
             <div className="flex items-center gap-2 text-orange-500 font-bold">
                <Flame className="w-5 h-5 fill-orange-500" />
                <span>{userData?.currentStreak || 0} Day Streak</span>
             </div>
             <UserButton />
          </div>
        </div>
      </nav>

      {/* Main Content Placeholder */}
      <main className="container mx-auto p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             <Card>
                 <CardHeader>
                     <CardTitle>Gym Tracker</CardTitle>
                 </CardHeader>
                 <CardContent>
                     <p className="text-muted-foreground">Log your workouts here.</p>
                     <Button className="mt-4 w-full">Start Workout</Button>
                 </CardContent>
             </Card>
             <Card>
                 <CardHeader>
                     <CardTitle>Habits</CardTitle>
                 </CardHeader>
                 <CardContent>
                     <p className="text-muted-foreground">Track your daily habits.</p>
                     <Button className="mt-4 w-full" variant="outline">View Habits</Button>
                 </CardContent>
             </Card>
             <Card>
                 <CardHeader>
                     <CardTitle>Calories</CardTitle>
                 </CardHeader>
                 <CardContent>
                     <p className="text-muted-foreground">Track your nutrition.</p>
                     <Button className="mt-4 w-full" variant="outline">Log Meal</Button>
                 </CardContent>
             </Card>
          </div>
      </main>
    </div>
  );
}
