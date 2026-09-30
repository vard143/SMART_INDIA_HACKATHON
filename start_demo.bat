@echo off
echo ========================================================
echo   Starting BHASHASETU (भाषा सेतु) Education OS
echo   Tribal Mother Tongue-Based Multilingual Education (MTB-MLE)
echo   Integrated with JCERT Curriculum & NIPUN Bharat FLN
echo ========================================================

start "BhashaSetu Backend (FastAPI)" cmd /k "cd backend && python main.py"
start "BhashaSetu Frontend (Vite/React)" cmd /k "cd frontend && npm.cmd run dev"

echo.
echo   - Backend API: http://localhost:8000
echo   - Interactive API Docs: http://localhost:8000/docs
echo   - Frontend Portal: http://localhost:5173
echo.
echo Application started! Open http://localhost:5173 in your browser.
