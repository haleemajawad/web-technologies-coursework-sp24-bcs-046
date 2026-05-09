// Sapphire assignment 4 storefront + admin panel
// This Express app serves the public product pages and a protected admin
// interface for managing product data in MongoDB.
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const Product = require("./models/product");
const ejsLayouts = require("express-ejs-layouts");
const session = require("express-session");

const app = express();

// Middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(ejsLayouts);
app.set("layout", "admin/layout");

app.use(session({
  secret: "sapphire-secret-key",
  resave: false,
  saveUninitialized: false
}));

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Database
mongoose.connect("mongodb://localhost:27017/sapphire")
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log("MongoDB error:", err));

// Auth middleware
// Protects admin routes by checking whether the user has an active admin session.
function isAdmin(req, res, next) {
  if (req.session.isAdmin) {
    next();
  } else {
    res.redirect("/admin/login");
  }
}

// ── PUBLIC ROUTES ──
// Routes available to all visitors, including the storefront and category filtering.
app.get("/", function (req, res) {
  return res.render("index", { layout: false });
});

app.get("/products", async function (req, res) {
  try {
    const search      = req.query.search   || "";
    const category    = req.query.category || "";
    const minPrice    = parseInt(req.query.minPrice) || 0;
    const maxPrice    = parseInt(req.query.maxPrice) || 999999;
    const currentPage = parseInt(req.query.page) || 1;
    const limit = 8;

    const filter = { price: { $gte: minPrice, $lte: maxPrice } };
    if (search)   filter.name     = { $regex: search, $options: "i" };
    if (category) filter.category = category;

    const totalProducts = await Product.countDocuments(filter);
    const totalPages    = Math.ceil(totalProducts / limit);
    const products      = await Product.find(filter)
      .skip((currentPage - 1) * limit)
      .limit(limit);

    res.render("products", {
      layout: false,
      products, search, category,
      minPrice, maxPrice, currentPage, totalPages
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

// ── LOGIN ROUTES ──
// Handles admin sign-in using a simple username/password form.
// Note: credentials are currently hardcoded for this assignment.
app.get("/admin/login", function (req, res) {
  res.render("admin/login", { layout: "admin/layout", page: "login", error: null });
});

app.post("/admin/login", function (req, res) {
  const { username, password } = req.body;
  if (username === "sapphire" && password === "123456") {
    req.session.isAdmin = true;
    res.redirect("/admin");
  } else {
    res.render("admin/login", { layout: "admin/layout", page: "login", error: "Invalid username or password" });
  }
});

app.get("/admin/logout", function (req, res) {
  req.session.destroy();
  res.redirect("/admin/login");
});

// ── ADMIN ROUTES ──
// Admin pages are only available after successful login.
app.get("/admin", isAdmin, async function (req, res) {
  const products = await Product.find();
  res.render("admin/dashboard", { layout: "admin/layout", products, page: "dashboard" });
});

app.get("/admin/add", isAdmin, function (req, res) {
  res.render("admin/add", { layout: "admin/layout", page: "add" });
});

app.post("/admin/add", isAdmin, upload.single("image"), async function (req, res) {
  const { name, price, category, rating, stock } = req.body;
  const imageUrl = req.file ? "/uploads/" + req.file.filename : "";
  await Product.create({ name, price, category, rating, stock, imageUrl });
  res.redirect("/admin");
});

app.get("/admin/edit/:id", isAdmin, async function (req, res) {
  const product = await Product.findById(req.params.id);
  res.render("admin/edit", { layout: "admin/layout", product, page: "edit" });
});

app.post("/admin/edit/:id", isAdmin, upload.single("image"), async function (req, res) {
  const { name, price, category, rating, stock } = req.body;
  const update = { name, price, category, rating, stock };
  if (req.file) update.imageUrl = "/uploads/" + req.file.filename;
  await Product.findByIdAndUpdate(req.params.id, update);
  res.redirect("/admin");
});

app.post("/admin/delete/:id", isAdmin, async function (req, res) {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect("/admin");
});

app.listen(3000, function () {
  console.log("Server started at localhost:3000");
});