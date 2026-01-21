import React, { useState, useEffect } from "react";
import { useUser, UserButton } from "@clerk/clerk-react";
import { useMutation, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import {
  Flame,
  Search,
  Plus,
  Trash2,
  Dumbbell,
  Calendar,
  ChevronRight,
  LogOut,
  Settings,
  X as XIcon,
  Check,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

// Helper to get midnight timestamp
const getTodayTimestamp = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d.getTime();
};

export default function Dashboard() {
  const { user } = useUser();
  const storeUser = useMutation(api.users.store);
  const userData = useQuery(api.users.getUser, {});

  // App State
  const todayTimestamp = getTodayTimestamp();

  // --- Calorie State ---
  const [query, setQuery] = useState("");
  const [foodResults, setFoodResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const logMeal = useMutation(api.meals.logMeal);
  const deleteMeal = useMutation(api.meals.deleteMeal);
  const todaysMeals =
    useQuery(api.meals.getMeals, { date: todayTimestamp }) || [];

  // --- Workout State ---
  const [showWorkoutModal, setShowWorkoutModal] = useState(false);
  const [exerciseSearch, setExerciseSearch] = useState("");
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [weight, setWeight] = useState("");
  const [reps, setReps] = useState("");

  const exercises = useQuery(api.exercises.getExercises) || [];
  const logSet = useMutation(api.exercises.logSet);
  const createExercise = useMutation(api.exercises.createExercise);
  const todaysSets =
    useQuery(api.exercises.getSets, { date: todayTimestamp }) || [];
  const deleteSet = useMutation(api.exercises.deleteSet);

  // --- Routine State ---
  const [showRoutineModal, setShowRoutineModal] = useState(false);
  const [routineName, setRoutineName] = useState("");
  const [selectedRoutineExercises, setSelectedRoutineExercises] = useState([]);
  const [routineExerciseSearch, setRoutineExerciseSearch] = useState("");

  const createRoutine = useMutation(api.exercises.createRoutine);
  // const deleteRoutine = useMutation(api.exercises.deleteRoutine);
  // const routines = useQuery(api.exercises.getRoutines) || [];

  // Filter exercises
  const filteredExercises = exercises.filter((e) =>
    e.name.toLowerCase().includes(exerciseSearch.toLowerCase()),
  );

  const filteredRoutineExercises = exercises.filter((e) =>
    e.name.toLowerCase().includes(routineExerciseSearch.toLowerCase()),
  );

  // Calculate Meal totals
  const totalCalories = todaysMeals.reduce(
    (acc, meal) => acc + meal.calories,
    0,
  );
  const totalProtein = todaysMeals.reduce(
    (acc, meal) => acc + (meal.protein || 0),
    0,
  );

  useEffect(() => {
    if (user) {
      storeUser();
    }
  }, [user, storeUser]);

  // --- Calorie Functions ---
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

  const handleAddMeal = async (food) => {
    const energy =
      food.foodNutrients.find((n) => n.nutrientId === 1008)?.value || 0;
    const protein =
      food.foodNutrients.find((n) => n.nutrientId === 1003)?.value || 0;
    const fat =
      food.foodNutrients.find((n) => n.nutrientId === 1004)?.value || 0;
    const carbs =
      food.foodNutrients.find((n) => n.nutrientId === 1005)?.value || 0;

    await logMeal({
      foodName: food.description,
      calories: energy,
      protein: protein,
      carbs: carbs,
      fat: fat,
      date: todayTimestamp,
    });
  };

  const handleDeleteMeal = async (id) => {
    await deleteMeal({ id });
  };

  // --- Workout Functions ---
  const handleSelectExercise = (ex) => {
    setSelectedExercise(ex);
    setExerciseSearch(""); // Clear search
  };

  const handleCreateExercise = async () => {
    if (!exerciseSearch) return;
    const exId = await createExercise({ name: exerciseSearch });
    // Ideally we get the full object back, but here we can just set minimal or fetch via ID?
    // Since it's optimistic, we might just re-select it after it appears in list.
    // For UX, let's just assume it works and set ID.
    setSelectedExercise({ _id: exId, name: exerciseSearch });
    setExerciseSearch("");
  };

  const handleLogSet = async () => {
    if (!selectedExercise || !weight || !reps) return;
    await logSet({
      exerciseId: selectedExercise._id,
      weight: parseFloat(weight),
      reps: parseFloat(reps),
      date: todayTimestamp,
    });
    // Don't clear exercise, user might want to log another set
    setReps(""); // Clear reps maybe? or keep for convenience
  };

  // --- Routine Functions ---
  const toggleRoutineExercise = (id) => {
    setSelectedRoutineExercises((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  const handleCreateRoutine = async () => {
    if (!routineName || selectedRoutineExercises.length === 0) return;
    await createRoutine({
      name: routineName,
      exerciseIds: selectedRoutineExercises,
    });
    setRoutineName("");
    setSelectedRoutineExercises([]);
    setShowRoutineModal(false);
    alert("Routine created successfully!");
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-[#a3d114] selection:text-black">
      {/* Navbar - Simplified for Dashboard */}
      <nav className="border-b border-gray-800 bg-[#111] sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 relative">
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
            <span className="text-xl font-bold tracking-tight italic">
              FORCE <span className="text-[#a3d114]">DASHBOARD</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 text-gray-400 text-sm">
              <Flame className="w-4 h-4 text-orange-500" />
              <span>{userData?.currentStreak || 0} Day Streak</span>
            </div>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </nav>

      <main className="container mx-auto p-4 md:p-8 space-y-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-1">
              Welcome back, {user?.firstName || "Athlete"}
            </h1>
            <p className="text-gray-400">Let's crush today's goals.</p>
          </div>
          <div className="bg-[#1a1a1a] px-6 py-3 rounded border border-gray-800 flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                Total Calories
              </p>
              <p className="text-2xl font-bold text-[#a3d114]">
                {Math.round(totalCalories)}
              </p>
            </div>
            <div className="h-8 w-px bg-gray-700"></div>
            <div className="text-right">
              <p className="text-xs text-gray-500 uppercase tracking-wider">
                Protein
              </p>
              <p className="text-2xl font-bold text-white">
                {Math.round(totalProtein)}g
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN: Calorie Tracker (Takes 2 cols) */}
          <div className="lg:col-span-2 space-y-6">
            {/* Search Section */}
            <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-6">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Search className="text-[#a3d114]" size={20} /> Log Food
              </h2>

              <div className="flex gap-2 mb-6">
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && searchFood()}
                    placeholder="Search USDA Database (e.g. Chicken Breast, Rice)"
                    className="w-full bg-black border border-gray-700 text-white px-4 py-3 pr-10 rounded-sm focus:border-[#a3d114] focus:outline-none transition-colors"
                  />
                  {query && (
                    <button
                      onClick={() => setQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#a3d114] transition-colors"
                    >
                      <X size={18} />
                    </button>
                  )}
                </div>
                <button
                  onClick={searchFood}
                  disabled={loading}
                  className="bg-[#a3d114] text-black font-bold px-6 rounded-sm hover:bg-[#8eb810] disabled:opacity-50 transition-colors"
                >
                  {loading ? "..." : "SEARCH"}
                </button>
              </div>

              {/* Search Results */}
              {foodResults.length > 0 && (
                <div className="space-y-2 mb-6 max-h-[300px] overflow-y-auto custom-scrollbar p-2 bg-black/40 rounded border border-gray-800/50">
                  {foodResults.map((food) => {
                    const cals =
                      food.foodNutrients.find((n) => n.nutrientId === 1008)
                        ?.value || 0;
                    const prot =
                      food.foodNutrients.find((n) => n.nutrientId === 1003)
                        ?.value || 0;
                    return (
                      <div
                        key={food.fdcId}
                        className="flex justify-between items-center bg-[#111] p-3 rounded hover:bg-[#222] transition-colors border-b border-gray-800 last:border-0 group"
                      >
                        <div className="flex-1 min-w-0 pr-4">
                          <p
                            className="text-white font-medium text-sm truncate"
                            title={food.description}
                          >
                            {food.description}
                          </p>
                          <p className="text-xs text-gray-500">
                            {food.brandOwner || "Generic"} • {Math.round(prot)}g
                            Protein
                          </p>
                        </div>
                        <div className="flex items-center gap-4 flex-shrink-0">
                          <span className="text-[#a3d114] font-bold text-sm">
                            {Math.round(cals)} kcal
                          </span>
                          <button
                            onClick={() => handleAddMeal(food)}
                            className="bg-gray-800 text-white p-1.5 rounded hover:bg-[#a3d114] hover:text-black transition-colors"
                            title="Add to Log"
                          >
                            <Plus size={16} />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Daily Log Section */}
            <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                  <Calendar className="text-[#a3d114]" size={20} /> Today's Log
                </h2>
                <span className="text-sm text-gray-400 bg-black px-3 py-1 rounded-full border border-gray-800">
                  {new Date().toLocaleDateString(undefined, {
                    weekday: "long",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>

              <div className="space-y-3">
                {todaysMeals.length === 0 ? (
                  <div className="text-center py-12 text-gray-600 border-2 border-dashed border-gray-800 rounded-lg">
                    <p className="mb-2">No meals logged today.</p>
                    <p className="text-sm">
                      Use the search bar above to track your nutrition.
                    </p>
                  </div>
                ) : (
                  todaysMeals.map((meal) => (
                    <div
                      key={meal._id}
                      className="flex justify-between items-center bg-[#111] p-4 rounded border-l-4 border-l-[#a3d114] border-y border-r border-gray-800 hover:border-r-gray-700 transition-all"
                    >
                      <div>
                        <p className="text-white font-medium">
                          {meal.foodName}
                        </p>
                        <div className="flex gap-3 text-xs text-gray-500 mt-1">
                          <span>P: {Math.round(meal.protein || 0)}g</span>
                          <span>C: {Math.round(meal.carbs || 0)}g</span>
                          <span>F: {Math.round(meal.fat || 0)}g</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xl font-bold text-white">
                          {Math.round(meal.calories)}{" "}
                          <span className="text-xs font-normal text-gray-500">
                            kcal
                          </span>
                        </span>
                        <button
                          onClick={() => handleDeleteMeal(meal._id)}
                          className="text-gray-600 hover:text-red-500 transition-colors"
                          title="Remove"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Gym Tracker (Simplified) */}
          <div className="space-y-6">
            <div className="bg-[#1a1a1a] rounded-lg border border-gray-800 p-6 sticky top-24">
              <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Dumbbell className="text-[#a3d114]" size={20} /> Quick Actions
              </h2>

              <div className="space-y-4">
                <button
                  onClick={() => setShowWorkoutModal(true)}
                  className="w-full bg-gradient-to-r from-[#a3d114] to-[#8eb810] text-black font-bold py-4 rounded-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
                >
                  <Plus size={20} /> START NEW WORKOUT
                </button>

                <button
                  onClick={() => setShowRoutineModal(true)}
                  className="w-full bg-black border border-gray-700 text-white font-medium py-3 rounded-sm hover:border-[#a3d114] hover:text-[#a3d114] transition-all flex items-center justify-center gap-2 group"
                >
                  Create Routine{" "}
                  <ChevronRight
                    size={16}
                    className="group-hover:translate-x-1 transition-transform"
                  />
                </button>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-800">
                <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">
                  Recent Sets
                </h3>
                {todaysSets.length === 0 ? (
                  <p className="text-gray-600 text-sm italic">
                    No sets logged today.
                  </p>
                ) : (
                  <div className="space-y-2">
                    {todaysSets.map((set) => (
                      <div
                        key={set._id}
                        className="flex justify-between items-center text-sm border-b border-gray-800 pb-2"
                      >
                        <div>
                          <p className="text-white font-medium">
                            {set.exerciseName}
                          </p>
                          <p className="text-gray-500 text-xs">
                            {set.weight}kg x {set.reps} reps
                          </p>
                        </div>
                        <button
                          className="text-gray-600 hover:text-red-500"
                          onClick={() => deleteSet({ id: set._id })}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* WORKOUT MODAL */}
      {showWorkoutModal && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="bg-[#111] p-4 border-b border-gray-800 flex justify-between items-center">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Dumbbell className="text-[#a3d114]" size={20} /> Log Set
              </h3>
              <button
                onClick={() => setShowWorkoutModal(false)}
                className="text-gray-500 hover:text-white"
              >
                <XIcon size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Exercise Selector */}
              <div className="space-y-2">
                <label className="text-sm text-gray-400 uppercase font-bold">
                  Exercise
                </label>
                {selectedExercise ? (
                  <div className="flex justify-between items-center bg-[#222] p-3 rounded border border-[#a3d114]">
                    <span className="font-bold text-white">
                      {selectedExercise.name}
                    </span>
                    <button
                      onClick={() => setSelectedExercise(null)}
                      className="text-xs text-gray-400 hover:text-white underline"
                    >
                      Change
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    <Search
                      className="absolute left-3 top-3 text-gray-500"
                      size={18}
                    />
                    <input
                      type="text"
                      placeholder="Search or create exercise..."
                      value={exerciseSearch}
                      onChange={(e) => setExerciseSearch(e.target.value)}
                      className="w-full bg-black border border-gray-700 rounded p-2 pl-10 text-white focus:border-[#a3d114] outline-none"
                    />
                    {exerciseSearch && (
                      <div className="absolute top-full left-0 w-full bg-[#222] border border-gray-700 mt-1 max-h-40 overflow-y-auto z-10 rounded">
                        {filteredExercises.map((ex) => (
                          <button
                            key={ex._id}
                            onClick={() => handleSelectExercise(ex)}
                            className="w-full text-left p-2 hover:bg-[#333] text-sm text-white"
                          >
                            {ex.name}
                          </button>
                        ))}
                        <button
                          onClick={handleCreateExercise}
                          className="w-full text-left p-2 hover:bg-[#333] text-sm text-[#a3d114] font-bold border-t border-gray-700"
                        >
                          + Create "{exerciseSearch}"
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 uppercase font-bold">
                    Weight (kg)
                  </label>
                  <input
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-[#a3d114] outline-none font-mono text-lg"
                    placeholder="0"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400 uppercase font-bold">
                    Reps
                  </label>
                  <input
                    type="number"
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-[#a3d114] outline-none font-mono text-lg"
                    placeholder="0"
                  />
                </div>
              </div>

              <button
                onClick={handleLogSet}
                disabled={!selectedExercise || !weight || !reps}
                className="w-full bg-[#a3d114] text-black font-bold py-3 rounded hover:bg-[#8eb810] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                LOG SET
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ROUTINE MODAL */}
      {showRoutineModal && (
        <div className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#1a1a1a] border border-gray-800 rounded-lg w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
            <div className="bg-[#111] p-4 border-b border-gray-800 flex justify-between items-center flex-shrink-0">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <Dumbbell className="text-[#a3d114]" size={20} /> Create Routine
              </h3>
              <button
                onClick={() => setShowRoutineModal(false)}
                className="text-gray-500 hover:text-white"
              >
                <XIcon size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6 overflow-y-auto custom-scrollbar">
              <div className="space-y-2">
                <label className="text-sm text-gray-400 uppercase font-bold">
                  Routine Name
                </label>
                <input
                  type="text"
                  value={routineName}
                  onChange={(e) => setRoutineName(e.target.value)}
                  className="w-full bg-black border border-gray-700 rounded p-3 text-white focus:border-[#a3d114] outline-none"
                  placeholder="e.g. Leg Day, Push Workout"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm text-gray-400 uppercase font-bold">
                  Select Exercises ({selectedRoutineExercises.length})
                </label>

                <input
                  type="text"
                  placeholder="Search exercises..."
                  value={routineExerciseSearch}
                  onChange={(e) => setRoutineExerciseSearch(e.target.value)}
                  className="w-full bg-black border border-gray-700 rounded p-2 text-sm text-white focus:border-[#a3d114] outline-none mb-2"
                />

                <div className="border border-gray-800 rounded bg-[#111] max-h-48 overflow-y-auto p-2 space-y-1">
                  {filteredRoutineExercises.length === 0 ? (
                    <p className="text-gray-500 text-sm p-2">
                      No exercises found.
                    </p>
                  ) : (
                    filteredRoutineExercises.map((ex) => {
                      const isSelected = selectedRoutineExercises.includes(
                        ex._id,
                      );
                      return (
                        <button
                          key={ex._id}
                          onClick={() => toggleRoutineExercise(ex._id)}
                          className={`w-full text-left p-2 rounded flex justify-between items-center text-sm ${isSelected ? "bg-[#a3d114] text-black font-bold" : "text-gray-300 hover:bg-[#222]"}`}
                        >
                          <span>{ex.name}</span>
                          {isSelected && <Check size={16} />}
                        </button>
                      );
                    })
                  )}
                </div>
              </div>

              <button
                onClick={handleCreateRoutine}
                disabled={!routineName || selectedRoutineExercises.length === 0}
                className="w-full bg-[#a3d114] text-black font-bold py-3 rounded hover:bg-[#8eb810] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                CREATE ROUTINE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
