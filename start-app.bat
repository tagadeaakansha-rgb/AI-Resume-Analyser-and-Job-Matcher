@echo off
title AI Resume Analyser & Job Searcher
echo ===================================================================
echo   NEXUS AI - AI Resume Analyser & Job Searcher (3D Cyber Edition)
echo   Full-Stack: React 18, Java Spring Boot 3, Claude API, MySQL 8.0
echo ===================================================================
echo.
echo Launching Spring Boot Backend on http://localhost:8080 ...
start "AI Resume Backend (Spring Boot)" cmd /k "cd /d %~dp0\backend && mvn spring-boot:run"

echo Waiting 5 seconds for backend initialization...
timeout /t 5 /nobreak >nul

echo Launching React Frontend on http://localhost:5173 ...
start "AI Resume Frontend (React + Vite)" cmd /k "cd /d %~dp0\frontend && npm run dev"

echo.
echo Both servers are launching!
echo App URL: http://localhost:5173
echo API URL: http://localhost:8080/api/system/status
echo ===================================================================
pause
