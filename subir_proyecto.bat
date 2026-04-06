@echo off
echo Construyendo el proyecto...
call npm run build

echo.
echo Presiona Enter para subir el proyecto...
set /p dummy=""

echo.
echo Haciendo deploy...
call npm run deploy

echo.
echo completado!
pause