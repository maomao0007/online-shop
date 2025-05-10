const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/auth");
const { Product } = require("../models");

router.get("/", authenticateToken,  async (req, res) => {
  try {
    const products = await Product.findAll(); 
    res.json({ success: true, data: products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;