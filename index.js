// Import the Express library
import express from "express";

// Create an instance of the Express application
const app = express();
app.use(express.json());

// Initialize an empty array to store student data
const students = [];

// Define a GET request route at "/students" to read all students from the array
app.get("/students", (req, res) => {
  // Respond with a JSON object containing the list of students and a success message
  res.json({
    success: true,
    students: students,
    message: "read all students from the array successfully",
  });
});

// Define a POST request route at "/students" to add a new student
app.post("/students", (req, res) => {
  // Extract student data from the request body
  const { name, email, mobile, gmail, age } = req.body;

  // Generate a random ID for the new student
  const id = Math.floor(Math.random() * 10000);

  // Create a new student object
  const newStudent = {
    id,
    name,
    email,
    mobile,
    gmail,
    age,
  };

  // Add the new student to the "students" array
  students.push(newStudent);

  // Respond with a JSON object indicating success and the updated list of students
  res.json({
    success: true,
    students: students,
    message: "student successfully added",
  });
});

app.get("/student", (req, res) => {
  const { id } = req.query;
  let student = null;
  students.forEach((stud) => {
    if (stud.id == id) {
      student = stud;
    }
  });

  res.json({
    success: true,
    data: student,
    message: "Student fetched successfully",
  });

  if (student == null) {
    res.json({
      success: false,
      message: "Student not found",
    });
  }
});

// Define a "health" endpoint at "/health" to check the server's status
app.get("/health", (req, res) => {
  // Respond with a simple health check message
  res.json({
    success: true,
    message: "All set done",
  });
});

// Set the port number for the server to listen on
const PORT = 4000;

// Start the Express server and log a message to the console when it's running
app.listen(PORT, () => {
  console.log(`Starting Express server on port ${PORT}`);
});
