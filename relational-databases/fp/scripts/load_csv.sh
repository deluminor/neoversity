#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
CSV="$ROOT/data/infectious_cases.csv"
CONTAINER="${CONTAINER:-goit-rdb-fp-mysql}"

docker cp "$CSV" "$CONTAINER:/var/lib/mysql-files/infectious_cases.csv"
docker exec -i "$CONTAINER" mysql -uroot -proot pandemic <<'SQL'
LOAD DATA INFILE '/var/lib/mysql-files/infectious_cases.csv'
INTO TABLE infectious_cases
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(
    Entity,
    Code,
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
);
SELECT COUNT(*) AS imported_rows FROM infectious_cases;
SQL
