const Category = require("../models/Category");

//Fetch all categories
exports.getCategories = async (req, res) => {
  try {
    const allCategories = await Category.find();
    res.status(200).json(allCategories);
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

    res.status(201).json({
      message: "Created new category successfully",
      savedCategory,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error adding category",
      err,
    });
  }
};
