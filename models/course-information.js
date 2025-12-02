import mongoose from "mongoose";

const courseInformationSchema = new mongoose.Schema(
  {
    code: { type: String, required: true },
    courseCode: { type: String, required: true },
    title: { type: String, required: true },
    units: { type: Number, required: true },
  },
  { timestamps: true }
);

const CourseInformation = mongoose.model(
  "courseInformation",
  courseInformationSchema
);

export default CourseInformation;
