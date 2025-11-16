# PowerShell script to replace brand colors with prodyum colors
$files = Get-ChildItem -Path "src" -Recurse -Filter "*.jsx"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw
    
    # Replace brand colors with prodyum colors
    $content = $content -replace 'brand-blue-light', 'prodyum-blue-400'
    $content = $content -replace 'brand-blue-dark', 'prodyum-blue-700'
    $content = $content -replace 'brand-blue', 'prodyum-blue-500'
    $content = $content -replace 'brand-green-light', 'prodyum-green-400'
    $content = $content -replace 'brand-green-dark', 'prodyum-green-700'
    $content = $content -replace 'brand-green', 'prodyum-green-500'
    $content = $content -replace 'brand-lime-light', 'prodyum-lime-400'
    $content = $content -replace 'brand-lime', 'prodyum-lime-500'
    
    Set-Content $file.FullName -Value $content -NoNewline
    Write-Host "Updated: $($file.Name)"
}

Write-Host "`nColor replacement complete!" -ForegroundColor Green
