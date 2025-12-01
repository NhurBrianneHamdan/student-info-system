import express from 'express';
import {createStudent, getAllStudent, updateStudent, deleteStudent,getStudent,getStudentGrades} from "../controllers/studentController.js";

const router = express.Router();

router.get("/", getAllStudent)
router.post("/", createStudent);
router.get("/:id", getStudent);
router.put("/:id", updateStudent)
router.delete("/:id", deleteStudent);
router.get('/:id/grades', getStudentGrades);

export default router;
