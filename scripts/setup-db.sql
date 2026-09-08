-- ==========================================================
-- AI Resume Analyser & Job Searcher - Database Initialization
-- ==========================================================

CREATE DATABASE IF NOT EXISTS resume_analyser_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE resume_analyser_db;

-- The tables 'resume_analyses' and 'job_listings' will be automatically created
-- by Spring Boot Hibernate (hibernate.ddl-auto=update) upon backend startup.

SELECT 'Database resume_analyser_db initialized successfully!' AS Status;
