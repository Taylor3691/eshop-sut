param(
    [Parameter(Mandatory = $true)][int]$BackendProcessId,
    [Parameter(Mandatory = $true)][string]$OutputPath,
    [int]$IntervalSeconds = 5
)

$ErrorActionPreference = 'Stop'
$counterPaths = @(
    '\Processor(_Total)\% Processor Time',
    '\Memory\Available MBytes'
)

while ($true) {
    $sample = Get-Counter -Counter $counterPaths
    $cpu = ($sample.CounterSamples | Where-Object { $_.Path -match '\\processor\(_total\)\\% processor time$' } | Select-Object -First 1).CookedValue
    $availableMiB = ($sample.CounterSamples | Where-Object { $_.Path -match '\\memory\\available mbytes$' } | Select-Object -First 1).CookedValue
    $backend = Get-Process -Id $BackendProcessId -ErrorAction SilentlyContinue
    $jmeter = Get-Process -Name java -ErrorAction SilentlyContinue | Sort-Object StartTime -Descending | Select-Object -First 1

    [pscustomobject]@{
        timestamp = (Get-Date).ToString('o')
        cpu_total_pct = [math]::Round($cpu, 2)
        available_memory_mib = [math]::Round($availableMiB, 1)
        backend_pid = $BackendProcessId
        backend_working_set_mib = if ($backend) { [math]::Round($backend.WorkingSet64 / 1MB, 1) } else { $null }
        backend_private_mib = if ($backend) { [math]::Round($backend.PrivateMemorySize64 / 1MB, 1) } else { $null }
        jmeter_pid = if ($jmeter) { $jmeter.Id } else { $null }
        jmeter_working_set_mib = if ($jmeter) { [math]::Round($jmeter.WorkingSet64 / 1MB, 1) } else { $null }
        jmeter_private_mib = if ($jmeter) { [math]::Round($jmeter.PrivateMemorySize64 / 1MB, 1) } else { $null }
    } | Export-Csv -Path $OutputPath -Append -NoTypeInformation -Encoding utf8

    Start-Sleep -Seconds $IntervalSeconds
}
