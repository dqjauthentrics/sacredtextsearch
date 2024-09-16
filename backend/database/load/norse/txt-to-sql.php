<?php
$bookId = 92;
$transId = 204;
$mysqli = new mysqli('localhost', 'sacred', 'sacred42', 'sacredtext');
$fName = $argv[1];
$parts = explode('-', $fName);
$chNum = str_replace('.txt', '', $parts[2]);
$lines = file($fName);
$vNum = 0;
$body = '';
foreach ($lines as $line) {
    $line = trim($line);
    $line = str_replace('“', '"', $line);
    $line = str_replace('”', '"', $line);
    $line = str_replace("’", "'", $line);
    $line = str_replace("‘", "'", $line);
    if ($vNum === 0) {
        $chTitle = $line;
        echo "INSERT INTO chapter (book_id, translation_id, chapter_number, name) VALUES ($bookId, $transId, $chNum, '{$chTitle}');" . PHP_EOL;
        $vNum++;
    }
    else {
        if (empty($line)) {
            if (!empty($body)) {
                $body = $mysqli->escape_string($body);
                echo "INSERT INTO verse (book_id, translation_id, chapter_number, verse_number, body) VALUES ($bookId, $transId, $chNum, $vNum, '$body');" . PHP_EOL;
                $vNum++;
                $body = '';
            }
        }
        else {
            $body .= (strlen($body) > 0 ? ' ': '') . $line;
        }
    }
}
if (!empty($body)) {
    $body = $mysqli->escape_string($body);
    echo "INSERT INTO verse (book_id, translation_id, chapter_number, verse_number, body) VALUES ($bookId, $transId, $chNum, $vNum, '$body');" . PHP_EOL;
    $vNum++;
    $body = '';
}

