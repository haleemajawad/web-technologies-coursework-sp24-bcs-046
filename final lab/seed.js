// Seed script for the Sapphire assignment 4 project.
// This file inserts a set of example products into MongoDB for local testing.
const mongoose = require("mongoose");
require("dotenv").config();
const Product = require("./models/product"); // import the Mongoose model
mongoose.connect(MONGO_URI)
  .then(() => console.log("Connected!"))
  .catch((err) => console.log(err));

const imageUrls = [
  "https://pk.sapphireonline.pk/dw/image/v2/BKSB_PRD/on/demandware.static/-/Sites-sapphire-master-catalog/default/dwe9988f04/images/April26/30thApril26/PBO26P4V170O_999_1.jpg?sw=1000&sh=1200",
  "https://pk.sapphireonline.pk/dw/image/v2/BKSB_PRD/on/demandware.static/-/Sites-sapphire-master-catalog/default/dw38fa8803/images/April26/30thApril26/PB26SCHMV747_999_1.jpg?sw=1000&sh=1200",
  "https://pk.sapphireonline.pk/dw/image/v2/BKSB_PRD/on/demandware.static/-/Sites-sapphire-master-catalog/default/dwd7c6c409/images/April26/30thApril26/2TNS26FMV605_999_1.jpg?sw=1000&sh=1200",
  "https://pk.sapphireonline.pk/dw/image/v2/BKSB_PRD/on/demandware.static/-/Sites-sapphire-master-catalog/default/dw58602f98/images/April26/30thApril26/2TNS26FMV606_999_1.jpg?sw=1000&sh=1200",
  "https://pk.sapphireonline.pk/dw/image/v2/BKSB_PRD/on/demandware.static/-/Sites-sapphire-master-catalog/default/dwcc6d7a3e/images/April26/30thApril26/3TNS26FMV603_999_1.jpg?sw=1000&sh=1200",
  "https://pk.sapphireonline.pk/dw/image/v2/BKSB_PRD/on/demandware.static/-/Sites-sapphire-master-catalog/default/dw9c0f5372/images/April26/30thApril26/PBO26P4V166O_999_1.JPG?sw=1000&sh=1200",
  "https://pk.sapphireonline.pk/dw/image/v2/BKSB_PRD/on/demandware.static/-/Sites-sapphire-master-catalog/default/dw9a2c6bce/images/May26/6thMay26/PBS26SCH658S_999_2.JPG?sw=1000&sh=1200",
  "https://pk.sapphireonline.pk/dw/image/v2/BKSB_PRD/on/demandware.static/-/Sites-sapphire-master-catalog/default/dwff4d9bf1/images/April26/30thApril26/PBO26P4V172O_999_1.JPG?sw=1000&sh=1200"
];

const products = [
  { name: "Luxury Lawn 3-Piece Suit",             price: 4500,  category: "Lawn 3-Piece",     rating: 4.7, stock: 40, imageUrl: imageUrls[0] },
  { name: "Printed Cotton Shirt",                  price: 2800,  category: "Cotton Shirt",      rating: 4.5, stock: 55, imageUrl: imageUrls[1] },
  { name: "Embroidered Lawn 2-Piece Set",          price: 4200,  category: "Lawn 2-Piece",     rating: 4.6, stock: 30, imageUrl: imageUrls[2] },
  { name: "Silk Print Shirt",                      price: 5200,  category: "Silk Shirt",        rating: 4.6, stock: 22, imageUrl: imageUrls[3] },
  { name: "Premium Lawn Kurti",                    price: 5500,  category: "Lawn Kurti",       rating: 4.4, stock: 25, imageUrl: imageUrls[4] },
  { name: "Cambric Cotton Shirt",                  price: 2200,  category: "Cotton Shirt",      rating: 4.3, stock: 60, imageUrl: imageUrls[5] },
  { name: "Bridal Lawn 3-Piece",                   price: 8900,  category: "Lawn 3-Piece",     rating: 4.9, stock: 15, imageUrl: imageUrls[6] },

  { name: "Vintage Lawn 2-Piece Set",              price: 3800,  category: "Lawn 2-Piece",     rating: 4.5, stock: 50, imageUrl: imageUrls[7] },
  { name: "Embroidered Cotton Kurta",              price: 3200,  category: "Cotton Kurta",     rating: 4.7, stock: 35, imageUrl: imageUrls[0] },
  { name: "Digital Print Lawn 3-Piece",            price: 3800,  category: "Lawn 3-Piece",     rating: 4.4, stock: 45, imageUrl: imageUrls[1] },
  { name: "Linen Printed 2-Piece Set",             price: 3200,  category: "Lawn 2-Piece",     rating: 4.3, stock: 40, imageUrl: imageUrls[2] },
  { name: "Pure Cotton Shirt",                     price: 2900,  category: "Cotton Shirt",      rating: 4.2, stock: 55, imageUrl: imageUrls[3] },

  { name: "Heritage Lawn 3-Piece Suit",            price: 5200,  category: "Lawn 3-Piece",     rating: 4.5, stock: 50, imageUrl: imageUrls[4] },
  { name: "Lawn 2-Piece Palazzo Set",              price: 4200,  category: "Lawn 2-Piece",     rating: 4.6, stock: 35, imageUrl: imageUrls[5] },
  { name: "Pure Cotton Casual Shirt",              price: 1800,  category: "Cotton Shirt",      rating: 4.3, stock: 70, imageUrl: imageUrls[6] },
  { name: "Floral Lawn 3-Piece",                   price: 2800,  category: "Lawn 3-Piece",     rating: 4.4, stock: 40, imageUrl: imageUrls[7] },
  { name: "Lawn 2-Piece Summer Set",                price: 5500,  category: "Lawn 2-Piece",     rating: 4.7, stock: 22, imageUrl: imageUrls[0] },

  { name: "Cotton Night Shirt",                    price: 2500,  category: "Cotton Shirt",      rating: 4.5, stock: 30, imageUrl: imageUrls[1] },
  { name: "Printed Lawn Kurti",                    price: 1800,  category: "Lawn Kurti",       rating: 4.4, stock: 45, imageUrl: imageUrls[2] },
  { name: "Luxury Cotton 3-Piece",                 price: 3200,  category: "Cotton 3-Piece",    rating: 4.6, stock: 28, imageUrl: imageUrls[3] },
  { name: "Soft Lawn 2-Piece",                     price: 1200,  category: "Lawn 2-Piece",     rating: 4.3, stock: 60, imageUrl: imageUrls[4] },

  { name: "Emerald Silk Suit Set",                 price: 4800,  category: "Suit Set",         rating: 4.8, stock: 25, imageUrl: imageUrls[5] },
  { name: "Rose Gold Lawn Suit",                   price: 7200,  category: "Suit Set",         rating: 4.9, stock: 15, imageUrl: imageUrls[6] },
  { name: "Classic Cotton Suit",                   price: 2200,  category: "Suit Set",         rating: 4.5, stock: 40, imageUrl: imageUrls[7] },
];

async function seedDB() {
  // Clear existing products before seeding so the dataset remains stable.
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log("24 Sapphire products added to database!");
  mongoose.connection.close();
}

seedDB();
