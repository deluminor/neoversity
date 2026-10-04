# goit-rdb-hw-04

Homework 4 — Relational Databases (GoIT Neoversity).  
DDL/DML for `LibraryManagement` + multi-table JOINs on the Topic 3 dataset.

## Structure

```
sql/
  p1_create_library.sql   # Task 1 — DDL
  p2_seed_library.sql     # Task 2 — DML seed
  p3_inner_join_all.sql   # Task 3 — INNER JOIN all tables
  p4_queries.sql          # Task 4 — COUNT / JOIN variants / GROUP / HAVING / LIMIT
answers/p4_answers.txt    # written answers for Task 4
data/                     # Topic 3 CSV (reference)
docker/init/              # auto-load both databases
docker-compose.yml        # MySQL 8 on port 3308
screenshots/              # p1_…–p4_…
```

## Run database

```bash
docker compose up -d
```

| Field | Value |
|-------|-------|
| Host | `localhost` |
| Port | `3308` |
| User | `root` |
| Password | `root` |
| Databases | `LibraryManagement`, `goit_rdb_hw_03` |

WebStorm: Database tool → MySQL → values above → run files from `sql/` one task at a time → `⌘Enter`.

## Tasks

| # | Points | What |
|---|--------|------|
| 1 | 25 | DDL: schema `LibraryManagement` + 5 tables with FKs |
| 2 | 15 | DML: 1–2 sample rows per table |
| 3 | 20 | INNER JOIN of all 8 Topic 3 tables |
| 4 | 40 | COUNT, LEFT/RIGHT comparison + answers, filters, GROUP BY, HAVING, ORDER BY, LIMIT/OFFSET |

## Screenshots

See `screenshots/README.md` for required file names (`p1_`…`p4_7_`).

## Submit (LMS)

1. Repo: https://github.com/deluminor/goit-rdb-hw-04  
2. Archive `ДЗ4__ПІБ`  
3. Comment: grading approach (keep first grade / revise after feedback)
