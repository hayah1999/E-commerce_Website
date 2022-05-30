const asyncHandler = require("express-async-handler");
const mongoose = require("mongoose");
const Category = require("../model/categoryModel");

// @desc    Create Category 
// @route   POST /api/category/create
// @access  Private

const createCategory = asyncHandler(async (req, res) => {
    const { name } = req.body;
  
    if ( !name ) {
      res.status(400);
      throw new Error("Please add all fields");
    }
    // Check if category exists
    const categoryExists = await Category.findOne({ name });
  
    if (categoryExists) {
      res.status(400);
      throw new Error("category already exists");
    }
  
    const category = await Category.create({
      name
    });
  
    if (category) {
      res.status(201).json({
        name: category.name,
      });
    } else {
      res.status(400);
      throw new Error("Invalid category data");
    }
  });

// @desc    get all Category 
// @route   GET /api/category/view
// @access  Public

const viewCategory = asyncHandler(async (req, res) => {
  const categories = await Category.find();
  res.status(200).json({ categories });
});

// @desc    Delete Category 
// @route   DELETE /api/category/delete/:id
// @access  Private

const deleteCategory = asyncHandler(async (req, res) => {

  const category = await Category.findById(req.params.id);
  
  if (!category) {
    res.status(400);
    throw new Error("category not found");
  }
    await Category.findByIdAndDelete(req.params.id);
    res.status(201).json({
      id: category.id,
    });  
});

// @desc    update Category 
// @route   PUT /api/category/update/:id
// @access  Private

const updateCategory = asyncHandler(async (req, res) => {
  const category = await Category.findById(req.params.id);

  if(!category){
    res.status(400);
    throw new Error(`Category not found`);
  }

  const updatedCategory = await Category.findByIdAndUpdate(req.params.id , req.body, { new: true, });
  res.status(200).json(updatedCategory);
})

  module.exports = { createCategory, viewCategory , deleteCategory, updateCategory };