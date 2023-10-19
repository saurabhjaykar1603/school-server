// Import the Express library
import express from "express";

// Create an instance of the Express application
const app = express();
app.use(express.json());

// health
app.get("/health", (req, res) => {
  res.json({
    success: true,
    message: "All set ",
  });
});

// Set the port number for the server
const PORT = 4000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Starting Express server on port ${PORT}`);
});
