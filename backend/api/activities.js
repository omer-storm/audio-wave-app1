const router = require("express").Router();
const { Activity } = require("../models");

const { protect } = require("../middleware/authMiddleware");

// @desc    Set actvity
// @route   POST /api/activities
// @access  Private
router.post("/", protect, async (req, res) => {
  const activity = await Activity.create({
    user: req.body.user,
    libraryUrl: req.body.record,
  });
  res.status(200).send(activity);
});

module.exports = router;
