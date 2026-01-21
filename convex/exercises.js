import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// --- EXERCISES ---

export const getExercises = query({
  handler: async (ctx) => {
    // Return all exercises (both default and user-created)
    // In a real app we might filter by creatorId == userId OR isDefault == true
    const identity = await ctx.auth.getUserIdentity();
    const userId = identity?.subject;

    let exercises = await ctx.db.query("exercises").collect();

    // Filter in memory for simplicity or use complex index
    if (userId) {
      exercises = exercises.filter(
        (e) => e.isDefault || e.creatorId === userId,
      );
    } else {
      exercises = exercises.filter((e) => e.isDefault);
    }

    return exercises;
  },
});

export const createExercise = mutation({
  args: { name: v.string(), categoryId: v.optional(v.id("categories")) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    // Check if exists
    const existing = await ctx.db
      .query("exercises")
      .filter((q) => q.eq(q.field("name"), args.name))
      .first();

    if (existing) return existing._id;

    // For now, if no category provided, we might need a default 'Other' category or make category optional in schema?
    // Schema says categoryId is required `v.id("categories")`.
    // We must fetch or create a category.
    let catId = args.categoryId;
    if (!catId) {
      const defaultCat = await ctx.db
        .query("categories")
        .filter((q) => q.eq(q.field("name"), "Uncategorized"))
        .first();
      if (defaultCat) {
        catId = defaultCat._id;
      } else {
        catId = await ctx.db.insert("categories", {
          name: "Uncategorized",
          isDefault: true,
        });
      }
    }

    return await ctx.db.insert("exercises", {
      name: args.name,
      categoryId: catId,
      isDefault: false,
      creatorId: identity.subject,
    });
  },
});

// --- SETS ---

export const logSet = mutation({
  args: {
    exerciseId: v.id("exercises"),
    weight: v.number(),
    reps: v.number(),
    date: v.number(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    await ctx.db.insert("sets", {
      userId: identity.subject,
      exerciseId: args.exerciseId,
      weight: args.weight,
      reps: args.reps,
      date: args.date,
    });
  },
});

export const getSets = query({
  args: { date: v.number() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];

    const sets = await ctx.db
      .query("sets")
      .withIndex("by_user_date", (q) =>
        q.eq("userId", identity.subject).eq("date", args.date),
      )
      .collect();

    // Enrich with exercise names
    const enriched = await Promise.all(
      sets.map(async (set) => {
        const exercise = await ctx.db.get(set.exerciseId);
        return {
          ...set,
          exerciseName: exercise ? exercise.name : "Unknown",
        };
      }),
    );

    return enriched;
  },
});

export const deleteSet = mutation({
  args: { id: v.id("sets") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    const set = await ctx.db.get(args.id);
    if (!set || set.userId !== identity.subject) return;

    await ctx.db.delete(args.id);
  },
});

// --- ROUTINES ---

export const createRoutine = mutation({
  args: { name: v.string(), exerciseIds: v.array(v.id("exercises")) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    await ctx.db.insert("routines", {
      userId: identity.subject,
      name: args.name,
      exercises: args.exerciseIds,
    });
  },
});

export const getRoutines = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) return [];
    return await ctx.db
      .query("routines")
      .withIndex("by_user", (q) => q.eq("userId", identity.subject))
      .collect();
  },
});

export const deleteRoutine = mutation({
  args: { id: v.id("routines") },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Unauthenticated");

    const routine = await ctx.db.get(args.id);
    if (!routine || routine.userId !== identity.subject) return;

    await ctx.db.delete(args.id);
  },
});
