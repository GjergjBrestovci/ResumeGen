@echo off
echo Starting Resume Builder...
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo Installing dependencies...
    npm install
    echo.
)

echo Starting development server...
npm run dev

pause
