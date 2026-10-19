-- ===== p1_extract_year_month_day.sql =====
USE goit_rdb_hw_03;

SELECT
    id,
    date,
    YEAR(date) AS year,
    MONTH(date) AS month,
    DAY(date) AS day
FROM orders;

-- ===== p2_date_add_one_day.sql =====
USE goit_rdb_hw_03;

SELECT
    id,
    date,
    DATE_ADD(date, INTERVAL 1 DAY) AS date_plus_one_day
FROM orders;

-- ===== p3_unix_timestamp.sql =====
USE goit_rdb_hw_03;

SELECT
    id,
    date,
    UNIX_TIMESTAMP(date) AS unix_timestamp
FROM orders;

-- ===== p4_count_date_between.sql =====
USE goit_rdb_hw_03;

SELECT COUNT(*) AS orders_count
FROM orders
WHERE date BETWEEN '1996-07-10 00:00:00' AND '1996-10-08 00:00:00';

-- ===== p5_json_object.sql =====
USE goit_rdb_hw_03;

SELECT
    id,
    date,
    JSON_OBJECT('id', id, 'date', date) AS order_json
FROM orders;
