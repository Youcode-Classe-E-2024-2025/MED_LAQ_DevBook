
CREATE DATABASE DevBooks



USE DevBooks;


CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    
    name VARCHAR(100) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


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
) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;


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

) ENGINE=InnoDB CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;