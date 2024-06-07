import connectMongoose from "../../libs/mongodb";
import Semester from "../../models/semesterModel";

export default async function handler(req, res) {
  await connectMongoose();

  if (req.method === "POST") {
    const { name } = req.body;
    console.log(name);
    await Semester.create({ name });
    res.status(201).json({ message: "POST request processed" });
  } else if (req.method === "GET") {
    const semesters = await Semester.find();
    res.status(200).json({ semesters });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
