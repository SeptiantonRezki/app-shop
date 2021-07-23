const catchAsync = require("../utils/catchAsync");
const Product = require("../models/productModel");

exports.getProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  res.status(200).json({
    status: "success",
    data: product,
  });
});
exports.createProduct = catchAsync(async (req, res, next) => {
  const { name, description, price, stock } = req.body;
  const product = await Product.create({
    name,
    description,
    price,
    stock,
  });

  res.status(201).json({
    status: "success",
    data: product,
  });
});
exports.getAllProduct = catchAsync(async (req, res, next) => {
  const product = await Product.find({});

  res.status(200).json({
    status: "success",
    data: product,
  });
});
exports.updateProduct = catchAsync(async (req, res, next) => {
  const { name, description, price, stock } = req.body;

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name,
      description,
      price,
      stock,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  res.status(201).json({
    status: "success",
    data: product,
  });
});
exports.deleteProduct = catchAsync(async (req, res, next) => {
  await Product.findByIdAndDelete(req.params.id, {});

  res.status(204).json({
    status: "success",
    data: null,
  });
});
