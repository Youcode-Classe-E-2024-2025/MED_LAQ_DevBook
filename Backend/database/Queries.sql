-- 1. Liste des utilisateurs ayant emprunté un livre, avec nombre d'emprunts, trié par date descendante
SELECT u.username, COUNT(br.id) AS borrow_count, MAX(br.borrow_date) AS last_borrow
FROM users u
JOIN borrow_records br ON u.id = br.user_id
GROUP BY u.id
ORDER BY last_borrow DESC;

-- 2. Livres non rendus et en retard
SELECT b.*, br.due_date
FROM books b
JOIN borrow_records br ON b.id = br.book_id
WHERE br.status != 'returned' AND br.due_date < NOW();

-- 3. Catégories et nombre de livres par catégorie
SELECT c.name, COUNT(b.id) AS book_count
FROM categories c
LEFT JOIN books b ON c.id = b.category_id
GROUP BY c.id;

-- 4. Catégorie ayant le plus de livres empruntés en premier
SELECT c.name, COUNT(br.id) AS borrow_count
FROM categories c
JOIN books b ON c.id = b.category_id
JOIN borrow_records br ON b.id = br.book_id
GROUP BY c.id
ORDER BY borrow_count DESC
LIMIT 1;

-- 5. Emprunts à une date donnée (exemple avec :selected_date)
SELECT * FROM borrow_records
WHERE DATE(borrow_date) = :selected_date;

-- 6. Top 10 des livres les plus empruntés sur un mois donné (exemple avec :selected_month)
SELECT b.title, COUNT(br.id) AS borrow_count
FROM books b
JOIN borrow_records br ON b.id = br.book_id
WHERE MONTH(br.borrow_date) = :selected_month AND YEAR(br.borrow_date) = :selected_year
GROUP BY b.id
ORDER BY borrow_count DESC
LIMIT 10;
