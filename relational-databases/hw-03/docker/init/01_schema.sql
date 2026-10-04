-- Auto-init schema for goit-rdb-hw-03
SET NAMES utf8mb4;

DROP TABLE IF EXISTS order_details;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS categories;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS shippers;
DROP TABLE IF EXISTS suppliers;

CREATE TABLE categories (
  id INT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT
);

CREATE TABLE customers (
  id INT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  contact VARCHAR(255),
  address VARCHAR(255),
  city VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100)
);

CREATE TABLE employees (
  employee_id INT PRIMARY KEY,
  last_name VARCHAR(100) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  birthdate DATE,
  photo VARCHAR(255),
  notes TEXT
);

CREATE TABLE shippers (
  id INT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50)
);

CREATE TABLE suppliers (
  id INT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  contact VARCHAR(255),
  address VARCHAR(255),
  city VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100),
  phone VARCHAR(50)
);

CREATE TABLE products (
  id INT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  supplier_id INT,
  category_id INT,
  unit VARCHAR(100),
  price DECIMAL(10, 2)
);

CREATE TABLE orders (
  id INT PRIMARY KEY,
  customer_id INT,
  employee_id INT,
  date DATE,
  shipper_id INT
);

CREATE TABLE order_details (
  id INT PRIMARY KEY,
  order_id INT,
  product_id INT,
  quantity INT
);
