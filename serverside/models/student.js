const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  specialization: { type: String, required: true },
  education: { type: String, required: true },
  interest: { type: String, required: true },
  selfIntro: { type: String, required: true }
});

module.exports = mongoose.model("Student", studentSchema, "student");
