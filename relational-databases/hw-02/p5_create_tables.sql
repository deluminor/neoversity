-- ============================================================
-- goit-rdb-hw-02 — Stage 5: Create Tables from ER Diagram
-- ============================================================
-- Database: MySQL 8.0+
-- Run this script to create the normalized schema.
-- ============================================================

CREATE DATABASE IF NOT EXISTS goit_rdb_hw_02
    DEFAULT CHARACTER SET utf8mb4
    DEFAULT COLLATE utf8mb4_unicode_ci;

USE goit_rdb_hw_02;

-- -----------------------------------------------------------
-- Table: customers
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS customers (
    customer_id INT          AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    address     VARCHAR(255) NOT NULL
) ENGINE=InnoDB;

-- -----------------------------------------------------------
-- Table: products
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS products (
    product_id INT          AUTO_INCREMENT PRIMARY KEY,
    name       VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

-- -----------------------------------------------------------
-- Table: orders
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS orders (
    order_id    INT  AUTO_INCREMENT PRIMARY KEY,
    customer_id INT  NOT NULL,
    order_date  DATE NOT NULL,

    CONSTRAINT fk_orders_customer
        FOREIGN KEY (customer_id) REFERENCES customers (customer_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;

-- -----------------------------------------------------------
-- Table: order_items
-- -----------------------------------------------------------
CREATE TABLE IF NOT EXISTS order_items (
    order_item_id INT AUTO_INCREMENT PRIMARY KEY,
    order_id      INT NOT NULL,
    product_id    INT NOT NULL,
    quantity      INT NOT NULL,

    CONSTRAINT fk_order_items_order
        FOREIGN KEY (order_id) REFERENCES orders (order_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_order_items_product
        FOREIGN KEY (product_id) REFERENCES products (product_id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;
