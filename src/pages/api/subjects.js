import dbConnect from "../../libs/mongodb";
import Subject from "../../models/subjectModel";
import Semester from "../../models/semesterModel";
import User from "../../models/userModel";

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === "POST") {
    const { name, uid, semesterId } = req.body;

    const teacher = await User.findOne({ uid: uid });
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    const semester = await Semester.findById(semesterId);
    if (!semester) {
      return res.status(404).json({ message: "Semester not found" });
    }

    const newSubject = new Subject({
      name,
      teacher: teacher._id,
      semester: semester._id,
    });

    try {
      await newSubject.save();
      res.status(201).json({ message: "Subject created", newSubject });
    } catch (error) {
      res.status(500).json({ message: "Error creating subject", error });
    }
  } else if (req.method === "GET") {
    const { uid, semesterId } = req.query;

    try {
      let subjects;
      if (uid) {
        const teacher = await User.findOne({ uid });
        if (!teacher) {
          return res.status(404).json({ message: "Teacher not found" });
        }
        subjects = await Subject.find({ teacher: teacher._id })
          .populate("teacher", "name")
          .populate("semester", "name")
          .sort({ createdAt: 1 });
      } else if (semesterId) {
        const semester = await Semester.findById(semesterId);
        if (!semester) {
          return res.status(404).json({ message: "Semester not found" });
        }
        subjects = await Subject.find({ semester: semester._id })
          .populate("teacher", "name")
          .populate("semester", "name")
          .sort({ createdAt: 1 });
      } else {
        return res
          .status(400)
          .json({ message: "No teacher or semester specified" });
      }
      res.status(200).json({ subjects });
    } catch (error) {
      res.status(500).json({ message: "Error fetching subjects", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
