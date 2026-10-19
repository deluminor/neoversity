# goit-rdb-hw-07

Homework 7 — Relational Databases.  
Date/time built-in functions and JSON on the Topic 3 `orders` table.

## Structure

```
sql/
  p1_extract_year_month_day.sql  # Task 1 — YEAR / MONTH / DAY from orders.date
  p2_date_add_one_day.sql        # Task 2 — DATE_ADD(+1 DAY)
  p3_unix_timestamp.sql          # Task 3 — UNIX_TIMESTAMP(date)
  p4_count_date_between.sql      # Task 4 — COUNT with date BETWEEN
  p5_json_object.sql             # Task 5 — JSON_OBJECT(id, date)
hw07_queries.sql                 # all queries in one text file
docker/init/                     # auto-load goit_rdb_hw_03 schema + data
docker-compose.yml               # MySQL 8 on port 3311
screenshots/                     # p1_…–p5_…
```

## Run

```bash
docker compose up -d
docker exec -i goit-rdb-hw-07-mysql mysql -uroot -proot < sql/p1_extract_year_month_day.sql
```

## Tasks

| # | What | Result |
|---|------|--------|
| 1 | Extract year, month, day from `orders.date` (+ `id`, original `date`) | 196 rows × 5 cols |
| 2 | Add one day to `orders.date` via `DATE_ADD` / `INTERVAL` | 196 rows |
| 3 | Unix timestamp (seconds) via `UNIX_TIMESTAMP(date)` | 196 rows |
| 4 | `COUNT(*)` where `date BETWEEN '1996-07-10 00:00:00' AND '1996-10-08 00:00:00'` | **72** |
| 5 | `JSON_OBJECT('id', id, 'date', date)` per row | 196 rows |
