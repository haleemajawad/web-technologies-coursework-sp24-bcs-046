const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name:      String,   // Product name displayed on storefront and admin table
  price:     Number,   // Numeric price in Pakistani Rupees
  category:  String,   // Example: Lawn 3-Piece, Cotton Shirt, Suit Set
  rating:    Number,   // Product rating between 1 and 5
  stock:     Number,   // Quantity available for display and admin stock warnings
  imageUrl:  String    // URL or relative path to the product image
});

module.exports = mongoose.model("Product", productSchema);