import categoryRepository from "../Repository/CategoryRepository.js";

let categoryRepository;

export const initializeCategoryController = (db) => {
  categoryRepository = new categoryRepository(db);
}
export const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryRepository.findAll();
    res.status(200).json(categories);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to fetch categories. Please try again later.",
        error: error.message,
      });
  }
}
