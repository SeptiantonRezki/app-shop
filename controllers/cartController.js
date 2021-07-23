const catchAsync = require("../utils/catchAsync");
const Cart = require("../models/cartModel");
const AppError = require("../utils/appError");

exports.addProductToCart = catchAsync(async (req, res, next) => {
  const { productId, amount } = req.body;
  if (await Cart.findOne({ product: productId })) {
    console.log("ok");
    return next(
      new AppError(
        "This item have been in the cart, use update cart for add count for this product",
        404
      )
    );
  }

  const cart = await Cart.create({
    user: req.user._id,
    product: productId,
    amount,
  });
  res.status(201).json({
    status: "success",
    data: cart,
  });
});
exports.deleteProductFromCart = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  await Cart.findByIdAndDelete(id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
exports.updateProductFromCart = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { productId, amount } = req.body;
  let cart;
  if (productId) {
    cart = await Cart.findOneAndUpdate(
      { product: productId },
      { amount },
      {
        new: true,
        runValidators: true,
      }
    );
  } else {
    cart = await Cart.findByIdAndUpdate(
      id,
      { amount },
      {
        new: true,
        runValidators: true,
      }
    );
  }
  res.status(201).json({
    status: "success",
    data: cart,
  });
});
exports.getAllProductInCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.find({user: req.user._id});

  res.status(200).json({
    status: "success",
    data: cart,
  });
});
exports.getProductInCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: cart,
  });
});

// jadi ketika masih di transaction dan belum di beli maka gak akan di update di product nya
