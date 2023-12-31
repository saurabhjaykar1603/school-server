// Import the Express library
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import Student from "./src/models/student.js";
dotenv.config();

// Create an instance of the Express application
const app = express();
app.use(express.json());

//  DATA BASE CONNECTION
const MONGODB_URI = process.env.MONGODB_URI;

const connectMongoDB = async () => {
  const conn = await mongoose.connect(MONGODB_URI);
  if (conn) {
    console.log("mongodb connect succeeded");
  }
};
connectMongoDB();

app.get("/students", async (req, res) => {
  const students = await Student.find();
  res.json({
    success: true,
    students: students,
    message: "read all students from the array successfully .",
  });
});
app.get("/student", async (req, res) => {
  // Extract the "id" from the request query
  const { email } = req.query;
  const studentEmail = await Student.findOne({ email: email });

  // If no student is found (student is still null), respond with a failure message
  if (studentEmail == null) {
    return res.json({
      success: false,
      message: "Student not found",
    });
  }

  // Respond with a JSON object indicating the success of the operation,
  // the data of the fetched student, and a success message
  res.json({
    success: true,
    data: studentEmail,
    message: "Student fetched successfully ",
  });
});

// Define a POST request route at "/students" to add a new student
app.post("/students", async (req, res) => {
  const { name, email, age, mobile } = req.body;
  const newStudent = new Student({
    name: name,
    age: age,
    mobile: mobile,
    email: email,
  });

  const saveStudent = await newStudent.save();

  // Respond with a JSON object indicating success and the updated list of students
  res.json({
    success: true,
    students: saveStudent,
    message: "student successfully added",
  });
});

// Define a "health" endpoint at "/health" to check the server's status
app.get("/health", (req, res) => {
  // Respond with a simple health check message
  res.json({
    success: true,
    message: "All set done",
  });
});

// delete student rq
app.delete("/student/:_id", async (req, res) => {
  const { _id } = req.params;
  await Student.deleteOne({ _id: _id });
  res.json({
    success: true,
    data: {},
    message: `Student deleted successfully ${_id}`,
  });
});

//put student   into the database and send it to the server with the student information it change whole feild
app.put("/student/:_id", async (req, res) => {
  const { _id } = req.params;
  const { name, email, age, mobile } = req.body;
  await Student.updateOne(
    { _id: _id },
    { $set: { email: email, name: name, age: age, mobile: mobile } }
  );
  if (!name) {
    // Check if the "name" field is missing in the request body
    res.json({
      success: false,
      message: "name is required",
    });
  }

  if (!email) {
    res.json({
      success: false,
      message: "email is required",
    });
  }

  if (!age) {
    res.json({
      success: false,
      message: "age is required",
    });
  }

  if (!mobile) {
    res.json({
      success: false,
      message: "mobile is required",
    });
  }

  const updateSave = await Student.findOne({ _id: _id });
  res.json({
    success: true,
    data: updateSave,
    message: `Student updated successfully ${_id}`,
  });
});

app.patch("/student/:_id", async (req, res) => {
  const { _id } = req.params;
  const { email, age, mobile, name } = req.body;
  const student = await Student.findById(_id);

  if (email) {
    student.email = email;
  }
  if (name) {
    student.name = name;
  }
  if (mobile) {
    student.mobile = mobile;
  }
  if (age) {
    student.age = age;
  }
  const updateStudentSave = await student.save();
  res.json({
    success: true,
    data: updateStudentSave,
    message: " Student Updated successfully",
  });
});

// Set the port number for the server to listen on
const PORT = 1000;

// Start the Express server and log a message to the console when it's running
app.listen(PORT, () => {
  console.log(`Starting Express server on port ${PORT}`);
});
