import express from "express";

import {createCourse, getAllCourse, updateCourse, deleteCourse} from "./../controllers/courseController.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 * name: Courses
 * description: Course management and catalog operations
 */

/**
 * @swagger
 * /api/v2/courses:
 * get:
 * summary: Retrieve a list of all available courses
 * tags: [Courses]
 * responses:
 * 200:
 * description: A list of courses.
 * content:
 * application/json:
 * schema:
 * type: array
 * items:
 * type: object
 * properties:
 * title:
 * type: string
 * description: Course title
 * code:
 * type: string
 * description: Course code
 */
router.get("/", getAllCourse)

/**
 * @swagger
 * /api/v2/courses/{id}:
 * put:
 * summary: Update an existing course by ID
 * tags: [Courses]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: The course ID
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * title:
 * type: string
 * code:
 * type: string
 * responses:
 * 200:
 * description: Course updated successfully.
 * 404:
 * description: Course not found.
 */
router.put("/:id", updateCourse)

/**
 * @swagger
 * /api/v2/courses:
 * post:
 * summary: Create a new course
 * tags: [Courses]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * required:
 * - title
 * - code
 * properties:
 * title:
 * type: string
 * code:
 * type: string
 * responses:
 * 201:
 * description: Course successfully created.
 * 400:
 * description: Invalid input.
 */
router.post("/", createCourse);

/**
 * @swagger
 * /api/v2/courses/{id}:
 * delete:
 * summary: Delete a course record by ID
 * tags: [Courses]
 * parameters:
 * - in: path
 * name: id
 * schema:
 * type: string
 * required: true
 * description: The course ID
 * responses:
 * 204:
 * description: Course deleted successfully.
 * 404:
 * description: Course not found.
 */
router.delete("/:id", deleteCourse);

export default router;
