const router = require("express").Router();
const multer = require("multer");
// const fs = require("fs");
const mongoose = require("mongoose");
const { Recording} = require("../models/");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "public/uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + ".ogg"); //Appending .ogg
//   },
// });

const upload = multer({ });

router.post("/", upload.single("recording"), async (req, res) => {
  const encoded = req.file.buffer.toString('base64');

  const recording = await Recording.create({
    file: encoded,
    display: req.body.recordingName,
    user: mongoose.Types.ObjectId(req.body.userid),
  });
  res.status(201).send(recording);
});

module.exports = router;
