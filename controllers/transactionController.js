const catchAsync = require("./../utils/catchAsync");
const AppError = require("./../utils/appError");
const Transaction = require("../models/transactionModel");
const Product = require("../models/productModel");
const e = require("express");

exports.addTransaction = catchAsync(async (req, res, next) => {
  let products = req.body.products;
  let check = [];
  let subTotal = 0;

  await Promise.all(
    products.map(async (value) => {
      const product = await Product.findById(value.id);
      if (!product) {
        check.push(false);
      } else if (product.stock === 0 || product.stock < value.count) {
        check.push(false);
      } else {
        check.push(true);
      }
    })
  );

  if (check.some((val) => val === false)) {
    return next(
      new AppError(
        "Stock product tidak tersedia sesuai jumlah pesanan anda",
        400
      )
    );
  } else {
    await Promise.all(
      products.map(async (value) => {
        const product = await Product.findById(value.id);
        subTotal = subTotal + product.price * value.count;
        product.stock = product.stock - value.count;
        await product.save();
      })
    );
  }
  const transaction = await Transaction.create({
    user: req.user._id,
    products: req.body.products,
    subtotal: subTotal,
  });

  res.status(201).json({
    status: "success",
    data: transaction,
  });
});
exports.updateTransaction = catchAsync(async (req, res, next) => {
  let products = req.body.products;
  let check = [];
  let subTotal = 0;

  await Promise.all(
    products.map(async (value) => {
      const product = await Product.findById(value.id);
      if (!product) {
        check.push(false);
      } else if (product.stock === 0 || product.stock < value.count) {
        check.push(false);
      } else {
        check.push(true);
      }
    })
  );

  if (check.some((val) => val === false)) {
    return next(
      new AppError(
        "Stock product tidak tersedia sesuai jumlah pesanan anda",
        400
      )
    );
  } else {
    await Promise.all(
      products.map(async (value) => {
        const product = await Product.findById(value.id);
        subTotal = subTotal + product.price * value.count;
        product.stock = product.stock - value.count;
        await product.save();
      })
    );
  }
  const transaction = await Transaction.create({
    user: req.user._id,
    products: req.body.products,
    subtotal: subTotal,
  });

  res.status(201).json({
    status: "success",
    data: transaction,
  });
});
exports.deleteTransaction = catchAsync(async (req, res, next) => {
  await Transaction.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: "success",
    data: null,
  });
});
exports.getTransaction = catchAsync(async (req, res, next) => {
  const transaction = await Transaction.findById(req.params.id);
  res.status(200).json({
    status: "success",
    data: transaction,
  });
});
exports.getAllTransaction = catchAsync(async (req, res, next) => {
  const transaction = await Transaction.find({});
  res.status(200).json({
    status: "success",
    data: transaction,
  });
});
exports.getAllTransactionByIdCurrentUser = catchAsync(
  async (req, res, next) => {
    const transaction = await Transaction.find({ user: req.user._id });
    res.status(200).json({
      status: "success",
      length: transaction.length,
      data: transaction,
    });
  }
);
exports.getAllTransactionByIdUser = catchAsync(async (req, res, next) => {
  const transaction = await Transaction.find({ user: req.params.id });
  res.status(200).json({
    status: "success",
    length: transaction.length,
    data: transaction,
  });
});
