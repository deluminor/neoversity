-- goit-rdb-fp — all final-project queries (pandemic / infectious_cases)
-- Run after Docker init has loaded data into pandemic.infectious_cases

-- =============================================================================
-- Task 1: schema + import preview
-- =============================================================================
CREATE SCHEMA IF NOT EXISTS pandemic;
USE pandemic;

SELECT COUNT(*) AS imported_rows FROM infectious_cases;
SELECT * FROM infectious_cases LIMIT 10;

-- =============================================================================
-- Task 2: normalize to 3NF (entities + cases); keep infectious_cases
-- =============================================================================
DROP TABLE IF EXISTS cases;
DROP TABLE IF EXISTS entities;

CREATE TABLE entities (
    entity_id INT AUTO_INCREMENT PRIMARY KEY,
    Entity    VARCHAR(255) NOT NULL,
    Code      VARCHAR(32)  NULL,
    UNIQUE KEY uq_entity_code (Entity, Code)
);

CREATE TABLE cases (
    case_id              INT AUTO_INCREMENT PRIMARY KEY,
    entity_id            INT NOT NULL,
    Year                 INT NOT NULL,
    Number_yaws          VARCHAR(64) NULL,
    polio_cases          VARCHAR(64) NULL,
    cases_guinea_worm    VARCHAR(64) NULL,
    Number_rabies        VARCHAR(64) NULL,
    Number_malaria       VARCHAR(64) NULL,
    Number_hiv           VARCHAR(64) NULL,
    Number_tuberculosis  VARCHAR(64) NULL,
    Number_smallpox      VARCHAR(64) NULL,
    Number_cholera_cases VARCHAR(64) NULL,
    CONSTRAINT fk_cases_entity
        FOREIGN KEY (entity_id) REFERENCES entities (entity_id),
    UNIQUE KEY uq_entity_year (entity_id, Year)
);

INSERT INTO entities (Entity, Code)
SELECT DISTINCT Entity, Code
FROM infectious_cases
ORDER BY Entity, Code;

INSERT INTO cases (
    entity_id,
    Year,
    Number_yaws,
    polio_cases,
    cases_guinea_worm,
    Number_rabies,
    Number_malaria,
    Number_hiv,
    Number_tuberculosis,
    Number_smallpox,
    Number_cholera_cases
)
SELECT
    e.entity_id,
    ic.Year,
    ic.Number_yaws,
    ic.polio_cases,
    ic.cases_guinea_worm,
    ic.Number_rabies,
    ic.Number_malaria,
    ic.Number_hiv,
    ic.Number_tuberculosis,
    ic.Number_smallpox,
    ic.Number_cholera_cases
FROM infectious_cases ic
JOIN entities e
    ON e.Entity = ic.Entity
   AND (e.Code <=> ic.Code);

SELECT COUNT(*) AS infectious_cases_count FROM infectious_cases;
SELECT COUNT(*) AS entities_count FROM entities;
SELECT COUNT(*) AS cases_count FROM cases;

-- =============================================================================
-- Task 3: rabies stats per Entity+Code, top 10 by AVG DESC
-- =============================================================================
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

-- =============================================================================
-- Task 4: Year → Jan 1, CURDATE(), years difference
-- =============================================================================
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

-- =============================================================================
-- Task 5: year_diff_from_today(Year) function
-- =============================================================================
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
