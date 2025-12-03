import Student from "../models/student-information.js";
import StudentIdGenerator from "../utils/studentIdGenerator.js";

// done http response - Creates a student with an automatically generated studentId
export async function createStudent(req, res) {
    try {
        const {firstName, lastName, email} = req.body;
        // Use the imported StudentIdGenerator for the custom studentId
        const newStudent = new Student({ 
            firstName,
            lastName,  
            studentId: StudentIdGenerator(), 
            email
        });
        const savedStudent = await newStudent.save();
        res.status(201).json({ message: "New Student created", student: savedStudent});
    } catch (error) {
        console.error("Error creating student:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

// done http response
export async function getAllStudent(req, res) {
    try {
        const students = await Student.find();
        res.status(200).json({message :"Successful getting all students", students});
    } catch (error) {
        console.error("Error fetching students:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

// find student by custom studentId
// done http response
export async function getStudent(req, res) {
    try {
        const targetStudentId = req.params.id;
        // Find by custom studentId, not MongoDB's _id
        const getStudentByCustomId = await Student.findOne({ studentId: targetStudentId });

        if (!getStudentByCustomId) {
            return res.status(404).json({ message: "Student not found" });
        } else {
            res.status(200).json({message: "Successfull getting student by studentId", getStudentByCustomId});
        }
    } catch (error) {
        console.error("Error fetching student:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

// update student by custom studentId
// done http response
export async function updateStudent(req, res) {
    try {
        const { firstName, lastName, email } = req.body;
        const targetStudentId = req.params.id;
        
        // Update by custom studentId
        const updatedStudent = await Student.findOneAndUpdate(
            { studentId: targetStudentId },
            { firstName, lastName, email},
            { new: true, runValidators: true }
        );

        if (!updatedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }else{
            res.status(200).json({message: "Successfull updating student", updatedStudent});
        }
    } catch (error) {
        console.error("Error updating student:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

// delete student by custom studentId
// done http response
export async function deleteStudent(req, res) {
    try {
        const targetStudentId = req.params.id;
        // Delete by custom studentId
        const deletedStudent = await Student.findOneAndDelete({ studentId: targetStudentId });
        
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

// done http response - Fetches student grades using MongoDB aggregation
export async function getStudentGrades(req, res) {
    try {
        const targetStudentId = req.params.id;

        const pipeline = [

            { $match: { studentId: targetStudentId } },

            { $unwind: "$coursesEnrolled" },

            {
                $lookup: {
                    from: "courseinformations", 
                    localField: "coursesEnrolled.courseCode", 
                    foreignField: "courseCode",    
                    as: "courseDetails"
                }
            },

            { $unwind: { path: "$courseDetails", preserveNullAndEmptyArrays: true } },

            {
                $group: {
                    _id: "$_id",
                    firstName: { $first: "$firstName" },
                    lastName: { $first: "$lastName" },
                    email: { $first: "$email" },
                    createdAt: { $first: "$createdAt" },

                    enrollments: {
                        $push: {
                            courseName: "$courseDetails.title",
                            units: "$courseDetails.units", 
                            grade: { $arrayElemAt: ["$coursesEnrolled.grades", 0] } 
                        }
                    }
                }
            },

            {
                $project: {
                    _id: 0,
                    id: "$_id",
                    firstName: 1,
                    lastName: 1,
                    email: 1,
                    createdAt: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
                    enrollments: 1
                }
            }
        ];

        // Execute the pipeline and get the first result
        const [studentData] = await Student.aggregate(pipeline);

        if (!studentData) {
            // Check if student exists at all
            const studentExists = await Student.findOne({ studentId: targetStudentId });
            if (!studentExists) {
                 return res.status(404).json({ message: `Student with ID ${targetStudentId} not found.` });
            }
            // If student exists but has no enrollments/grades, return their basic info
            return res.status(200).json({
                message: "Student found, but has no enrollments or grades.",
                studentData: {
                    id: studentExists._id,
                    firstName: studentExists.firstName,
                    lastName: studentExists.lastName,
                    email: studentExists.email,
                    createdAt: studentExists.createdAt.toISOString().split('T')[0],
                    enrollments: []
                }
            });
        }

        res.status(200).json({message:"Successfull fetching student grades", studentData});

    } catch (error) {
        console.error("Error fetching student grades:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}
