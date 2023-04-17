const router = require("express").Router();
const multer = require("multer");
const mongoose = require("mongoose");
const { Library } = require("../models/");

const upload = multer({});

router.post("/", upload.single("recording"), async (req, res) => {
  const encoded = req.file.buffer.toString("base64");

  const library = await Library.create({
    file: encoded,
    display: req.body.recordingName,
  });
  res.status(201).send(library);
});

router.get("/", async (req, res) => {

  const library = await Library.find();
  res.status(200).send(library);
});

module.exports = router;
