import Student from "../models/student-information.js";

export async function createStudent(req, res) {
    try {
        const {name,studentId,email} = req.body;
        const newStudent = new Student({ name,studentId,email});
        const savedStudent = await newStudent.save();
        res.status(201).json(savedStudent);
    } catch (error) {
        console.error("Error creating student:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export async function getAllStudent(req, res) {
    try {
        const students = await Student.find();
        res.status(200).json(students);
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export async function getStudent(req, res) {
    try {
        const getStudentById = await Student.findById(req.params.id);
        if (!getStudentById) {
            return res.status(404).json({ message: "Student not found" });
        }else{
            res.status(200).json(getStudentById);
        }
    } catch (error) {
        console.error("Error fetching student:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export async function updateStudent(req, res) {
    try {
            const { name,studentId,email } = req.body;
            const updatedStudent = await Student.findByIdAndUpdate(
                req.params.id,
                { name,studentId,email},
                { new: true }
            );

            if (!updatedStudent) {
                return res.status(404).json({ message: "Student not found" });
            }else{
                res.status(200).json(updatedStudent);
            }
    } catch (error) {
        console.error("Error updating student:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

export async function deleteStudent(req, res) {
    try {
        const deletedStudent = await Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }else{
            res.status(200).json({ message: "Student deleted successfully" });
        }
    } catch (error) {
        console.error("Error deleting student:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

// Function to handle GET /students/:id/grades
export async function getStudentGrades(req, res) {
    try {
        const targetStudentId = req.params.id;

        const pipeline = [
            // 1. Match: Find the specific student document
            { $match: { studentId: targetStudentId } },

            // 2. Unwind: Deconstruct the coursesEnrolled array
            { $unwind: "$coursesEnrolled" },

            // 3. Lookup: Join with the CourseInformation collection
            {
                $lookup: {
                    from: "courseinformations", // The actual name of your courses collection
                    localField: "coursesEnrolled.courseCode", // Field in Student document (ITEL3, ITEL4)
                    foreignField: "courseCode",   // Field in Course document
                    as: "courseDetails"
                }
            },

            // 4. Unwind: Deconstruct the courseDetails array (as it's a one-to-one join)
            { $unwind: { path: "$courseDetails", preserveNullAndEmptyArrays: true } },

            // 5. Group: Reconstruct the student document and create the 'enrollments' array
            {
                $group: {
                    _id: "$_id", // Group by the student's _id
                    name: { $first: "$name" },
                    email: { $first: "$email" },
                    // dateOfBirth: { $first: "$dateOfBirth" }, // Include if present
                    createdAt: { $first: "$createdAt" },

                    enrollments: {
                        // Use $push to allow multiple entries if the student took the course twice
                        $push: {
                            // Extract course details from the joined 'courseDetails'
                            courseName: "$courseDetails.title", // Assuming 'title' is the name field
                            units: "$courseDetails.credits", // Assuming 'credits' is the units field

                            // Extract the single grade value from the embedded array: [2.75] -> 2.75
                            grade: { $arrayElemAt: ["$coursesEnrolled.grades", 0] }
                        }
                    }
                }
            },

            // 6. Project: Final shaping and field renaming for the desired output
            {
                $project: {
                    _id: 0,
                    id: "$_id", // Use the Mongo _id here to match your requested output
                    name: 1,
                    email: 1,
                    // dateOfBirth: 1,
                    createdAt: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    enrollments: 1
                }
            }
        ];

        const [studentData] = await Student.aggregate(pipeline);

        if (!studentData) {
            return res.status(404).json({ message: `Student with ID ${targetStudentId} not found.` });
        }

        res.status(200).json(studentData);

    } catch (error) {
        console.error("Error fetching student grades:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}
