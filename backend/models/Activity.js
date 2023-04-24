const mongoose = require("mongoose");

const activitySchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "Please add an user"],
  },
  libraryUrl: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Library",
    required: [true, "Please add a library"],
  }
});

module.exports = mongoose.model("Activity", activitySchema);
