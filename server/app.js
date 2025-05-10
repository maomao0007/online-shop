require("dotenv").config();
const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const app = express();
const port = 3001; 

const sequelize = require("./models/index");
const { User, Product, Cart } = require("./models");
const authenticateToken = require("./middlewares/auth");
const orderRouter = require("./routes/order")
const cartRouter = require("./routes/cart");
const profileRouter = require("./routes/profile");
const productRouter = require("./routes/products");

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true, 
  })
);

app.use("/api/orders", orderRouter);
app.use("/api/cart", cartRouter);
app.use("/api/profile", profileRouter);
app.use("/api/products", productRouter);

// API: 註冊 
app.post("/api/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ success: false, message: "Email and password are required" });
  }

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

  const passwordHash = await bcrypt.hash(password, 10);

  const newUser = await User.create({ email, passwordHash });

  res.json({ success: true, message: "Registration successful" });
} catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
})

// API: 登入 
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res
        .status(401)
        .json({
          success: false,
          message: "Incorrect email or password. Please try again.",
        });
    }

    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res
        .status(401)
        .json({
          success: false,
          message: "Incorrect email or password. Please try again.",
        });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 3600000,
    });

    res.json({ success: true, message: "Login successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// API: 獲取目前使用者 
app.get("/api/me", (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    res.json({
      success: true,
      message: "User fetched successfully",
      data: {
        id: user.id,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(401).json({ success: false, message: "Invalid token" });
  }
});

// API: 登出 
app.post("/api/logout", (req, res) => {
  res.clearCookie("token");
  res.json({ success: true, message: "Logged out" });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
