import express from 'express';
import {createStudent, getAllStudent, updateStudent, deleteStudent, getStudent, getStudentGrades} from "./../controllers/studentController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 * name: Students
 * description: Student management operations
 */

/**
 * @swagger
 * /api/v2/students:
 * get:
 * summary: Retrieve a list of all students
 * tags: [Students]
 * responses:
 * 200:
 * description: A list of students.
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * $ref: '#/components/schemas/Student'
 */
router.get("/", getAllStudent)

/**
 * @swagger
 * /api/v2/students:
 * post:
 * summary: Create a new student record
 * tags: [Students]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Student'
 * responses:
 * 201:
 * description: Student successfully created.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Student'
 * 400:
 * description: Invalid input or data.
 */
router.post("/", createStudent);

/**
 * @swagger
 * /api/v2/students/{id}:
 * get:
 * summary: Get a student by ID
 * tags: [Students]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: The student ID
 * responses:
 * 200:
 * description: Student details retrieved.
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Student'
 * 404:
 * description: Student not found.
 */
router.get("/:id", getStudent);

/**
 * @swagger
 * /api/v2/students/{id}:
 * put:
 * summary: Update an existing student record
 * tags: [Students]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: The student ID
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * $ref: '#/components/schemas/Student'
 * responses:
 * 200:
 * description: Student record updated successfully.
 * 404:
 * description: Student not found.
 */
router.put("/:id", updateStudent)

/**
 * @swagger
 * /api/v2/students/{id}:
 * delete:
 * summary: Delete a student record by ID
 * tags: [Students]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: The student ID
 * responses:
 * 204:
 * description: Student deleted successfully.
 * 404:
 * description: Student not found.
 */
router.delete("/:id", deleteStudent);

/**
 * @swagger
 * /api/v2/students/{id}/grades:
 * get:
 * summary: Get all grades for a specific student
 * tags: [Students]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: The student ID
 * responses:
 * 200:
 * description: A list of grades for the student.
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * type: object
 * properties:
 * course:
 * type: string
 * grade:
 * type: number
 * 404:
 * description: Student not found.
 */
router.get('/:id/grades', getStudentGrades);

export default router;
