-- Task 2 — DML: seed LibraryManagement with sample rows
USE LibraryManagement;

INSERT INTO authors (author_name) VALUES
    ('Taras Shevchenko'),
    ('Lesya Ukrainka');

INSERT INTO genres (genre_name) VALUES
    ('Poetry'),
    ('Drama');

-- YEAR type accepts 1901–2155 in MySQL 8, so use reprint years for sample data
INSERT INTO books (title, publication_year, author_id, genre_id) VALUES
    ('Kobzar', 2001, 1, 1),
    ('Forest Song', 2011, 2, 2);

INSERT INTO users (username, email) VALUES
    ('ivan.petrenko', 'ivan.petrenko@example.com'),
    ('olena.koval', 'olena.koval@example.com');

INSERT INTO borrowed_books (book_id, user_id, borrow_date, return_date) VALUES
    (1, 1, '2026-01-10', '2026-01-24'),
    (2, 2, '2026-02-01', NULL);
