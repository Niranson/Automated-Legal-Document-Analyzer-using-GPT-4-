@echo off
title Stop LexiPulse Legal Document Analyzer
echo ======================================================================
echo   Stopping LexiPulse Legal Document Analyzer on port 8000...
echo ======================================================================

set FOUND=0
for /f "tokens=5" %%a in ('netstat -aon ^| findstr ":8000" ^| findstr "LISTENING"') do (
    taskkill /F /PID %%a >nul 2>&1
    set FOUND=1
)

if "%FOUND%"=="1" (
    echo [OK] Server running on port 8000 has been stopped.
) else (
    echo [INFO] No server was currently active on port 8000.
)

echo ======================================================================
pause
