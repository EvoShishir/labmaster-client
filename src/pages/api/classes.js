import connectMongoose from "../../libs/mongodb";
import Class from "../../models/classModel";
import Semester from "../../models/semesterModel";
import User from "../../models/userModel";

export default async function handler(req, res) {
  await connectMongoose();

  if (req.method === "POST") {
    const { name, uid, time, date, semesterId } = req.body;

    const user = await User.findOne({ uid: uid });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const semester = await Semester.findById(semesterId);
    if (!semester) {
      return res.status(404).json({ message: "Semester not found" });
    }

    const newClass = new Class({
      name,
      createdBy: user._id,
      semester: semester._id,
      time,
      date,
    });

    try {
      await newClass.save();
      res.status(201).json({ message: "Class created", newClass });
    } catch (error) {
      res.status(500).json({ message: "Error creating class", error });
    }
  } else if (req.method === "GET") {
    const { createdBy } = req.query;

    try {
      let classes;
      if (createdBy) {
        const user = await User.findOne({ uid: createdBy });
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        classes = await Class.find({ createdBy: user._id })
          .populate("createdBy", "name")
          .populate("semester", "name")
          .sort({ date: 1 });
      } else {
        // Fetch the user from the query parameter if not createdBy
        const { uid } = req.query;
        const user = await User.findOne({ uid: uid });
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        // Fetch classes where the user's semester matches the class semester
        classes = await Class.find({ semester: user.semester })
          .populate("createdBy", "name")
          .populate("semester", "name")
          .sort({ date: 1 });
      }
      res.status(200).json({ classes });
    } catch (error) {
      res.status(500).json({ message: "Error fetching classes", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
