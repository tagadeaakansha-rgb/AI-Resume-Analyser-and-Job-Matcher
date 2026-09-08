@echo off
title AI Resume Analyser - Java Spring Boot Backend
echo =======================================================
echo Starting AI Resume Analyser Backend (Spring Boot 3)
echo Port: 8080
echo Database: MySQL 8.0 (with Auto-H2 fallback)
echo AI Engine: Claude 3.5 Sonnet / Heuristic Core
echo =======================================================
cd /d "%~dp0\..\backend"
mvn spring-boot:run
pause
