# goit-rdb-hw-03

Homework 3 — Relational Databases.  
Six DQL queries against the Topic 3 dataset (`products`, `shippers`).

## Structure

```
sql/queries.sql       # homework queries
data/                 # CSV source files
docker/init/          # schema + seed data (first container start)
docker-compose.yml    # MySQL 8 on port 3307
screenshots/          # query results (p1_…–p5_)
```

## Tasks

| #   | Query                                                                |
| --- | -------------------------------------------------------------------- |
| 1.1 | All columns from `products`                                          |
| 1.2 | `name`, `phone` from `shippers`                                      |
| 2   | `AVG` / `MAX` / `MIN` of `price`                                     |
| 3   | Distinct `category_id`, `price` — `ORDER BY price DESC` — `LIMIT 10` |
| 4   | Count rows with `price` between 20 and 100                           |
| 5   | Count and average `price` per `supplier_id`                          |

## Screenshots

| File                                         | Task |
| -------------------------------------------- | ---- |
| `screenshots/p1_1_products_all.png`          | 1.1  |
| `screenshots/p1_2_shippers_name_phone.png`   | 1.2  |
| `screenshots/p2_price_aggregates.png`        | 2    |
| `screenshots/p3_distinct_category_price.png` | 3    |
| `screenshots/p4_price_between_20_100.png`    | 4    |
| `screenshots/p5_group_by_supplier.png`       | 5    |
