import BookRepository from "../Repository/BookRepository.js";

let bookRepository;

export const initializeBookController = (db) => {
  bookRepository = new BookRepository(db);
};

export const getAllBooks = async (req, res) => {
  try {
    const books = await bookRepository.findAll();
    res.status(200).json(books);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Failed to fetch books. Please try again later.",
        error: error.message,
      });
  }
};
