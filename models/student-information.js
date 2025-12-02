import mongoose from "mongoose";

// --- 1. Sub-Schema for a single Course Enrollment (The Array Item) ---
const courseEnrollmentSchema = new mongoose.Schema(
    {
        // This is the ID that links to your Course model (e.g., "CS101")
        courseCode: {
            type: String,
            required: true
        },
        // CORRECTED: This must be an array to allow pushing multiple grades,
        // as your 'gradeStudent' controller attempts to do.
        grades: {
            type: [Number], // <-- CORRECTED to an array of Numbers
            default: []     // Initialize as an empty array
        },
        // You might add the date they enrolled here if needed
        enrollmentDate: {
            type: Date,
            default: Date.now
        }
    },
    // We set _id: false because we don't need a unique ID for every course object
    // inside the student's array. The student's ID is the main identifier.
    { _id: false }
);

// --- 2. Main Student Information Schema ---
const studentInformationSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true // It's good practice to ensure emails are unique
        },
        // The unique ID used to identify the student in the API (e.g., 101)
        studentId: {
            type: String,
            required: true,
            unique: true // Ensures only one student document per student ID
        },

        // This is the new field that handles the "many course enrolled" requirement.
        // It's an array of the courseEnrollmentSchema objects.
        coursesEnrolled: {
            type: [courseEnrollmentSchema],
            default: []
        }
    },
    { timestamps: true }
);

const StudentInformation = mongoose.model(
    "StudentInformation", 
    studentInformationSchema
);

export default StudentInformation;
