const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/auth");
const { Cart, Product } = require("../models");

router.delete("/clear", authenticateToken, async (req, res) => {
  try {
    await Cart.destroy({
      where: { user_id: req.user.id },
    });
    res.json({ success: true, message: "Cart cleared" });
  } catch (error) {
    console.error("Clear cart error:", error);
    res.status(500).json({ success: false, message: "Failed to clear cart" });
  }
});

router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const cartItemId = req.params.id;
    const { quantity } = req.body;

    if (!quantity || quantity < 1) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid quantity" });
    }

    const [updatedCount] = await Cart.update(
      { quantity },
      {
        where: {
          id: cartItemId,
          user_id: req.user.id,
        },
      }
    );

    if (updatedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found" });
    }

    res.json({ success: true, message: "Cart item updated" });
  } catch (error) {
    console.error("Error updating cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const cartItemId = req.params.id;

    const deletedCount = await Cart.destroy({
      where: {
        id: cartItemId,
        user_id: req.user.id,
      },
    });

    if (deletedCount === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Cart item not found" });
    }

    res.json({ success: true, message: "Cart item deleted" });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.post("/", authenticateToken, async (req, res) => {
  try {
    const { product_id, quantity = 1 } = req.body;
    // 檢查是否已加入購物車
    const existingItem = await Cart.findOne({
      where: {
        user_id: req.user.id,
        product_id,
      },
    });

    let cartItem;

    if (existingItem) {
      // 如果已存在，就增加數量
      existingItem.quantity += quantity;
      await existingItem.save();
      cartItem = existingItem;
    } else {
      // 如果不存在，就新增品項
      cartItem = await Cart.create({
        user_id: req.user.id,
        product_id,
        quantity,
      });
    }

    res.json({ success: true, data: cartItem });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// 取得Cart
router.get("/", authenticateToken, async (req, res) => {
  try {
    const cart = await Cart.findAll({
      where: { user_id: req.user.id },
      include: {
        model: Product,
        required: true,
        attributes: ["name", "price", "image"],
      },
    });

    res.json({ success: true, data: cart });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;