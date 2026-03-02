# ================================================================================
# SCRIPT PARA SUBIR WEB-NOVA-AGENCY A GITHUB
# ================================================================================

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  SUBIR WEB-NOVA-AGENCY A GITHUB" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Solicitar nombre del repositorio
$repoName = Read-Host "Ingresa el nombre del repositorio en GitHub (ejemplo: web-nova-agency)"
if ([string]::IsNullOrWhiteSpace($repoName)) {
    $repoName = "web-nova-agency"
    Write-Host "Usando nombre por defecto: $repoName" -ForegroundColor Yellow
}

# Usuario de GitHub
$githubUser = "elunboundfiremail"

Write-Host ""
Write-Host "PASO 1: Inicializando repositorio Git..." -ForegroundColor Green

# Verificar si ya existe .git
if (Test-Path ".git") {
    Write-Host "Ya existe un repositorio Git inicializado." -ForegroundColor Yellow
} else {
    git init
    Write-Host "Repositorio Git inicializado correctamente." -ForegroundColor Green
}

Write-Host ""
Write-Host "PASO 2: Agregando archivos al staging..." -ForegroundColor Green
git add .

Write-Host ""
Write-Host "PASO 3: Creando commit inicial..." -ForegroundColor Green
git commit -m "Initial commit: Web-Nova Agency landing page"

Write-Host ""
Write-Host "PASO 4: Configurando rama principal..." -ForegroundColor Green
git branch -M main

Write-Host ""
Write-Host "PASO 5: Conectando con GitHub..." -ForegroundColor Green
$remoteUrl = "https://github.com/$githubUser/$repoName.git"

# Verificar si ya existe el remote
$existingRemote = git remote get-url origin 2>$null
if ($existingRemote) {
    Write-Host "Remote 'origin' ya existe. Actualizando URL..." -ForegroundColor Yellow
    git remote set-url origin $remoteUrl
} else {
    git remote add origin $remoteUrl
}

Write-Host "Remote configurado: $remoteUrl" -ForegroundColor Green

Write-Host ""
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "  INSTRUCCIONES IMPORTANTES" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "ANTES DE CONTINUAR:" -ForegroundColor Yellow
Write-Host "1. Debes crear el repositorio en GitHub:" -ForegroundColor White
Write-Host "   https://github.com/new" -ForegroundColor Cyan
Write-Host ""
Write-Host "2. Configuracion del repositorio:" -ForegroundColor White
Write-Host "   - Repository name: $repoName" -ForegroundColor White
Write-Host "   - Description: Landing page profesional para Web-Nova Agency" -ForegroundColor White
Write-Host "   - Visibility: Public" -ForegroundColor White
Write-Host "   - NO marques 'Initialize this repository with a README'" -ForegroundColor Red
Write-Host ""
Write-Host "3. Necesitaras un Personal Access Token:" -ForegroundColor White
Write-Host "   https://github.com/settings/tokens/new" -ForegroundColor Cyan
Write-Host ""
Write-Host "   Configuracion del token:" -ForegroundColor White
Write-Host "   - Note: Web-Nova Agency" -ForegroundColor White
Write-Host "   - Expiration: 90 days" -ForegroundColor White
Write-Host "   - Scopes: [X] repo (marca todo)" -ForegroundColor White
Write-Host ""

$continue = Read-Host "¿Ya creaste el repositorio en GitHub? (s/n)"

if ($continue -ne "s" -and $continue -ne "S") {
    Write-Host ""
    Write-Host "Por favor, crea el repositorio primero y vuelve a ejecutar este script." -ForegroundColor Yellow
    Write-Host "Presiona cualquier tecla para salir..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit
}

Write-Host ""
Write-Host "PASO 6: Subiendo proyecto a GitHub..." -ForegroundColor Green
Write-Host ""
Write-Host "Cuando se te pida:" -ForegroundColor Yellow
Write-Host "  Username: $githubUser" -ForegroundColor White
Write-Host "  Password: [PEGA TU PERSONAL ACCESS TOKEN AQUI]" -ForegroundColor White
Write-Host ""

git push -u origin main

if ($LASTEXITCODE -eq 0) {
    Write-Host ""
    Write-Host "============================================" -ForegroundColor Green
    Write-Host "  ✓ PROYECTO SUBIDO EXITOSAMENTE" -ForegroundColor Green
    Write-Host "============================================" -ForegroundColor Green
    Write-Host ""
    Write-Host "Tu proyecto esta disponible en:" -ForegroundColor Green
    Write-Host "https://github.com/$githubUser/$repoName" -ForegroundColor Cyan
    Write-Host ""
} else {
    Write-Host ""
    Write-Host "============================================" -ForegroundColor Red
    Write-Host "  ✗ ERROR AL SUBIR EL PROYECTO" -ForegroundColor Red
    Write-Host "============================================" -ForegroundColor Red
    Write-Host ""
    Write-Host "Verifica que:" -ForegroundColor Yellow
    Write-Host "1. El repositorio existe en GitHub" -ForegroundColor White
    Write-Host "2. El token tiene los permisos correctos" -ForegroundColor White
    Write-Host "3. Tu conexion a internet funciona" -ForegroundColor White
    Write-Host ""
}

Write-Host ""
Write-Host "Presiona cualquier tecla para salir..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
