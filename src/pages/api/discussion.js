import connectMongoose from "../../libs/mongodb";
import Discussion from "../../models/discussionModel";
import User from "../../models/userModel";

export default async function handler(req, res) {
  await connectMongoose();

  if (req.method === "POST") {
    const { uid, discussion } = req.body;

    try {
      const user = await User.findOne({ uid });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const newDiscussion = new Discussion({
        createdBy: user._id,
        discussion,
      });

      await newDiscussion.save();
      res.status(201).json({ message: "Discussion created", newDiscussion });
    } catch (error) {
      res.status(500).json({ message: "Error creating discussion", error });
    }
  } else if (req.method === "GET") {
    const { discussionId } = req.query;

    try {
      if (discussionId) {
        const discussion = await Discussion.findById(discussionId).populate(
          "createdBy",
          "name"
        );
        if (!discussion) {
          return res.status(404).json({ message: "Discussion not found" });
        }
        res.status(200).json({ discussion });
      } else {
        const discussions = await Discussion.find()
          .sort({ createdAt: -1 })
          .populate("createdBy", "name");
        res.status(200).json({ discussions });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching discussions", error });
    }
  } else if (req.method === "PUT") {
    const { discussionId } = req.query;
    const { discussion } = req.body;

    try {
      const updatedDiscussion = await Discussion.findByIdAndUpdate(
        discussionId,
        { discussion },
        { new: true }
      ).populate("createdBy", "name");

      if (!updatedDiscussion) {
        return res.status(404).json({ message: "Discussion not found" });
      }

      res
        .status(200)
        .json({ message: "Discussion updated", updatedDiscussion });
    } catch (error) {
      res.status(500).json({ message: "Error updating discussion", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
