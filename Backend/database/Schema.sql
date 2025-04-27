
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE books (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    author VARCHAR(255) NOT NULL,
    category_id INT,
    published_date DATE,
    isbn VARCHAR(20) UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE borrow_records (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    book_id INT NOT NULL,
    borrow_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    return_date TIMESTAMP NULL DEFAULT NULL,
    due_date TIMESTAMP NOT NULL,
    status ENUM('active', 'returned', 'overdue') DEFAULT 'active',
    FOREIGN KEY (user_id) REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (book_id) REFERENCES books(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,
    INDEX idx_user_id (user_id),
    INDEX idx_book_id (book_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;



-- Insert fake users
INSERT INTO users (username, password_hash, email, role) VALUES
('alice', 'hash1', 'alice@example.com', 'user'),
('bob', 'hash2', 'bob@example.com', 'admin'),
('charlie', 'hash3', 'charlie@example.com', 'user'),
('david', 'hash4', 'david@example.com', 'user'),
('eve', 'hash5', 'eve@example.com', 'user'),
('frank', 'hash6', 'frank@example.com', 'user'),
('grace', 'hash7', 'grace@example.com', 'user'),
('heidi', 'hash8', 'heidi@example.com', 'user'),
('ivan', 'hash9', 'ivan@example.com', 'user'),
('judy', 'hash10', 'judy@example.com', 'user');

-- Insert fake categories
INSERT INTO categories (name, description) VALUES
('Fiction', 'Fictional books'),
('Non-Fiction', 'Non-fictional books'),
('Science', 'Science related books'),
('History', 'Historical books'),
('Biography', 'Biographies'),
('Children', 'Books for children'),
('Fantasy', 'Fantasy genre'),
('Mystery', 'Mystery and thriller'),
('Romance', 'Romantic novels'),
('Technology', 'Tech and programming books');

-- Insert fake books
INSERT INTO books (title, author, category_id, published_date, isbn) VALUES
('The Great Adventure', 'John Smith', 1, '2010-05-10', 'ISBN0001'),
('Learning SQL', 'Jane Doe', 10, '2018-03-15', 'ISBN0002'),
('Mystery Manor', 'Emily Stone', 8, '2012-07-21', 'ISBN0003'),
('Science 101', 'Albert Newton', 3, '2015-09-01', 'ISBN0004'),
('Love in Paris', 'Marie Claire', 9, '2017-02-14', 'ISBN0005'),
('The Young Detective', 'Sam Holmes', 6, '2019-11-11', 'ISBN0006'),
('History of Rome', 'Marcus Aurelius', 4, '2005-01-01', 'ISBN0007'),
('The Innovators', 'Walter Isaacson', 5, '2014-10-07', 'ISBN0008'),
('Fantasy World', 'Luna Moon', 7, '2020-06-30', 'ISBN0009'),
('Non-Fictional Life', 'Paul Real', 2, '2011-12-12', 'ISBN0010');

-- Insert fake borrow_records
INSERT INTO borrow_records (user_id, book_id, borrow_date, due_date, status) VALUES
(1, 1, '2024-06-01 10:00:00', '2024-06-15 10:00:00', 'active'),
(2, 2, '2024-06-02 11:00:00', '2024-06-16 11:00:00', 'returned'),
(3, 3, '2024-06-03 12:00:00', '2024-06-17 12:00:00', 'active'),
(4, 4, '2024-06-04 13:00:00', '2024-06-18 13:00:00', 'overdue'),
(5, 5, '2024-06-05 14:00:00', '2024-06-19 14:00:00', 'active'),
(6, 6, '2024-06-06 15:00:00', '2024-06-20 15:00:00', 'returned'),
(7, 7, '2024-06-07 16:00:00', '2024-06-21 16:00:00', 'active'),
(8, 8, '2024-06-08 17:00:00', '2024-06-22 17:00:00', 'active'),
(9, 9, '2024-06-09 18:00:00', '2024-06-23 18:00:00', 'overdue'),
(10, 10, '2024-06-10 19:00:00', '2024-06-24 19:00:00', 'active');