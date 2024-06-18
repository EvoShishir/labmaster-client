import connectMongoose from "../../libs/mongodb";
import Semester from "../../models/semesterModel";
import User from "../../models/userModel";

export default async function handler(req, res) {
  await connectMongoose();

  if (req.method === "POST") {
    const { uid, name, email, roll, semesterId, role } = req.body;

    try {
      if (role !== "Teacher") {
        const semester = await Semester.findById(semesterId);
        if (!semester) {
          return res.status(404).json({ message: "Semester not found" });
        }
      }

      const newUser = new User({
        uid,
        name,
        email,
        roll,
        semester: semesterId,
        role: role,
      });

      await newUser.save();
      res.status(201).json({ message: "User created", newUser });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ message: "Error creating user", error });
    }
  } else if (req.method === "GET") {
    const { uid } = req.query;

    try {
      if (uid) {
        const user = await User.findOne({ uid: `${uid}` });

        if (user) {
          res.status(200).json({ user });
        } else {
          res.status(404).json({ message: "User not found" });
        }
      } else {
        const users = await User.find();
        res.status(200).json({ users });
      }
    } catch (error) {
      console.error("Error fetching user(s):", error);
      res.status(500).json({ message: "Error fetching user(s)", error });
    }
  } else if (req.method === "PUT") {
    const { uid, name, roll, semesterId, role } = req.body;

    try {
      const user = await User.findOne({ uid: uid });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (role !== "Teacher" && semesterId) {
        const semester = await Semester.findById(semesterId);
        if (!semester) {
          return res.status(404).json({ message: "Semester not found" });
        }
      }

      user.name = name || user.name;
      user.roll = roll || user.roll;
      if (role !== "Teacher") {
        user.semester = semesterId || user.semester;
      }
      user.role = user.role;

      await user.save();

      res.status(200).json({ message: "User updated", user });
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ message: "Error updating user", error });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
