import express from "express";
import memberController from "./member.controller.js";

const router = express.Router();

// Public route to register a new member
router.post("/register", memberController.registerMember);

// Protected routes (add Auth middleware later if needed)
router.get("/", memberController.getMembers);

export default router;
