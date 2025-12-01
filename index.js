import express from "express";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";

// --- START: Environment Loading (MUST be first) ---
dotenv.config();
// --- END: Environment Loading ---

// 1. IMPORT THE DYNAMIC SWAGGER SPEC
import swaggerSpec from "./swagger-v2.js";

// 2. IMPORT ROUTES (Standard ESM imports)
import studentRoutes from "./routes/studentRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";


// --- Remove the unnecessary CommonJS requirement and swaggerDocument variable ---
// import { createRequire } from 'module'; // REMOVE
// const require = createRequire(import.meta.url); // REMOVE
// const swaggerDocument = require("./swagger.json"); // REMOVE


const app = express();
// PORT is correctly read after dotenv.config()
const PORT = process.env.PORT || 5001 

connectDB(); // connect to db

// 3. FIX CORS (Use environment variable for security and flexibility)
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173', // Uses cloud variable or local default
}));
app.use(express.json());

// 4. USE DYNAMIC SWAGGER SPEC
// Use the swaggerSpec imported from swagger-v2.js
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec)); 

app.use("/api/v2/students", studentRoutes);
app.use("/api/v2/courses", courseRoutes);
app.use("/api/v2/enrollment", enrollmentRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT)
});
