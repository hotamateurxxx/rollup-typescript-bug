echo off
chcp 65001
cls
cd /d %~dp0

for %%i in ("%~f0\..") do set "current=%%~nxi"
set title=%current%
title %title%

cmd