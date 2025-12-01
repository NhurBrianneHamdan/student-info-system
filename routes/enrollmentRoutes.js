import express from 'express';
import { enrollStudent, gradeStudent } from "../controllers/enrollmentController.js";

const router = express.Router();

router.post('/enroll', enrollStudent);
router.post('/grade', gradeStudent);

export default router;
