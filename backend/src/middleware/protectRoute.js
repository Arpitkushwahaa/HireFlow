import { requireAuth, clerkClient } from "@clerk/express";
import User from "../models/User.js";

export const protectRoute = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth().userId;

      if (!clerkId) return res.status(401).json({ message: "Unauthorized - invalid token" });

      // find user in db by clerk ID
      let user = await User.findOne({ clerkId });

      // If user doesn't exist in database, create them from Clerk data
      if (!user) {
        try {
          const clerkUser = await clerkClient.users.getUser(clerkId);
          
          user = await User.create({
            name: `${clerkUser.firstName || ""} ${clerkUser.lastName || ""}`.trim() || "User",
            email: clerkUser.emailAddresses[0]?.emailAddress || `${clerkId}@example.com`,
            profileImage: clerkUser.imageUrl || "",
            clerkId: clerkId,
          });
          
          console.log("✅ Auto-created user from Clerk:", user.email);
        } catch (createError) {
          console.error("❌ Error auto-creating user:", createError);
          return res.status(500).json({ message: "Failed to create user profile" });
        }
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
