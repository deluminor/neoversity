# Stage 2 — Second Normal Form (2NF)

## Rule

A table is in 2NF when:
- It is already in 1NF.
- Every non-key attribute depends on the **entire** composite key, not just part of it (no partial dependencies).

## Problem

Composite PK: `(order_number, product_name)`

| Attribute | Depends on | Dependency type |
|---|---|---|
| quantity | (order_number, product_name) | Full — ✅ |
| order_date | order_number | **Partial** — ❌ |
| client_name | order_number | **Partial** — ❌ |
| client_address | order_number | **Partial** — ❌ |

`order_date`, `client_name`, and `client_address` depend only on `order_number` — a part of the key.

## Solution

Split into two tables, moving partial dependencies into a separate table.

## Result — Tables in 2NF

### Table `orders`

| order_number (PK) | order_date | client_name | client_address |
|---|---|---|---|
| 101 | 2023-03-15 | Мельник   | Хрещатик 1    |
| 102 | 2023-03-16 | Шевченко  | Басейна 2     |
| 103 | 2023-03-17 | Коваленко | Комп'ютерна 3 |

PK: `order_number`

### Table `order_items`

| order_number (FK) | product_name | quantity |
|---|---|---|
| 101 | Лептоп  | 3 |
| 101 | Мишка   | 2 |
| 102 | Принтер | 1 |
| 103 | Мишка   | 4 |

PK: `(order_number, product_name)`
FK: `order_number` → `orders.order_number`

Every non-key attribute now depends on the full key of its table — both tables satisfy 2NF.
