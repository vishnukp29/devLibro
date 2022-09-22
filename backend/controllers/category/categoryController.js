const expressAsyncHandler = require("express-async-handler");
const Category = require("../../models/category/categoryModel");

//Create Category
const createCategory = expressAsyncHandler(async (req, res) => {
  try {
    const category = await Category.create({
      user: req.user._id,
      title: req.body.title,
    });
    res.json(category);
  } catch (error) {
    res.json(error);
  }
});

//Fetch all Categories
const fetchCategories = expressAsyncHandler(async (req, res) => {
    try {
      const categories = await Category.find({})
        .populate("user")
        .sort("-createdAt");
      res.json(categories);
    } catch (error) {
      res.json(error);
    }
});

//fetch Single Category
const fetchSingleCategory = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const category = await Category.findById(id)
        .populate("user")
        .sort("-createdAt");
      res.json(category);
    } catch (error) {
      res.json(error);
    }
});

//Update Category
const updateCategory = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const category = await Category.findByIdAndUpdate(
        id,
        {
          title: req?.body?.title,
        },
        {
          new: true,
          runValidators: true,
        }
      );
      res.json(category);
    } catch (error) {
      res.json(error);
    }
});  

//Delete Category
const deleteCategory = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
      const category = await Category.findByIdAndDelete(id);
  
      res.json(category);
    } catch (error) {
      res.json(error);
    }
});

module.exports = { 
    createCategory, 
    fetchCategories, 
    fetchSingleCategory,
    updateCategory,
    deleteCategory
};
