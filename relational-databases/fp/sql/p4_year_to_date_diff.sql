-- Task 4: Year → Jan 1 date, CURDATE(), years difference (sample rows)
USE pandemic;

SELECT
    e.Entity,
    e.Code,
    c.Year,
    MAKEDATE(c.Year, 1) AS year_start_date,
    CURDATE() AS today,
    TIMESTAMPDIFF(YEAR, MAKEDATE(c.Year, 1), CURDATE()) AS years_diff
FROM cases c
JOIN entities e ON e.entity_id = c.entity_id
ORDER BY e.Entity, c.Year
LIMIT 20;
