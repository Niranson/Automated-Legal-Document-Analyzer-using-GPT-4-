"""
Entry point to run the Automated Legal Document Analyzer application.
Starts FastAPI server serving both API and the modern React web UI.
"""

import sys
import os
from pathlib import Path
import uvicorn

# Ensure backend directory is in python path
backend_dir = Path(__file__).resolve().parent / "backend"
sys.path.insert(0, str(backend_dir))

def main():
    print("=" * 70)
    print("  LEXIPULSE - AUTOMATED LEGAL DOCUMENT ANALYZER USING GPT-4")
    print("  Course: 24CS2506 – Building Applications using GPT-4 (Experiment 5)")
    print("=" * 70)
    print("  Server running at: http://localhost:8000")
    print("  API Documentation: http://localhost:8000/docs")
    print("  Press Ctrl+C to terminate.")
    print("=" * 70)

    uvicorn.run("app:app", host="127.0.0.1", port=8000, reload=False, app_dir=str(backend_dir))

if __name__ == "__main__":
    main()
