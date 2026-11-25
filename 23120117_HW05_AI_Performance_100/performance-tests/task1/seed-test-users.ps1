param(
    [string]$BaseUrl = "http://localhost:3000",
    [string]$DataFile = (Join-Path $PSScriptRoot "flow-data.csv")
)

$ErrorActionPreference = "Stop"

if (-not (Test-Path -LiteralPath $DataFile)) {
    throw "CSV data file not found: $DataFile"
}

$rows = Import-Csv -LiteralPath $DataFile
$uniqueUsers = $rows | Sort-Object email -Unique
$created = 0
$existing = 0
$failed = 0

foreach ($row in $uniqueUsers) {
    $payload = @{
        name = $row.name
        email = $row.email
        password = $row.password
    } | ConvertTo-Json -Compress

    try {
        Invoke-RestMethod -Method Post -Uri "$BaseUrl/api/register" -ContentType "application/json" -Body $payload | Out-Null
        $created++
    }
    catch {
        $body = $_.ErrorDetails.Message
        if ($body -match "UNIQUE constraint failed" -or $body -match "already exists") {
            $existing++
        }
        else {
            $failed++
            Write-Warning "Failed to seed $($row.email): $($_.Exception.Message) $body"
        }
    }
}

Write-Output "Seed summary: created=$created existing=$existing failed=$failed total=$($uniqueUsers.Count)"
if ($failed -gt 0) {
    exit 1
}
