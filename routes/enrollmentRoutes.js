import express from 'express';
import { enrollStudent, gradeStudent } from "./../controllers/enrollmentController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 * name: Enrollment
 * description: Student enrollment and grading operations
 */

/**
 * @swagger
 * /api/v2/enrollment/enroll:
 * post:
 * summary: Enroll a student into a specific course
 * tags: [Enrollment]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - studentId
 * - courseId
 * properties:
 * studentId:
 * type: string
 * description: ID of the student to enroll
 * courseId:
 * type: string
 * description: ID of the course
 * responses:
 * 201:
 * description: Student successfully enrolled.
 * 404:
 * description: Student or course not found.
 */
router.post('/enroll', enrollStudent);

/**
 * @swagger
 * /api/v2/enrollment/grade:
 * post:
 * summary: Assign a final grade to a student for a course
 * tags: [Enrollment]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - studentId
 * - courseId
 * - grade
 * properties:
 * studentId:
 * type: string
 * description: ID of the student
 * courseId:
 * type: string
 * description: ID of the course
 * grade:
 * type: number
 * description: Final grade to assign
 * responses:
 * 200:
 * description: Grade successfully assigned.
 * 404:
 * description: Enrollment record not found.
 */
router.post('/grade', gradeStudent);

export default router;
