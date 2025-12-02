import Course from '../models/course-information.js';

// done http response
export async function createCourse(req, res) {
    try {
        const {courseCode, title, units} = req.body;
        const newCourse = new Course({ code, title});
        const savedCourse = await newCourse.save();
        res.status(201).json({message: "New Course created", savedCourse});
    } catch (error) {
        console.error("Error creating course:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

// done http response
export async function getAllCourse(req, res) {
    try {
        const courses = await Course.find();
        res.status(200).json({message:"Successful getting courses", courses});
    } catch (error) {
        console.error("Error fetching course:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

// done http response
export async function updateCourse(req, res) {
    try {
            // This function uses courseCode (req.params.id) to find the course
            const targetCourseCode = req.params.id;
            const {courseCode, title, units } = req.body;
            const updatedCourse = await Course.findOneAndUpdate(
                { courseCode: targetCourseCode },
                { courseCode, title, units},
                { new: true }
            );

            if (!updatedCourse) {
                return res.status(404).json({ message: "Course not found" });
            }else{
                res.status(200).json({message: "Course updated",updatedCourse});
            }
    } catch (error) {
        console.error("Error updating Course:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}

// done http response
export async function deleteCourse(req, res) {
    try {
        // This function uses courseCode (req.params.id) to find the course
        const targetCourseCode = req.params.id;
        const deletedCourse = await Course.findOneAndDelete({ courseCode: targetCourseCode });
        if (!deletedCourse) {
            return res.status(404).json({ message: "Course not found" });
        }else{
            res.status(200).json({ message: "Course deleted successfully" });
        }
    } catch (error) {
        console.error("Error deleting Course:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
}
