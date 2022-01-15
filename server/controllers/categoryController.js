const Category = require("../models/Category");
const Post = require("../models/Post");

//Fetch all categories
exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (err) {
    res.status(500).json({
      message: "Error while fetching categories",
    });
  }
};

//Add a category
exports.addCategory = async (req, res) => {
  try {
    const newCategory = new Category(req.body);
    const savedCategory = await newCategory.save();

    res.status(201).json(savedCategory);
  } catch (err) {
    res.status(500).json({
      message: "Error adding category",
      err,
    });
  }
};

//Get Category
exports.getCategory = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    res.status(200).json(category);
  } catch (err) {
    res.status(500).json({
      message: "Error fetching category",
      err,
    });
  }
};

//Get posts by category
exports.getPostsByCategory = async (req, res) => {
  try {
    const posts = await Post.find({ categoryId: req.params.id });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
};
