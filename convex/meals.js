import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Log a new meal
export const logMeal = mutation({
  args: {
    foodName: v.string(),
    calories: v.number(),
    protein: v.optional(v.number()),
    carbs: v.optional(v.number()),
    fat: v.optional(v.number()),
    date: v.number(), // Midnight timestamp for filtering
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    const userId = identity.subject;

    await ctx.db.insert("meals", {
      userId,
      foodName: args.foodName,
      calories: args.calories,
      protein: args.protein,
      carbs: args.carbs,
      fat: args.fat,
      date: args.date,
      timestamp: Date.now(),
    });
  },
});

// Get meals for a specific date
export const getMeals = query({
  args: {
    date: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const userId = identity.subject;

    const meals = await ctx.db
      .query("meals")
      .withIndex("by_user_date", (q) =>
        q.eq("userId", userId).eq("date", args.date),
      )
      .order("desc")
      .collect();

    return meals;
  },
});

export const deleteMeal = mutation({
  args: { id: v.id("meals") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    // In a real app we'd verify ownership, but for now we trust the ID lookup will effectively limit logic if we wanted.
    // However, specifically checking userId matches is safer.
    const meal = await ctx.db.get(args.id);
    if (!meal) return;
    if (meal.userId !== identity.subject) return; // Prevent deleting others' meals

    await ctx.db.delete(args.id);
  },
});
