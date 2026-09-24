# Stage 3 — Third Normal Form (3NF)

## Rule

A table is in 3NF when:
- It is already in 2NF.
- There are **no transitive dependencies** — no non-key attribute depends on another non-key attribute.

## Problem

In the `orders` table from 2NF:
- `client_name` depends on `order_number` (directly) — ✅
- `client_address` depends on `client_name`, not directly on `order_number` — ❌

**Transitive dependency:** `order_number → client_name → client_address`

We also extract `product_name` into a separate `products` entity to avoid update anomalies (the same product "Мишка" appears in rows 101 and 103).

## Solution

Split into four tables, eliminating all transitive dependencies.

## Result — Tables in 3NF

### Table `customers`

| customer_id (PK) | name      | address       |
|---|---|---|
| 1 | Мельник   | Хрещатик 1    |
| 2 | Шевченко  | Басейна 2     |
| 3 | Коваленко | Комп'ютерна 3 |

### Table `products`

| product_id (PK) | name    |
|---|---|
| 1 | Лептоп  |
| 2 | Мишка   |
| 3 | Принтер |

### Table `orders`

| order_id (PK) | customer_id (FK → customers) | order_date |
|---|---|---|
| 101 | 1 | 2023-03-15 |
| 102 | 2 | 2023-03-16 |
| 103 | 3 | 2023-03-17 |

### Table `order_items`

| order_item_id (PK) | order_id (FK → orders) | product_id (FK → products) | quantity |
|---|---|---|---|
| 1 | 101 | 1 | 3 |
| 2 | 101 | 2 | 2 |
| 3 | 102 | 3 | 1 |
| 4 | 103 | 2 | 4 |

## Relationship Summary

| Relationship | Cardinality | Description |
|---|---|---|
| customers → orders | 1 : N | One customer can place many orders |
| orders → order_items | 1 : N | One order can contain many line items |
| products → order_items | 1 : N | One product can appear in many line items |

Every non-key attribute depends solely on the primary key of its own table — all four tables satisfy 3NF.
