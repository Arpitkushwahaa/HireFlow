// DSA Problem Bank - References to main PROBLEMS object
// This file re-exports DSA problems from the main problems.js file
// All DSA problems in problems.js should have interviewType: "DSA"

import { PROBLEMS, DIFFICULTY_COLORS } from './problems.js';

// Get all DSA problems from the main PROBLEMS object
export const DSA_PROBLEMS = Object.fromEntries(
  Object.entries(PROBLEMS).filter(([key, problem]) => problem.interviewType === "DSA")
);

// Re-export difficulty colors
export { DIFFICULTY_COLORS };

// Helper function to get problems by category
export const getProblemsByCategory = (category) => {
  return Object.values(DSA_PROBLEMS).filter(problem => problem.category && problem.category.includes(category));
};

// Helper function to get problems by difficulty
export const getProblemsByDifficulty = (difficulty) => {
  return Object.values(DSA_PROBLEMS).filter(problem => problem.difficulty === difficulty);
};

// DSA Topics list for filtering
export const DSA_TOPICS = [
  "Arrays",
  "Strings",
  "Linked Lists",
  "Stacks",
  "Queues",
  "Trees",
  "Binary Trees",
  "Graphs",
  "Dynamic Programming",
  "Greedy",
  "Heaps",
  "Sliding Window",
  "Hashing",
  "Recursion",
  "Backtracking",
  "Binary Search",
  "Bit Manipulation",
  "Math"
];
