const mongoose = require("mongoose");

const librarySchema = mongoose.Schema({
  file: {
    type: String,
    required: [true, "Please add filename"],
  },
  display: {
    type: String,
    required: [true, "Please add display"],
  }
});

module.exports = mongoose.model("Library", librarySchema);
