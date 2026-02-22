import { requireAuth } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = [
  requireAuth({
    onError: (error) => {
      console.error("Clerk auth error:", error);
    }
  }),
  async (req, res, next) => {
    try {
      const clerkId = req.auth()?.userId;

      if (!clerkId) {
        console.error("No userId found in req.auth()");
        return res.status(401).json({ message: "Unauthorized - no valid token provided" });
      }

      // find user in db by clerk ID
      const user = await User.findOne({ clerkId });

      if (!user) {
        console.error("User not found in database for clerkId:", clerkId);
        return res.status(404).json({ message: "User not found in database. Please sync your account." });
      }

      // attach user to req
      req.user = user;

      next();
    } catch (error) {
      console.error("Error in protectRoute middleware", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];
