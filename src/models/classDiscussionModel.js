import mongoose, { Schema } from "mongoose";

const classDiscussionSchema = new Schema(
  {
    class: {
      type: Schema.Types.ObjectId,
      ref: "Class",
      required: true,
    },
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const ClassDiscussion =
  mongoose.models.ClassDiscussion ||
  mongoose.model("ClassDiscussion", classDiscussionSchema);

export default ClassDiscussion;
