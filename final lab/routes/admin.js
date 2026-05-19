const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Product = require("../models/Product");
const Order = require("../models/Order");
const { isLoggedIn, isAdmin } = require("../middlewares/auth");

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, "public/uploads"); },
  filename: function (req, file, cb) { cb(null, Date.now() + path.extname(file.originalname)); }
});
const upload = multer({ storage });

// Dashboard
router.get("/", isLoggedIn, isAdmin, async function (req, res) {
  try {
    const products = await Product.find();
    res.render("admin/dashboard", { layout: "admin/layout", products, page: "dashboard" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

// Add product - GET
router.get("/add", isLoggedIn, isAdmin, function (req, res) {
  res.render("admin/add", { layout: "admin/layout", page: "add" });
});

// Add product - POST
router.post("/add", isLoggedIn, isAdmin, upload.single("image"), async function (req, res) {
  try {
    const { name, price, category, rating, stock } = req.body;

    if (!name || !price || !category) {
      req.flash("error", "Name, price and category are required");
      return res.redirect("/admin/add");
    }
    if (price < 0 || stock < 0) {
      req.flash("error", "Price and stock cannot be negative");
      return res.redirect("/admin/add");
    }

    const imageUrl = req.file ? "/uploads/" + req.file.filename : "";
    await Product.create({ name, price, category, rating, stock, imageUrl });
    req.flash("success", "Product added successfully");
    res.redirect("/admin");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

// Edit product - GET
router.get("/edit/:id", isLoggedIn, isAdmin, async function (req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      req.flash("error", "Product not found");
      return res.redirect("/admin");
    }
    res.render("admin/edit", { layout: "admin/layout", product, page: "edit" });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

// Edit product - POST
router.post("/edit/:id", isLoggedIn, isAdmin, upload.single("image"), async function (req, res) {
  try {
    const { name, price, category, rating, stock } = req.body;

    if (!name || !price || !category) {
      req.flash("error", "Name, price and category are required");
      return res.redirect("/admin/edit/" + req.params.id);
    }
    if (price < 0 || stock < 0) {
      req.flash("error", "Price and stock cannot be negative");
      return res.redirect("/admin/edit/" + req.params.id);
    }

    const update = { name, price, category, rating, stock };
    if (req.file) update.imageUrl = "/uploads/" + req.file.filename;
    await Product.findByIdAndUpdate(req.params.id, update);
    req.flash("success", "Product updated successfully");
    res.redirect("/admin");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

// Delete product - POST
router.post("/delete/:id", isLoggedIn, isAdmin, async function (req, res) {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      req.flash("error", "Product not found");
      return res.redirect("/admin");
    }
    await Product.findByIdAndDelete(req.params.id);
    req.flash("success", "Product deleted successfully");
    res.redirect("/admin");
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

module.exports = router;