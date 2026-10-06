-- Prodyum Admin Database Schema (MySQL 8 / MariaDB — XAMPP compatible)
-- NOTE: You don't need to run this manually. The API server auto-creates
-- the database and tables on startup (server/db.js → initDb()).
-- This file exists as reference for phpMyAdmin / documentation.

CREATE DATABASE IF NOT EXISTS prodyum CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE prodyum;

CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(80) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS inquiries (
  id VARCHAR(60) PRIMARY KEY,
  category VARCHAR(20) DEFAULT 'it',
  category_name VARCHAR(120),
  budget_tier VARCHAR(150),
  name VARCHAR(150),
  email VARCHAR(200),
  phone VARCHAR(50),
  company VARCHAR(200),
  timeline VARCHAR(100),
  message TEXT,
  status ENUM('new','reviewed','contacted','archived') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS project_requests (
  id VARCHAR(60) PRIMARY KEY,
  vertical VARCHAR(20) DEFAULT 'it',
  vertical_name VARCHAR(120),
  name VARCHAR(150),
  email VARCHAR(200),
  phone VARCHAR(50),
  service VARCHAR(200),
  timeline VARCHAR(100),
  details TEXT,
  status ENUM('new','reviewed','contacted','archived') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS career_applications (
  id VARCHAR(60) PRIMARY KEY,
  job_id VARCHAR(80),
  job_title VARCHAR(200),
  vertical VARCHAR(80),
  name VARCHAR(150),
  email VARCHAR(200),
  phone VARCHAR(50),
  portfolio VARCHAR(400),
  note TEXT,
  status ENUM('new','reviewed','contacted','archived') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS casting_applications (
  id VARCHAR(60) PRIMARY KEY,
  full_name VARCHAR(150),
  email VARCHAR(200),
  phone VARCHAR(50),
  city VARCHAR(120),
  role_category VARCHAR(150),
  portfolio_url VARCHAR(400),
  experience VARCHAR(120),
  headshot_name VARCHAR(255),
  headshot_uploaded TINYINT(1) DEFAULT 0,
  bio TEXT,
  status ENUM('new','reviewed','contacted','archived') DEFAULT 'new',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
