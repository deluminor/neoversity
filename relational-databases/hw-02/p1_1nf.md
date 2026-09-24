# Stage 1 — First Normal Form (1NF)

## Rule

A table is in 1NF when:
- Every cell contains a **single atomic value** (no lists, no sets).
- There are no repeating groups of columns.

## Problem

The column `Назва_товару і кількість` violates atomicity — it holds **multiple values** in a single cell:
- `Лептоп: 3, Мишка: 2` — two products with quantities, comma-separated.

## Solution

1. Split the compound column into two atomic columns: `product_name` and `quantity`.
2. Each product–quantity pair becomes a separate row.

## Result — Table in 1NF

| order_number | product_name | quantity | client_address | order_date | client_name |
|---|---|---|---|---|---|
| 101 | Лептоп  | 3 | Хрещатик 1    | 2023-03-15 | Мельник   |
| 101 | Мишка   | 2 | Хрещатик 1    | 2023-03-15 | Мельник   |
| 102 | Принтер | 1 | Басейна 2     | 2023-03-16 | Шевченко  |
| 103 | Мишка   | 4 | Комп'ютерна 3 | 2023-03-17 | Коваленко |

**Composite Primary Key:** `(order_number, product_name)`

Every cell now holds exactly one value — the table satisfies 1NF.
