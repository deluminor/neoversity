-- Task 4 — complex queries based on the Task 3 join
USE goit_rdb_hw_03;

-- -----------------------------------------------------------------------------
-- 4.1 Count rows from the full INNER JOIN
-- -----------------------------------------------------------------------------
SELECT COUNT(*) AS rows_count
FROM order_details AS od
INNER JOIN orders AS o
    ON od.order_id = o.id
INNER JOIN customers AS c
    ON o.customer_id = c.id
INNER JOIN products AS p
    ON od.product_id = p.id
INNER JOIN categories AS cat
    ON p.category_id = cat.id
INNER JOIN employees AS e
    ON o.employee_id = e.employee_id
INNER JOIN shippers AS sh
    ON o.shipper_id = sh.id
INNER JOIN suppliers AS s
    ON p.supplier_id = s.id;


-- -----------------------------------------------------------------------------
-- 4.2 Replace some INNER JOINs with LEFT / RIGHT and compare row counts
-- Example A: LEFT JOIN customers (keep all orders even without a matching customer)
-- -----------------------------------------------------------------------------
SELECT COUNT(*) AS rows_count_left_customers
FROM order_details AS od
INNER JOIN orders AS o
    ON od.order_id = o.id
LEFT JOIN customers AS c
    ON o.customer_id = c.id
INNER JOIN products AS p
    ON od.product_id = p.id
INNER JOIN categories AS cat
    ON p.category_id = cat.id
INNER JOIN employees AS e
    ON o.employee_id = e.employee_id
INNER JOIN shippers AS sh
    ON o.shipper_id = sh.id
INNER JOIN suppliers AS s
    ON p.supplier_id = s.id;

-- Example B: RIGHT JOIN shippers (keep all shippers even without matching orders)
SELECT COUNT(*) AS rows_count_right_shippers
FROM order_details AS od
INNER JOIN orders AS o
    ON od.order_id = o.id
INNER JOIN customers AS c
    ON o.customer_id = c.id
INNER JOIN products AS p
    ON od.product_id = p.id
INNER JOIN categories AS cat
    ON p.category_id = cat.id
INNER JOIN employees AS e
    ON o.employee_id = e.employee_id
RIGHT JOIN shippers AS sh
    ON o.shipper_id = sh.id
INNER JOIN suppliers AS s
    ON p.supplier_id = s.id;


-- -----------------------------------------------------------------------------
-- 4.3 Keep only rows where employee_id > 3 AND employee_id <= 10
-- -----------------------------------------------------------------------------
SELECT
    od.id AS order_detail_id,
    o.id AS order_id,
    e.employee_id,
    e.first_name,
    e.last_name,
    cat.name AS category_name,
    od.quantity
FROM order_details AS od
INNER JOIN orders AS o
    ON od.order_id = o.id
INNER JOIN customers AS c
    ON o.customer_id = c.id
INNER JOIN products AS p
    ON od.product_id = p.id
INNER JOIN categories AS cat
    ON p.category_id = cat.id
INNER JOIN employees AS e
    ON o.employee_id = e.employee_id
INNER JOIN shippers AS sh
    ON o.shipper_id = sh.id
INNER JOIN suppliers AS s
    ON p.supplier_id = s.id
WHERE e.employee_id > 3
  AND e.employee_id <= 10;


-- -----------------------------------------------------------------------------
-- 4.4 Group by category name: row count + average quantity
-- -----------------------------------------------------------------------------
SELECT
    cat.name AS category_name,
    COUNT(*) AS rows_count,
    AVG(od.quantity) AS avg_quantity
FROM order_details AS od
INNER JOIN orders AS o
    ON od.order_id = o.id
INNER JOIN customers AS c
    ON o.customer_id = c.id
INNER JOIN products AS p
    ON od.product_id = p.id
INNER JOIN categories AS cat
    ON p.category_id = cat.id
INNER JOIN employees AS e
    ON o.employee_id = e.employee_id
INNER JOIN shippers AS sh
    ON o.shipper_id = sh.id
INNER JOIN suppliers AS s
    ON p.supplier_id = s.id
GROUP BY cat.name;


-- -----------------------------------------------------------------------------
-- 4.5 Keep groups where average quantity > 21
-- -----------------------------------------------------------------------------
SELECT
    cat.name AS category_name,
    COUNT(*) AS rows_count,
    AVG(od.quantity) AS avg_quantity
FROM order_details AS od
INNER JOIN orders AS o
    ON od.order_id = o.id
INNER JOIN customers AS c
    ON o.customer_id = c.id
INNER JOIN products AS p
    ON od.product_id = p.id
INNER JOIN categories AS cat
    ON p.category_id = cat.id
INNER JOIN employees AS e
    ON o.employee_id = e.employee_id
INNER JOIN shippers AS sh
    ON o.shipper_id = sh.id
INNER JOIN suppliers AS s
    ON p.supplier_id = s.id
GROUP BY cat.name
HAVING AVG(od.quantity) > 21;


-- -----------------------------------------------------------------------------
-- 4.6 Sort by row count descending
-- -----------------------------------------------------------------------------
SELECT
    cat.name AS category_name,
    COUNT(*) AS rows_count,
    AVG(od.quantity) AS avg_quantity
FROM order_details AS od
INNER JOIN orders AS o
    ON od.order_id = o.id
INNER JOIN customers AS c
    ON o.customer_id = c.id
INNER JOIN products AS p
    ON od.product_id = p.id
INNER JOIN categories AS cat
    ON p.category_id = cat.id
INNER JOIN employees AS e
    ON o.employee_id = e.employee_id
INNER JOIN shippers AS sh
    ON o.shipper_id = sh.id
INNER JOIN suppliers AS s
    ON p.supplier_id = s.id
GROUP BY cat.name
HAVING AVG(od.quantity) > 21
ORDER BY rows_count DESC;


-- -----------------------------------------------------------------------------
-- 4.7 Show four rows, skipping the first one (OFFSET 1 LIMIT 4)
-- -----------------------------------------------------------------------------
SELECT
    cat.name AS category_name,
    COUNT(*) AS rows_count,
    AVG(od.quantity) AS avg_quantity
FROM order_details AS od
INNER JOIN orders AS o
    ON od.order_id = o.id
INNER JOIN customers AS c
    ON o.customer_id = c.id
INNER JOIN products AS p
    ON od.product_id = p.id
INNER JOIN categories AS cat
    ON p.category_id = cat.id
INNER JOIN employees AS e
    ON o.employee_id = e.employee_id
INNER JOIN shippers AS sh
    ON o.shipper_id = sh.id
INNER JOIN suppliers AS s
    ON p.supplier_id = s.id
GROUP BY cat.name
HAVING AVG(od.quantity) > 21
ORDER BY rows_count DESC
LIMIT 4 OFFSET 1;
