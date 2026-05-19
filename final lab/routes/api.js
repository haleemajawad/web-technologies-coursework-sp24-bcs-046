const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Product = require("../models/Product");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Order = require("../models/Order");
const { verifyToken } = require("../middlewares/auth"); // adjust path if needed

router.get("/api/v1/products", async function (req, res) {
  try {
    const search = req.query.search || "";
    const category = req.query.category || "";
    const minPrice = parseInt(req.query.minPrice) || 0;
    const maxPrice = parseInt(req.query.maxPrice) || 999999;
    const currentPage = parseInt(req.query.page) || 1;
    const limit = 8;

    const filter = { price: { $gte: minPrice, $lte: maxPrice } };
    if (search) filter.name = { $regex: search, $options: "i" };
    if (category) filter.category = category;
    const skip = (currentPage - 1) * limit;
    const totalProducts = await Product.countDocuments(filter);
    const totalPages = Math.ceil(totalProducts / limit);
    const products = await Product.find(filter).skip(skip).limit(limit);

    res.json(products);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});
router.get("/api/v1/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/api/v1/auth/login", async function (req, res) {
  try {
    const email = req.body.email;
    const password = req.body.password;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    } else {
      const ismatch = await bcrypt.compare(password, user.password);
      if (!ismatch) {
        return res.status(401).json({ message: "Invalid email or password" });
      } else {
        const token = jwt.sign(
          { user_id: user._id, role: user.role },
          process.env.JWT_SECRET,
          { expiresIn: "6h" },
        );
        return res.json({ token });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});
//POST /api/v1/orders       → create an order (needs verifyToken)

router.post("/api/v1/orders", verifyToken, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.user_id;
    const order = new Order({
      userId,
      productId,
      quantity,
    });
    await order.save();
    res.status(201).json({ message: "Order created successfully", order });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//GET  /api/v1/user/profile → return logged-in user's data (needs verifyToken)
router.get("/api/v1/user/profile", verifyToken, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/api/sales-data", async function (req, res) {
  try {
    const orders = await Order.find().populate("productId");

    const totalOrders = orders.length;

    let totalRevenue = 0;
    orders.forEach(function (order) {
      if (order.productId && order.productId.price) {
        totalRevenue += order.productId.price * order.quantity;
      }
    });

    const topSelling = await Order.aggregate([
      { $group: { _id: "$productId", totalSold: { $sum: "$quantity" } } },
      { $sort: { totalSold: -1 } },
      { $limit: 1 }
    ]);

    let topProductName = "N/A";
    if (topSelling.length > 0) {
      const prod = await Product.findById(topSelling[0]._id);
      if (prod) topProductName = prod.name;
    }

    res.json({ totalRevenue, totalOrders, topProductName });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
module.exports = router;
