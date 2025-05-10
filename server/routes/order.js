const express = require("express");
const router = express.Router();
const authenticateToken = require("../middlewares/auth");
const { Order, OrderItem, Product } = require("../models");

router.post("/", authenticateToken, async (req, res) => {
  const cart = req.body.cart;

  if (!cart || cart.length === 0) {
    return res.status(400).json({ success: false, message: "Cart is empty" });
  }

  try {
    const order = await Order.create({
      user_id: req.user.id,
      status: "pending",
    });

    const productIds = cart.map((item) => item.product_id);
    const products = await Product.findAll({ where: { id: productIds } });

    const orderItems = cart.map((item) => {
      const product = products.find((p) => p.id === item.product_id);
      return {
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: product.price
      };
    });

    await OrderItem.bulkCreate(orderItems);

    res.status(201).json({
      success: true,
      message: "Order created",
      orderId: order.id,
    });
  } catch (error) {
    console.error("Order error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

router.get("/", authenticateToken, async (req, res) => {
  try {
    const orders = await Order.findAll({
      where: { user_id: req.user.id },
      include: [
        {
          model: OrderItem,
          include: [
            {
              model: Product,
            },
          ],
        },
      ],     
      order: [["created_at", "DESC"]],
    });
    console.log("orders", orders);

    res.json({ success: true, data: orders.map((order) => order.toJSON()) });
  } catch (error) {
    console.error("Get orders error:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
