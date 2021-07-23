const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stock: { type: Number, min: 0 },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
