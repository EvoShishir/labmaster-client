import mongoose, { Schema } from "mongoose";

const semesterSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
});

const Semester =
  mongoose.models.Semester || mongoose.model("Semester", semesterSchema);

export default Semester;
