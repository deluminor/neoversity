-- Task 5: function — years between CURDATE() and Jan 1 of given Year
USE pandemic;

DROP FUNCTION IF EXISTS year_diff_from_today;

DELIMITER //

CREATE FUNCTION year_diff_from_today(p_year INT)
RETURNS INT
DETERMINISTIC
NO SQL
BEGIN
    RETURN TIMESTAMPDIFF(YEAR, MAKEDATE(p_year, 1), CURDATE());
END //

DELIMITER ;

SELECT
    e.Entity,
    e.Code,
    c.Year,
    MAKEDATE(c.Year, 1) AS year_start_date,
    CURDATE() AS today,
    year_diff_from_today(c.Year) AS years_diff
FROM cases c
JOIN entities e ON e.entity_id = c.entity_id
ORDER BY e.Entity, c.Year
LIMIT 20;
