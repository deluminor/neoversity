-- ===== p1_select_subquery.sql =====
USE goit_rdb_hw_03;

SELECT
    od.*,
    (SELECT o.customer_id FROM orders AS o WHERE o.id = od.order_id) AS customer_id
FROM order_details AS od;

-- ===== p2_where_subquery.sql =====
USE goit_rdb_hw_03;

SELECT *
FROM order_details
WHERE order_id IN (SELECT id FROM orders WHERE shipper_id = 3);

-- ===== p3_from_subquery.sql =====
USE goit_rdb_hw_03;

SELECT
    t.order_id,
    AVG(t.quantity) AS avg_quantity
FROM (
    SELECT order_id, quantity
    FROM order_details
    WHERE quantity > 10
) AS t
GROUP BY t.order_id;

-- ===== p4_with_cte.sql =====
USE goit_rdb_hw_03;

WITH temp AS (
    SELECT order_id, quantity
    FROM order_details
    WHERE quantity > 10
)
SELECT
    order_id,
    AVG(quantity) AS avg_quantity
FROM temp
GROUP BY order_id;

-- ===== p5_divide_function.sql =====
USE goit_rdb_hw_03;

DROP FUNCTION IF EXISTS divide_float;

CREATE FUNCTION divide_float(dividend FLOAT, divisor FLOAT)
RETURNS FLOAT
DETERMINISTIC
NO SQL
RETURN dividend / divisor;

SELECT
    id,
    order_id,
    quantity,
    divide_float(quantity, 3) AS quantity_divided_by_3
FROM order_details;

