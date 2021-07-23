const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.ObjectId;

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
    },
    products: [
      {
        product: { type: ObjectId, ref: "Product" },
        amount: { type: Number },
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

cartSchema.pre(/^find/, function (next) {
  this.populate({
    path: "user",
    select: "name",
  }).populate({
    path: "product",
    select: "name stock price",
  });
  next();
});

cartSchema.virtual("subTotal").get(function () {
  return this.product.price * this.amount;
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
