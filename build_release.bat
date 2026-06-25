@echo off
echo Stopping Gradle Daemons...
cd android
call gradlew --stop
cd ..

echo Cleaning up temporary C++ build directory E:\temp_cxx...
if exist E:\temp_cxx rmdir /s /q E:\temp_cxx

echo Cleaning up old directory junction E:\c...
if exist E:\c rmdir E:\c

echo Creating directory junction E:\c pointing to %CD%...
mklink /J E:\c "%CD%"
if errorlevel 1 (
    echo Failed to create directory junction E:\c.
    exit /b 1
)

set RUN_CLEAN=0
if "%~1"=="clean" set RUN_CLEAN=1
if "%~1"=="--clean" set RUN_CLEAN=1

echo Building assembleRelease under junction E:\c...
cd /d E:\c\android
if %RUN_CLEAN% equ 1 (
    echo Running gradlew clean...
    call gradlew clean
) else (
    echo Skipping clean phase - run with yarn build clean to clean build...
)
call gradlew assembleRelease
set BUILD_STATUS=%ERRORLEVEL%

echo Returning to original directory...
cd /d "%~dp0"

echo Deleting directory junction E:\c...
rmdir E:\c

if %BUILD_STATUS% equ 0 (
    echo BUILD SUCCESSFUL!
    exit /b 0
) else (
    echo BUILD FAILED with exit code %BUILD_STATUS%
    exit /b %BUILD_STATUS%
)
