const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const mongoose = require("mongoose");
const { Recording, User } = require("../models/");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + ".ogg"); //Appending .ogg
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("recording"), async (req, res) => {
  const recording = await Recording.create({
    filename: req.file.filename,
    path: req.file.path,
    display: req.body.recordingName,
    user: mongoose.Types.ObjectId(req.body.userid),
  });
  res.status(201).send(recording);
});

module.exports = router;
