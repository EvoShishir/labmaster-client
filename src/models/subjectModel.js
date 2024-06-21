import mongoose, { Schema } from "mongoose";

const subjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    semester: {
      type: Schema.Types.ObjectId,
      ref: "Semester",
      required: true,
    },
  },
  { timestamps: true }
);

const Subject =
  mongoose.models.Subject || mongoose.model("Subject", subjectSchema);

export default Subject;
