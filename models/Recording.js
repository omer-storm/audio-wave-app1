const mongoose = require("mongoose");

const recordingSchema = mongoose.Schema({
  filename: {
    type: String,
    required: [true, "Please add filename"],
  },
  path: {
    type: String,
    required: [true, "Please add path"],
  },
  display: {
    type: String,
    required: [true, "Please add display"],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please add an user"],
  }
});

module.exports = mongoose.model("Recording", recordingSchema);
