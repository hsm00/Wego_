$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = "."
$watcher.IncludeSubdirectories = $true
$watcher.EnableRaisingEvents = $true

$changedAction = {
    npm run build:css
}

Register-ObjectEvent $watcher "Changed" -Action $changedAction
Register-ObjectEvent $watcher "Created" -Action $changedAction
Register-ObjectEvent $watcher "Deleted" -Action $changedAction

while ($true) {
    Start-Sleep 10
}
