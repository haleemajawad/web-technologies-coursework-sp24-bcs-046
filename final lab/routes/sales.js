const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Order = require("../models/Order");
const { isLoggedIn, isAdmin } = require("../middlewares/auth");

// GET /sales — render dashboard
router.get("/", isLoggedIn, isAdmin, async function (req, res) {
  try {
    const orders = await Order.find().populate("productId");

    const totalOrders = orders.length;

    let totalRevenue = 0;
    const productSales = {};

    orders.forEach(function (order) {
      if (order.productId && order.productId.price) {
        totalRevenue += order.productId.price * order.quantity;
      }
      if (order.productId && order.productId._id) {
        const id = order.productId._id.toString();
        if (!productSales[id]) {
          productSales[id] = { name: order.productId.name, total: 0 };
        }
        productSales[id].total += order.quantity;
      }
    });

    let topProduct = null;
    let maxSold = 0;
    Object.values(productSales).forEach(function (p) {
      if (p.total > maxSold) {
        maxSold = p.total;
        topProduct = p;
      }
    });

    const recentOrders = await Order.find()
      .populate("productId")
      .populate("userId", "name email")
      .sort({ createdAt: -1 })
      .limit(5);

    res.render("admin/sales", {
      layout: "admin/layout",
      page: "sales",
      totalRevenue,
      totalOrders,
      topProduct,
      recentOrders
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;