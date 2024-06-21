import connectMongoose from "../../libs/mongodb";
import Class from "../../models/classModel";
import Subject from "../../models/subjectModel";

export default async function handler(req, res) {
  await connectMongoose();

  if (req.method === "POST") {
    const { subjectId, topic, time, date } = req.body;

    const subject = await Subject.findById(subjectId);
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    const newClass = new Class({
      subject: subject._id,
      topic,
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
    const { subjectId } = req.query;

    try {
      let classes;
      if (subjectId) {
        classes = await Class.find({ subject: subjectId })
          .populate("subject", "name")
          .sort({ createdAt: -1 });
      }
      res.status(200).json({ classes });
    } catch (error) {
      res.status(500).json({ message: "Error fetching classes", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
