import express from "express";
import { Webhook } from "svix";
import User from "../models/User.js";
import { ENV } from "../lib/env.js";

const router = express.Router();

router.post("/clerk", express.raw({ type: "application/json" }), async (req, res) => {
  try {
    const WEBHOOK_SECRET = ENV.CLERK_WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
      throw new Error("Please add CLERK_WEBHOOK_SECRET to your .env file");
    }

    // Get the headers
    const svix_id = req.headers["svix-id"];
    const svix_timestamp = req.headers["svix-timestamp"];
    const svix_signature = req.headers["svix-signature"];

    // If there are no headers, error out
    if (!svix_id || !svix_timestamp || !svix_signature) {
      return res.status(400).json({ error: "Missing svix headers" });
    }

    // Get the body as string
    const payload = req.body.toString();

    // Create a new Svix instance with your webhook secret
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt;

    // Verify the payload with the headers
    try {
      evt = wh.verify(payload, {
        "svix-id": svix_id,
        "svix-timestamp": svix_timestamp,
        "svix-signature": svix_signature,
      });
    } catch (err) {
      console.error("Error verifying webhook:", err);
      return res.status(400).json({ error: "Webhook verification failed" });
    }

    // Handle the webhook event
    const { id } = evt.data;
    const eventType = evt.type;

    console.log(`Webhook with ID: ${id} and type: ${eventType}`);
    console.log("Webhook payload:", evt.data);

    switch (eventType) {
      case "user.created": {
        const { id, email_addresses, image_url, first_name, last_name, username } = evt.data;

        // Create user in database
        const user = await User.create({
          clerkId: id,
          email: email_addresses[0]?.email_address,
          username: username || email_addresses[0]?.email_address.split("@")[0],
          firstName: first_name,
          lastName: last_name,
          imageUrl: image_url,
        });

        console.log("User created:", user);
        break;
      }

      case "user.updated": {
        const { id, email_addresses, image_url, first_name, last_name, username } = evt.data;

        // Update user in database
        const user = await User.findOneAndUpdate(
          { clerkId: id },
          {
            email: email_addresses[0]?.email_address,
            username: username || email_addresses[0]?.email_address.split("@")[0],
            firstName: first_name,
            lastName: last_name,
            imageUrl: image_url,
          },
          { new: true }
        );

        console.log("User updated:", user);
        break;
      }

      case "user.deleted": {
        const { id } = evt.data;

        // Delete user from database
        const user = await User.findOneAndDelete({ clerkId: id });

        console.log("User deleted:", user);
        break;
      }

      default:
        console.log(`Unhandled event type: ${eventType}`);
    }

    return res.status(200).json({ success: true, message: "Webhook received" });
  } catch (error) {
    console.error("Error processing webhook:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
