class Book {
    constructor(id, title, author, categoryId, status, publishedDate, isbn, createdAt) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.categoryId = categoryId;
        this.status = status;
        this.publishedDate = publishedDate;
        this.isbn = isbn;
        this.createdAt = createdAt;
    }
    borrow() {
        this.status = 'borrowed';
    }

    return() {
        this.status = 'available';
    }
}