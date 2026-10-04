-- goit-rdb-hw-03
-- Topic 3. Data loading and SQL basics. DQL commands

-- =============================================================================
-- Task 1.1 — Select all columns from products
-- =============================================================================
SELECT *
FROM products;


-- =============================================================================
-- Task 1.2 — Select name and phone from shippers
-- =============================================================================
SELECT name, phone
FROM shippers;


-- =============================================================================
-- Task 2 — Average, maximum and minimum price from products
-- =============================================================================
SELECT
    AVG(price) AS avg_price,
    MAX(price) AS max_price,
    MIN(price) AS min_price
FROM products;


-- =============================================================================
-- Task 3 — Distinct category_id and price, ordered by price DESC, limit 10
-- =============================================================================
SELECT DISTINCT
    category_id,
    price
FROM products
ORDER BY price DESC
LIMIT 10;


-- =============================================================================
-- Task 4 — Count products with price between 20 and 100 (inclusive)
-- =============================================================================
SELECT COUNT(*) AS products_count
FROM products
WHERE price BETWEEN 20 AND 100;


-- =============================================================================
-- Task 5 — Product count and average price per supplier
-- =============================================================================
SELECT
    supplier_id,
    COUNT(*) AS products_count,
    AVG(price) AS avg_price
FROM products
GROUP BY supplier_id;
