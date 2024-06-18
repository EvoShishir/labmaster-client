import connectMongoose from "../../libs/mongodb";
import Attendance from "../../models/attendanceModel";
import Class from "../../models/classModel";

export default async function handler(req, res) {
  await connectMongoose();

  if (req.method === "POST") {
    const { classId, attendees } = req.body;

    try {
      const existingClass = await Class.findById(classId);
      if (!existingClass) {
        return res.status(404).json({ message: "Class not found" });
      }

      const existingAttendance = await Attendance.findOne({ classId: classId });
      if (existingAttendance) {
        return res
          .status(400)
          .json({ message: "Class already has attendance" });
      }

      let attendance = new Attendance({
        classId,
        attendees,
      });

      await attendance.save();

      res.status(201).json({ message: "Attendance created", attendance });
    } catch (error) {
      res.status(500).json({ message: "Error creating attendance", error });
    }
  } else if (req.method === "PUT") {
    const { classId, attendees } = req.body;

    try {
      const existingClass = await Class.findById(classId);
      if (!existingClass) {
        return res.status(404).json({ message: "Class not found" });
      }

      let attendance = await Attendance.findOne({ classId: classId });
      if (!attendance) {
        return res.status(404).json({ message: "Attendance not found" });
      }

      attendance.attendees = attendees;
      await attendance.save();

      res.status(200).json({ message: "Attendance updated", attendance });
    } catch (error) {
      res.status(500).json({ message: "Error updating attendance", error });
    }
  } else if (req.method === "GET") {
    const { attendanceId } = req.query;

    try {
      if (attendanceId) {
        const attendance = await Attendance.findById(attendanceId)
          .populate({
            path: "classId",
            select: "name date time createdBy", // Specify the fields to populate
            populate: [
              {
                path: "createdBy",
                select: "name",
              },
              {
                path: "semester",
                select: "name",
              },
            ],
          })
          .populate("attendees", "name roll");
        if (!attendance) {
          return res.status(404).json({ message: "Attendance not found" });
        }
        res.status(200).json({ attendance });
      } else {
        const attendances = await Attendance.find()
          .populate({
            path: "classId",
            select: "name date time", // Specify the fields to populate
            populate: [
              {
                path: "createdBy",
                select: "name",
              },
              {
                path: "semester",
                select: "name",
              },
            ],
          })
          .populate("attendees", "name");
        res.status(200).json({ attendances });
      }
    } catch (error) {
      res.status(500).json({ message: "Error fetching attendance", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
