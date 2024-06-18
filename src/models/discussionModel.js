import mongoose, { Schema } from "mongoose";

const discussionSchema = new Schema(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    discussion: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Discussion =
  mongoose.models.Discussion || mongoose.model("Discussion", discussionSchema);

export default Discussion;
