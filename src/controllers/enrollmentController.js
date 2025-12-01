import Student from "../models/student-information.js";

// Function to handle POST /enroll
export async function enrollStudent(req, res) {
    try {
        const { studentId, courseCode } = req.body;

        if (!studentId || !courseCode) {
            return res.status(400).json({ message: "Missing studentId or courseCode in request body" });
        }

        // 1. Check if the student is already enrolled in the course
        const existingEnrollment = await Student.findOne({
            studentId: studentId,
            "coursesEnrolled.courseCode": courseCode // Mongoose dot notation to check inside the array
        });

        if (existingEnrollment) {
            return res.status(409).json({ message: `Student ${studentId} is already enrolled in course ${courseCode}` });
        }

        // 2. Add the new course to the coursesEnrolled array using $push
        const updatedStudent = await Student.findOneAndUpdate(
            { studentId: studentId }, // Find the student by the studentId provided in the body
            {
                $push: {
                    coursesEnrolled: {
                        courseCode: courseCode,
                        // grades will automatically default to [] as defined in the schema
                    }
                }
            },
            { new: true } // Return the updated document
        );

        if (!updatedStudent) {
            // If findOneAndUpdate didn't find the student
            return res.status(404).json({ message: `Student with ID ${studentId} not found` });
        }

        // Success: Return the updated student document
        res.status(201).json({
            message: "Student enrolled successfully",
            student: updatedStudent
        });

    } catch (error) {
        console.error("Error enrolling student:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export async function gradeStudent(req, res) {
    try {
        const { studentId, courseCode, grade } = req.body;

        if (!studentId || !courseCode || grade === undefined) {
            return res.status(400).json({ message: "Missing studentId, courseCode, or grade value" });
        }

        // 1. Find the student and the specific course within the coursesEnrolled array.
        // 2. Use the $push operator to add the new grade to that specific course's grades array.
        const updatedStudent = await Student.findOneAndUpdate(
            {
                studentId: studentId,
                "coursesEnrolled.courseCode": courseCode // Find the array element that matches the courseCode
            },
            {
                $push: { "coursesEnrolled.$.grades": grade } // The positional operator ($) targets the matched array element
            },
            { new: true } // Return the updated document
        );

        if (!updatedStudent) {
            // This happens if the student or the course enrollment is not found.
            return res.status(404).json({ message: `Enrollment for Student ${studentId} in Course ${courseCode} not found.` });
        }

        res.status(200).json({
            message: "Grade added successfully",
            student: updatedStudent
        });

    } catch (error) {
        console.error("Error adding grade:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}
