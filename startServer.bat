@echo off

echo Deleting existing dist folders in frontend and backend...
rmdir /s /q frontend\dist
rmdir /s /q backend\dist

echo Building frontend project...
cd frontend

call npm run build

cd ..

echo Copying new dist folder to backend...
xcopy /E /I /Y frontend\dist backend\dist

if errorlevel 1 (
    echo Error copying dist folder.
) else (
    echo Dist folder copied successfully.
)



echo Done!
pause
