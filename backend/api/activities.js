const router = require("express").Router();
const { Activity } = require("../models");

const { protect } = require("../middleware/authMiddleware");

// @desc    get actvity
// @route   GET /api/activities
// @access  Private
router.get("/", protect, async (req, res) => {
  const activity = await Activity.find();
  console.log(activity);
  // res.status(200).send(activity);
});

// @desc    Set actvity
// @route   POST /api/activities
// @access  Private
router.post("/", protect, async (req, res) => {
  const activityExists = await Activity.findOne({
    user: req.body.user,
    libraryUrl: req.body.record,
  });

  if (activityExists) {
    console.log(activityExists);
    res.status(400);
    throw new Error("Activity already exists");
  }

  const activity = await Activity.create({
    user: req.body.user,
    libraryUrl: req.body.record,
  });

  res.status(200).send(activity);
});

module.exports = router;
