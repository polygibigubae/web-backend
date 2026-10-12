import express from "express";
import cors from "cors";
import {
  errorHandler,
  notFoundHandler,
} from "./middleware/error.middleware.js";

// Import routes
import authRoutes from "./modules/auth/auth.routes.js";
import roleRoutes from "./modules/roles/role.routes.js";
import memberRoutes from "./modules/members/member.routes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/members", memberRoutes);

// Error handling middleware (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

export default app;