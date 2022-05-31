const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Brand = require("../model/brandModel");
/**
 * @desc    Create Brand
 * @route   POST /api/brand/
 * @access  Private
 */
const createBrand = asyncHandler(async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);
    throw new Error("Please add name");
  }
  // Check if brand exists
  const brandExists = await Brand.findOne({ name });

  if (brandExists) {
    res.status(400);
    throw new Error("brand already exists");
  }

  const brand = await Brand.create({
    name,
  });

  if (brand) {
    res.status(201).json({
      name: brand.name,
    });
  } else {
    res.status(400);
    throw new Error("Invalid brand data");
  }
});

/**
 *  @desc    get all Brand
 *  @route   GET /api/brand/
 *  @access  Public
 * */

const viewBrands = asyncHandler(async (req, res) => {
  const brands = await Brand.find();
  res.status(200).json({ brands });
});

/**
 * @desc    Delete Brand
 * @route   DELETE /api/brand/:id
 * @access  Private
 * */
const deleteBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand) {
    res.status(400);
    throw new Error("brand not found");
  }
  await Brand.findByIdAndDelete(req.params.id);
  res.status(201).json({
    id: brand.id,
  });
});

/**
 * @desc    update Brand
 * @route   PUT /api/brand/:id
 * @access  Private
 * */
const updateBrand = asyncHandler(async (req, res) => {
  const brand = await Brand.findById(req.params.id);

  if (!brand) {
    res.status(400);
    throw new Error(`Brand not found`);
  }

  const updatedBrand = await Brand.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.status(200).json(updatedBrand);
});

/**
 *  @desc    Get a Single Brand
 *  @route   GET /api/brand/:id
 *  @access  Public
 * */

const viewBrand = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const brand = await Brand.find({ _id: id });

  if (!exists(id)) {
    res.status(404).json({
      message: "Brand not found",
      code: res.statusCode,
    });
  } else {
    res.status(200).json({
      code: 200,
      brand: brand,
    });
  }
});
function exists(id) {
  return mongoose.Types.ObjectId.isValid(id);
}

module.exports = {
  createBrand,
  viewBrands,
  viewBrand,
  deleteBrand,
  updateBrand,
};
