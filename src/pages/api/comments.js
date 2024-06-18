import Comment from "../../models/commentModel";
import User from "../../models/userModel";
import connectMongoose from "@/libs/mongodb";

export default async function handler(req, res) {
  await connectMongoose();

  if (req.method === "POST") {
    const { uid, post, comment } = req.body;

    try {
      const user = await User.findOne({ uid });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const newComment = new Comment({
        createdBy: user._id,
        post,
        comment,
      });
      await newComment.save();
      res.status(201).json({ message: "Comment created", newComment });
    } catch (error) {
      res.status(500).json({ message: "Error creating comment", error });
    }
  } else if (req.method === "GET") {
    const { postId } = req.query;

    try {
      const comments = await Comment.find({ post: postId })
        .populate("createdBy", "name")
        .populate("post", "discussion");
      res.status(200).json({ comments });
    } catch (error) {
      res.status(500).json({ message: "Error fetching comments", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
