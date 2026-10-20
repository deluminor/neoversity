-- Task 2: normalize infectious_cases to 3NF (entities + cases), keep original table
USE pandemic;

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

-- Mentor check: original denormalized table still present
SELECT COUNT(*) AS infectious_cases_count FROM infectious_cases;
SELECT COUNT(*) AS entities_count FROM entities;
SELECT COUNT(*) AS cases_count FROM cases;

SELECT e.entity_id, e.Entity, e.Code, c.Year, c.Number_rabies
FROM cases c
JOIN entities e ON e.entity_id = c.entity_id
LIMIT 10;
