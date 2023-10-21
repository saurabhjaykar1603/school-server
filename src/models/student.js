import { Schema, model } from "mongoose";
// Schema design
const studentSchema = new Schema({
  name: String,
  age: Number,
  email: String,
  mobile: String,
});

// model

const Student = model("Student", studentSchema);
export default Student