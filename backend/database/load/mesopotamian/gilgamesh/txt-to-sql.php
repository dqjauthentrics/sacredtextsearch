<?php
$mysqli = new mysqli('localhost', 'sacred', 'sacred42', 'sacredtext');
$fName = $argv[1];
$parts = explode('-', $fName);
$chNum = str_replace('.txt', '', $parts[2]);
$lines = file($fName);
$vNum = 1;
foreach ($lines as $line) {
    $line = trim($line);
    $line = str_replace('“', '"', $line);
    $line = str_replace('”', '"', $line);
    $line = str_replace("’", "'", $line);
    $line = str_replace("‘", "'", $line);
    $line = $mysqli->escape_string($line);
    if (!empty($line)) {
        echo "INSERT INTO verse (book_id, translation_id, chapter_number, verse_number, body) VALUES (91, 203, $chNum, $vNum, '$line');" . PHP_EOL;
        $vNum++;
    }
}
