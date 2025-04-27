class Book {
    constructor(id, title, author, category_id, published_date, isbn, created_at) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.category_id = category_id;
        this.published_date = published_date;
        this.isbn = isbn;
        this.created_at = created_at;
    }
}

export default Book;


export const getAllBooks = (callback) => {
    db.query('SELECT * FROM books', (err, results) => {
      callback(err, results);
    });
  };
  
  // Add a new book
  export const addBook = (book, callback) => {
    db.query('INSERT INTO books SET ?', book, (err, results) => {
      callback(err, results);
    });
  };