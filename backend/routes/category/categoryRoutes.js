const express = require("express");
const { createCategory, 
    fetchCategories, 
    fetchSingleCategory, 
    updateCategory, 
    deleteCategory} = require("../../controllers/category/categoryController");
const authMiddleware = require("../../middlewares/auth/authMiddleware");
const categoryRoute = express.Router();

categoryRoute.post("/", authMiddleware,createCategory);
categoryRoute.get("/",fetchCategories);
categoryRoute.get("/:id",fetchSingleCategory);
categoryRoute.put("/:id", authMiddleware,updateCategory);
categoryRoute.delete("/:id", authMiddleware,deleteCategory);
module.exports = categoryRoute;
