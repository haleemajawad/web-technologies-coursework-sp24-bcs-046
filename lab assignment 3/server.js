require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const Product = require("./models/product");
const ejsLayouts = require("express-ejs-layouts");
const session = require("express-session");
const {MongoStore} = require("connect-mongo");
const flash = require("connect-flash");
const { isLoggedIn, isAdmin } = require('./middlewares/auth');

const app = express();

// 1. DATABASE FIRST
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log("MongoDB error:", err));

// 2. BASIC MIDDLEWARE
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(ejsLayouts);
app.set("layout", "admin/layout");

// 3. SESSION AFTER DATABASE
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    })
}));

// 4. FLASH AFTER SESSION
app.use(flash());
app.use(function(req, res,next) {
  res.locals.currentUser = req.session.user;
    res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
    next();
});

// 5. MULTER
const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, "public/uploads"); },
  filename: function (req, file, cb) { cb(null, Date.now() + path.extname(file.originalname)); }
});
const upload = multer({ storage: storage });


// 7. ROUTES LAST
const authRoutes = require('./routes/auth');
app.use('/', authRoutes);





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


// ── ADMIN ROUTES ──
// Admin pages are only available after successful login.
app.get("/admin",  isLoggedIn, isAdmin, async function (req, res) {
  const products = await Product.find();
  res.render("admin/dashboard", { layout: "admin/layout", products, page: "dashboard" });
});

app.get("/admin/add", isLoggedIn, isAdmin, function (req, res) {
  res.render("admin/add", { layout: "admin/layout", page: "add" });
});

app.post("/admin/add", isLoggedIn, isAdmin, upload.single("image"), async function (req, res) {
  const { name, price, category, rating, stock } = req.body;
  const imageUrl = req.file ? "/uploads/" + req.file.filename : "";
  await Product.create({ name, price, category, rating, stock, imageUrl });
  res.redirect("/admin");
});

app.get("/admin/edit/:id", isLoggedIn, isAdmin, async function (req, res) {
  const product = await Product.findById(req.params.id);
  res.render("admin/edit", { layout: "admin/layout", product, page: "edit" });
});

app.post("/admin/edit/:id", isLoggedIn, isAdmin, upload.single("image"), async function (req, res) {
  const { name, price, category, rating, stock } = req.body;
  const update = { name, price, category, rating, stock };
  if (req.file) update.imageUrl = "/uploads/" + req.file.filename;
  await Product.findByIdAndUpdate(req.params.id, update);
  res.redirect("/admin");
});

app.post("/admin/delete/:id", isLoggedIn, isAdmin, async function (req, res) {
  await Product.findByIdAndDelete(req.params.id);
  res.redirect("/admin");
});


app.listen(process.env.PORT, function () {
  console.log(`Server started at localhost:${process.env.PORT}`);
});