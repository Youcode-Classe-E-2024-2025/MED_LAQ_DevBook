import { categoryRepository } from "../Repository/CategoryRepository.js";

let categoriesRepository; // Declare categoriesRepository at the top

export const initializeCategoryController = (db) => {
  categoriesRepository = new categoryRepository(db); // Initialize it here
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await categoriesRepository.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to fetch categories. Please try again later.",
        error: error.message,
      });
  }
};
