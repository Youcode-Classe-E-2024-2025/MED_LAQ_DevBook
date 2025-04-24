class Borrow {
    constructor(id, userId, bookId, borrowDate, returnDate, dueDate, status) {
        this.id = id;
        this.userId = userId;
        this.bookId = bookId;
        this.borrowDate = borrowDate;
        this.returnDate = returnDate;
        this.dueDate = dueDate;
        this.status = status;
    }
}