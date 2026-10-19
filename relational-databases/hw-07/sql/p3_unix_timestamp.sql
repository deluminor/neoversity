USE goit_rdb_hw_03;

SELECT
    id,
    date,
    UNIX_TIMESTAMP(date) AS unix_timestamp
FROM orders;
