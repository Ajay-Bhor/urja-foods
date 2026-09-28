Add-Type -AssemblyName System.Drawing

$srcPath = "C:\Users\Urja Foods\.gemini\antigravity-ide\brain\af95388f-ce7b-429c-ab37-0a360bcdec00\.user_uploaded\media_1790581453188.png"
$img = [System.Drawing.Bitmap]::FromFile($srcPath)
$rect = New-Object System.Drawing.Rectangle(534, 161, 26, 26)
$crop = $img.Clone($rect, $img.PixelFormat)
$outPath = "d:\Rudra backup\New folder\public\images\ajay-bhor.png"
$crop.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Png)
$crop.Dispose()
$img.Dispose()
Write-Host "Re-saved adjusted avatar to $outPath"
