const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/sapphire")
  .then(() => console.log("MongoDB connected!"))
  .catch((err) => console.log("MongoDB error:", err));

// Product Schema
const productSchema = new mongoose.Schema({
  name:     String,
  price:    Number,
  category: String,
  rating:   Number,
  stock:    Number,
  imageUrl: String
});
const Product = mongoose.model("Product", productSchema);

app.get("/", function (req, res) {
  return res.render("index");
});

app.get("/products", async function (req, res) {
  try {
    // Read query params
    const search   = req.query.search   || "";
    const category = req.query.category || "";
    const minPrice = parseInt(req.query.minPrice) || 0;
    const maxPrice = parseInt(req.query.maxPrice) || 999999;
    const currentPage = parseInt(req.query.page) || 1;
    const limit = 8;

    // Build filter object
    const filter = {
      price: { $gte: minPrice, $lte: maxPrice }
    };
    if (search)   filter.name     = { $regex: search, $options: "i" };
    if (category) filter.category = category;

    // Count total matching products for pagination
    const totalProducts = await Product.countDocuments(filter);
    const totalPages    = Math.ceil(totalProducts / limit);

    // Fetch the right page of products
    const products = await Product.find(filter)
      .skip((currentPage - 1) * limit)
      .limit(limit);

    res.render("products", {
      products,
      search,
      category,
      minPrice,
      maxPrice,
      currentPage,
      totalPages
    });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
});

app.listen(3000, function () {
  console.log("Server started at localhost:3000");
});