import connectMongoose from "../../libs/mongodb";
import ClassDiscussion from "../../models/classDiscussionModel";
import Class from "../../models/classModel";
import User from "../../models/userModel";

export default async function handler(req, res) {
  await connectMongoose();

  if (req.method === "POST") {
    const { classId, uid, comment } = req.body;

    try {
      const classExists = await Class.findById(classId);
      if (!classExists) {
        return res.status(404).json({ message: "Class not found" });
      }

      const userExists = await User.findOne({ uid });
      if (!userExists) {
        return res.status(404).json({ message: "User not found" });
      }

      const newDiscussion = new ClassDiscussion({
        class: classId,
        postedBy: userExists._id,
        comment,
      });

      await newDiscussion.save();
      res
        .status(201)
        .json({ message: "Class discussion created", newDiscussion });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating class discussion", error });
    }
  } else if (req.method === "GET") {
    const { classId } = req.query;

    try {
      let discussions;
      if (classId) {
        discussions = await ClassDiscussion.find({ class: classId })
          .populate("class", "name topic date time")
          .populate("postedBy", "name");
      } else {
        discussions = await ClassDiscussion.find()
          .populate("class", "name topic date time")
          .populate("postedBy", "name");
      }
      res.status(200).json({ discussions });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching class discussions", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
