import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  uid: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  roll: {
    type: Number,
    required: true,
    unique: true,
  },
  semester: {
    type: Schema.Types.ObjectId,
    ref: "Semester",
    required: false,
  },
  role: {
    type: String,
    enum: ["Student", "Teacher"],
    required: true,
  },
});

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
