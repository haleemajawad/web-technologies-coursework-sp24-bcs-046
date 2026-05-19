require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const ejsLayouts = require("express-ejs-layouts");
const session = require("express-session");
const { MongoStore } = require("connect-mongo");
const flash = require("connect-flash");

const app = express();

// ── DATABASE ──
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log("MongoDB error:", err));

// ── MIDDLEWARE ──
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(ejsLayouts);
app.set("layout", "admin/layout");

// ── SESSION ──
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI })
}));

// ── FLASH ──
app.use(flash());
app.use(function (req, res, next) {
  res.locals.currentUser = req.session.user;
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  next();
});

// ── ROUTES ──
const authRoutes  = require("./routes/auth");
const apiRouter   = require("./routes/api");
const adminRouter = require("./routes/admin");
const salesRouter = require("./routes/sales");

app.use("/", authRoutes);       // /login, /register, /logout
app.use("/", apiRouter);        // /api/v1/...
app.use("/admin", adminRouter); // /admin, /admin/add, /admin/edit/:id ...
app.use("/sales", salesRouter); // /sales

// ── PUBLIC ROUTES ──
const Product = require("./models/Product");

app.get("/", function (req, res) {
  res.render("index", { layout: false });
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

// ── START ──
app.listen(process.env.PORT, function () {
  console.log(`Server started at localhost:${process.env.PORT}`);
});