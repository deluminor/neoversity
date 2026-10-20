-- Task 3: AVG / MIN / MAX / SUM of Number_rabies per Entity+Code (top 10 by AVG DESC)
USE pandemic;

SELECT
    e.Entity,
    e.Code,
    AVG(CAST(c.Number_rabies AS DECIMAL(20, 6))) AS avg_rabies,
    MIN(CAST(c.Number_rabies AS DECIMAL(20, 6))) AS min_rabies,
    MAX(CAST(c.Number_rabies AS DECIMAL(20, 6))) AS max_rabies,
    SUM(CAST(c.Number_rabies AS DECIMAL(20, 6))) AS sum_rabies
FROM cases c
JOIN entities e ON e.entity_id = c.entity_id
WHERE c.Number_rabies IS NOT NULL
  AND c.Number_rabies <> ''
GROUP BY e.entity_id, e.Entity, e.Code
ORDER BY avg_rabies DESC
LIMIT 10;
