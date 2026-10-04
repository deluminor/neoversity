-- Task 3 — INNER JOIN across all Topic 3 tables
USE goit_rdb_hw_03;

SELECT
    od.id AS order_detail_id,
    od.quantity,
    o.id AS order_id,
    o.date AS order_date,
    c.id AS customer_id,
    c.name AS customer_name,
    p.id AS product_id,
    p.name AS product_name,
    cat.id AS category_id,
    cat.name AS category_name,
    e.employee_id,
    e.first_name AS employee_first_name,
    e.last_name AS employee_last_name,
    sh.id AS shipper_id,
    sh.name AS shipper_name,
    s.id AS supplier_id,
    s.name AS supplier_name
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
