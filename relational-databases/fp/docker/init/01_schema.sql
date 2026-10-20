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
