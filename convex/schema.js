import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    currentStreak: v.number(),
    lastLogDate: v.optional(v.number()), // Timestamp of the last activity
  }).index("by_token", ["tokenIdentifier"]),

  categories: defineTable({
    name: v.string(),
    isDefault: v.boolean(),
    creatorId: v.optional(v.string()), // Clerk ID for custom categories
  }),

  exercises: defineTable({
    name: v.string(),
    categoryId: v.id("categories"),
    isDefault: v.boolean(),
    creatorId: v.optional(v.string()),
  }).index("by_category", ["categoryId"]),

  sets: defineTable({
    exerciseId: v.id("exercises"),
    userId: v.string(), // Clerk ID
    weight: v.number(),
    reps: v.number(),
    date: v.number(), // Timestamp
  }).index("by_user_exercise", ["userId", "exerciseId"])
    .index("by_user_date", ["userId", "date"]),

  // Placeholder for future Habit/Calorie features
  habits: defineTable({
    userId: v.string(),
    name: v.string(),
    completedDates: v.array(v.number()),
  }).index("by_user", ["userId"]),
});
