import express from "express";
import swaggerUi from "swagger-ui-express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/db.js";

dotenv.config();

import swaggerSpec from "./swagger-v2.js";

import { createRequire } from 'module';
import studentRoutes from "./routes/studentRoutes.js";
import courseRoutes from "./routes/courseRoutes.js";
import enrollmentRoutes from "./routes/enrollmentRoutes.js";

const require = createRequire(import.meta.url);
const swaggerDocument = require("./swagger.json");

const app = express();
const PORT = process.env.PORT || 5001

connectDB();  // connect to db

app.use(cors({
  origin: 'http://localhost:5173', // allow requests from this origin
})); // enable CORS for all routes
app.use(express.json()); // middleware to parse JSON

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument)); 

app.use("/api/v2/students", studentRoutes);
app.use("/api/v2/courses", courseRoutes);
app.use("/api/v2/enrollment", enrollmentRoutes);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT)
})



