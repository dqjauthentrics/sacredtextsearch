<?php
$bookId = 92;
$transId = 215;
$mysqli = new mysqli('localhost', 'sacred', 'sacred42', 'sacredtext');
$fName = @$argv[1];
$parts = explode('-', $fName);
$chNum = @str_replace('.txt', '', @$parts[1]);
$lines = file($fName);
$vNum = 0;
foreach ($lines as $line) {
    $line = trim($line);
    $line = str_replace('“', '"', $line);
    $line = str_replace('”', '"', $line);
    $line = str_replace("’", "'", $line);
    $line = str_replace("‘", "'", $line);
    if (!empty($line)) {
        $body = $mysqli->escape_string($line);
        echo "INSERT INTO verse (book_id, translation_id, chapter_number, verse_number, body) VALUES ($bookId, $transId, $chNum, $vNum, '$body');" . PHP_EOL;
        $vNum++;
    }
}
