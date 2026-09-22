-- ==========================================================
-- Database Schema: Urja Foods & Agro (Complete Enterprise Edition)
-- Target Database: urja_foods_db
-- Charset: utf8mb4 | Collation: utf8mb4_unicode_ci
-- ==========================================================

-- 1. Create Database
CREATE DATABASE IF NOT EXISTS `urja_foods_db`
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;

USE `urja_foods_db`;

-- ----------------------------------------------------------
-- Table: products
-- Description: Stores cattle feed, poultry feed, and supplements catalog
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `products` (
  `id` VARCHAR(64) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `category` VARCHAR(100) NOT NULL,
  `tag` VARCHAR(100) DEFAULT NULL,
  `price` VARCHAR(50) DEFAULT NULL,
  `original_price` VARCHAR(50) DEFAULT NULL,
  `discount` VARCHAR(50) DEFAULT NULL,
  `rating` DECIMAL(3, 2) DEFAULT 5.00,
  `reviews_count` INT DEFAULT 0,
  `sizes` JSON DEFAULT NULL,
  `short_description` TEXT DEFAULT NULL,
  `description` TEXT DEFAULT NULL,
  `specs` JSON DEFAULT NULL,
  `benefits` JSON DEFAULT NULL,
  `image` VARCHAR(500) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_category` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------
-- Table: inquiries
-- Description: Stores farmer, dealer, and business inquiry form leads
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `inquiries` (
  `id` VARCHAR(64) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(255) DEFAULT NULL,
  `interest` VARCHAR(255) DEFAULT NULL,
  `district` VARCHAR(100) DEFAULT NULL,
  `farm_type` VARCHAR(100) DEFAULT NULL,
  `animal_count` VARCHAR(50) DEFAULT NULL,
  `message` TEXT DEFAULT NULL,
  `status` VARCHAR(50) DEFAULT 'Pending Contact',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_created_at` (`created_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------
-- Table: career_applications
-- Description: Stores job applications and candidate profiles
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `career_applications` (
  `id` VARCHAR(64) NOT NULL,
  `name` VARCHAR(255) NOT NULL,
  `phone` VARCHAR(50) NOT NULL,
  `email` VARCHAR(255) DEFAULT NULL,
  `position` VARCHAR(255) DEFAULT NULL,
  `experience` VARCHAR(100) DEFAULT NULL,
  `qualification` VARCHAR(255) DEFAULT NULL,
  `city` VARCHAR(100) DEFAULT NULL,
  `resume_url` VARCHAR(500) DEFAULT NULL,
  `message` TEXT DEFAULT NULL,
  `status` VARCHAR(100) DEFAULT 'Delivered to HR Desk',
  `submitted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_submitted_at` (`submitted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------
-- Table: email_logs
-- Description: Audit trail for outbound HR notifications and applicant acknowledgments
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `email_logs` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `type` VARCHAR(100) DEFAULT NULL,
  `application_id` VARCHAR(64) DEFAULT NULL,
  `recipient` VARCHAR(255) DEFAULT NULL,
  `subject` VARCHAR(255) DEFAULT NULL,
  `status` VARCHAR(100) DEFAULT NULL,
  `timestamp` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_application_id` (`application_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------
-- Table: businesses
-- Description: Stores corporate agribusiness divisions, metrics, and processes
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `businesses` (
  `id` VARCHAR(64) NOT NULL,
  `number` VARCHAR(10) DEFAULT NULL,
  `title` VARCHAR(255) NOT NULL,
  `short_title` VARCHAR(100) DEFAULT NULL,
  `category` VARCHAR(100) DEFAULT NULL,
  `tag` VARCHAR(100) DEFAULT NULL,
  `tagline` TEXT DEFAULT NULL,
  `overview` TEXT DEFAULT NULL,
  `image` VARCHAR(500) DEFAULT NULL,
  `products` JSON DEFAULT NULL,
  `stats` JSON DEFAULT NULL,
  `features` JSON DEFAULT NULL,
  `process_steps` JSON DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_category` (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------
-- Table: milestones
-- Description: Stores historical corporate milestones
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `milestones` (
  `id` INT AUTO_INCREMENT NOT NULL,
  `year` VARCHAR(20) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT NOT NULL,
  `image` VARCHAR(500) DEFAULT NULL,
  `display_order` INT DEFAULT 0,
  PRIMARY KEY (`id`),
  INDEX `idx_year` (`year`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------
-- Table: job_postings
-- Description: Stores active career vacancies and job profiles
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `job_postings` (
  `id` VARCHAR(64) NOT NULL,
  `title` VARCHAR(255) NOT NULL,
  `dept` VARCHAR(100) NOT NULL,
  `location` VARCHAR(255) NOT NULL,
  `experience` VARCHAR(100) DEFAULT NULL,
  `type` VARCHAR(100) DEFAULT NULL,
  `vacancies` VARCHAR(50) DEFAULT NULL,
  `summary` TEXT DEFAULT NULL,
  `responsibilities` JSON DEFAULT NULL,
  `requirements` JSON DEFAULT NULL,
  `status` VARCHAR(50) DEFAULT 'Active',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  INDEX `idx_dept` (`dept`),
  INDEX `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ----------------------------------------------------------
-- Table: company_info
-- Description: General company profile, leadership messages, contacts, and values
-- ----------------------------------------------------------
CREATE TABLE IF NOT EXISTS `company_info` (
  `info_key` VARCHAR(100) NOT NULL,
  `category` VARCHAR(50) DEFAULT NULL,
  `title` VARCHAR(255) DEFAULT NULL,
  `info_value` JSON DEFAULT NULL,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`info_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
