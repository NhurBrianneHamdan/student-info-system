import express from "express";

import {createCourse, getAllCourse, updateCourse, deleteCourse} from "../controllers/courseController.js";

const router = express.Router();

router.get("/", getAllCourse)
router.put("/:id", updateCourse)
router.post("/", createCourse);
router.delete("/:id", deleteCourse);

export default router;
