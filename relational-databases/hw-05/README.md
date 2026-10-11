# goit-rdb-hw-05

Homework 5 — Relational Databases.  
Nested queries (SELECT / WHERE / FROM), CTE (`WITH`) and a user-defined function on the Topic 3 dataset.

## Structure

```
sql/
  p1_select_subquery.sql   # Task 1 — subquery in SELECT (customer_id per order_details row)
  p2_where_subquery.sql    # Task 2 — subquery in WHERE (orders.shipper_id = 3)
  p3_from_subquery.sql     # Task 3 — subquery in FROM, quantity > 10, AVG by order_id
  p4_with_cte.sql          # Task 4 — Task 3 via WITH temp
  p5_divide_function.sql   # Task 5 — FLOAT division function applied to quantity
hw05_queries.sql           # all queries in one text file
docker/init/               # auto-load goit_rdb_hw_03 schema + data
docker-compose.yml         # MySQL 8 on port 3309
screenshots/               # p1_…–p5_…
```

## Run

```bash
docker compose up -d
docker exec -i goit-rdb-hw-05-mysql mysql -uroot -proot < sql/p1_select_subquery.sql
```

## Tasks

| # | Points | What | Rows |
|---|--------|------|------|
| 1 | 20 | `order_details` + `customer_id` via subquery in `SELECT` | 518 |
| 2 | 20 | `order_details` filtered by `shipper_id = 3` via subquery in `WHERE` | 181 |
| 3 | 20 | Subquery in `FROM`, `quantity > 10`, `AVG(quantity)` by `order_id` | 175 |
| 4 | 20 | Task 3 with `WITH temp AS (...)` | 175 |
| 5 | 20 | `divide_float(FLOAT, FLOAT) RETURNS FLOAT` + `DROP FUNCTION IF EXISTS`, applied to `quantity / 3` | 518 |
