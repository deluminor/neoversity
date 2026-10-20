-- Task 1: create schema, import infectious_cases, preview data
CREATE SCHEMA IF NOT EXISTS pandemic;
USE pandemic;

CREATE TABLE IF NOT EXISTS infectious_cases (
    Entity                  VARCHAR(255) NOT NULL,
    Code                    VARCHAR(32)  NULL,
    Year                    INT          NOT NULL,
    Number_yaws             VARCHAR(64)  NULL,
    polio_cases             VARCHAR(64)  NULL,
    cases_guinea_worm       VARCHAR(64)  NULL,
    Number_rabies           VARCHAR(64)  NULL,
    Number_malaria          VARCHAR(64)  NULL,
    Number_hiv              VARCHAR(64)  NULL,
    Number_tuberculosis     VARCHAR(64)  NULL,
    Number_smallpox         VARCHAR(64)  NULL,
    Number_cholera_cases    VARCHAR(64)  NULL
);

-- Prefer docker init LOAD DATA INFILE from /data/infectious_cases.csv.
-- Manual alternative (host):
--   mysql --local-infile=1 -h127.0.0.1 -P3312 -uroot -proot pandemic < sql/p1_create_schema_import.sql
-- Or: docker cp data/infectious_cases.csv goit-rdb-fp-mysql:/var/lib/mysql-files/

SELECT COUNT(*) AS imported_rows FROM infectious_cases;
SELECT * FROM infectious_cases LIMIT 10;
