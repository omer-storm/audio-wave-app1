const router = require("express").Router();
const multer = require("multer");
const { Library, Activity } = require("../models");
const { protect } = require("../middleware/authMiddleware");

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

router.get("/activities", protect, async (req, res) => {
  const library = await Library.aggregate([
    {
      $lookup: {
        from: "activities",
        localField: "_id",
        foreignField: "libraryUrl",
        as: "activity",
        pipeline: [
          {
            $match: {
              "user": req.user._id,
            },
          },
        ],
      },
    },
    // {
    //   $match: {
    //     "activity.user": req.user._id,
    //   },
    // },
  ]);
  // console.log(library);
  // res.end();
  res.status(200).send(library);
});

module.exports = router;
