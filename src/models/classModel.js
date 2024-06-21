import mongoose, { Schema } from "mongoose";

const classSchema = new Schema(
  {
    subject: {
      type: Schema.Types.ObjectId,
      ref: "Subject",
      required: true,
    },
    topic: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Class = mongoose.models.Class || mongoose.model("Class", classSchema);

export default Class;
