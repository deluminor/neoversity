# goit-rdb-fp

Final Project — Relational Databases (Neoversity / GoIT).  
Schema `pandemic`, dataset `infectious_cases.csv`: import, 3NF normalization, rabies analytics, date/year helpers.

## Structure

```
data/
  infectious_cases.csv           # source dataset
sql/
  p1_create_schema_import.sql    # Task 1 — schema + import preview + COUNT
  p2_normalize_3nf.sql           # Task 2 — entities + cases (3NF), keep original
  p3_rabies_stats.sql            # Task 3 — AVG/MIN/MAX/SUM Number_rabies top 10
  p4_year_to_date_diff.sql       # Task 4 — MAKEDATE / CURDATE / TIMESTAMPDIFF
  p5_year_diff_function.sql      # Task 5 — year_diff_from_today(Year)
scripts/
  load_csv.sh                    # docker cp + LOAD DATA INFILE
fp_queries.sql                   # all SQL in one file
docker/init/                     # CREATE SCHEMA + infectious_cases table
docker-compose.yml               # MySQL 8 on host port 3312
screenshots/                     # p1_…–p5_…
```

## Run

```bash
docker compose up -d
# wait until healthy (~10s)
./scripts/load_csv.sh

docker exec -i goit-rdb-fp-mysql mysql -uroot -proot pandemic < sql/p1_create_schema_import.sql
docker exec -i goit-rdb-fp-mysql mysql -uroot -proot pandemic < sql/p2_normalize_3nf.sql
docker exec -i goit-rdb-fp-mysql mysql -uroot -proot pandemic < sql/p3_rabies_stats.sql
docker exec -i goit-rdb-fp-mysql mysql -uroot -proot pandemic < sql/p4_year_to_date_diff.sql
# Task 5 (DELIMITER): run sql/p5_year_diff_function.sql in DataGrip / Workbench,
# or paste the CREATE FUNCTION block interactively.
```

Connection (DataGrip / Workbench / Import Wizard):

| Setting  | Value                |
|----------|----------------------|
| Host     | `127.0.0.1`          |
| Port     | `3312`               |
| User     | `root`               |
| Password | `root`               |
| Schema   | `pandemic`           |

CSV load: `scripts/load_csv.sh` copies the file into the container and runs `LOAD DATA INFILE`.  
Import Wizard screenshots are also valid for LMS if preferred.

## Results snapshot

| Metric | Value |
|--------|-------|
| `COUNT(*)` from `infectious_cases` | **10521** |
| `entities` | 245 |
| `cases` | 10521 |

Task 3 top row: **World** (`OWID_WRL`) — avg rabies ≈ **20192.37**.

## Tasks

| # | What | Notes |
|---|------|-------|
| 1 | `CREATE SCHEMA pandemic`, import `infectious_cases`, preview | `COUNT(*)` = 10521 on original table |
| 2 | Normalize to 3NF: `entities` + `cases` (FK), keep original | Entity+Code no longer repeat |
| 3 | AVG / MIN / MAX / SUM of `Number_rabies` per entity | empty/`NULL` excluded; `ORDER BY AVG DESC LIMIT 10` |
| 4 | `MAKEDATE(Year,1)`, `CURDATE()`, `TIMESTAMPDIFF(YEAR, …)` | sample rows only |
| 5 | `year_diff_from_today(Year)` + demo `SELECT` | same year-diff as task 4 |
