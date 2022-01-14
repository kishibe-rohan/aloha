const Category = require("../models/Category");

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
