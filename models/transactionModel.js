const mongoose = require("mongoose");
const Product = require("./productModel");

const ObjectId = mongoose.Schema.ObjectId;
const transactionSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "User",
    },
    subtotal: {
      type: Number,
    },
    products: [
      {
        product: {
          type: ObjectId,
          ref: "product",
          require: [true, "transaction must have a product"],
        },
        count: {
          type: Number,
        },
      },
    ],
    purchaseAt: {
      type: Date,
      default: Date.now(),
    },
    status: {
      type: Boolean,
      default: false,
    },
    payAt: {
      type: Date,
      default: null
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// transactionSchema.

// transactionSchema.statics.calcSubtotal() = async function(idProduct){
//   await Promise.all(idProduct.map(async (id)  => {
//     const product = await Product.findById(id);
//     if(!product){
//       return
//     }
//   }))
// }

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
