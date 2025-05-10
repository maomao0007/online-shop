const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/auth");
const { User } = require("../models");

router.get("/", authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne({
      where: { email: req.user.email },
    });

    res.json({ success: true, data: user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;