@echo off
title LexiPulse - Automated Legal Document Analyzer
echo ======================================================================
echo   Starting LexiPulse Legal Document Analyzer...
echo   Course: 24CS2506 Building Applications using GPT-4 (Experiment 5)
echo ======================================================================

:: Launch default web browser after 2 seconds
start "" cmd /c "timeout /t 2 /nobreak >nul & start http://localhost:8000"

:: Start the Python FastAPI server
python run.py
pause
