#!/usr/local/bin/php
<?php
$transId = 221;
$bookId = 120;
$fName = 'gnosis-of-the-light.txt';
$mysqli = new mysqli('localhost', 'sacred', 'sacred42', 'sacredtext');
$parts = explode('-', $fName);
$chNum = 1;
$lines = file($fName);
$vNum = 1;
foreach ($lines as $line) {
    $line = str_replace('“', '"', $line);
    $line = str_replace('”', '"', $line);
    $line = str_replace("’", "'", $line);
    $line = str_replace("‘", "'", $line);
    $line = trim($line);
    if (!empty($line)) {
        $line = $mysqli->escape_string(fixBody($mysqli, $line));
        echo "INSERT INTO verse (book_id, translation_id, chapter_number, verse_number, body) VALUES ($bookId, $transId, $chNum, $vNum, '$line');" . PHP_EOL;
        $vNum++;
    }
}

function isFootnote($word) {
    $firstCh = substr($word, 0, 1);
    $lastCh = substr($word, strlen($word) - 1);
    if (($firstCh === '[' && $lastCh === ']') || ($firstCh === '(' && $lastCh === ')')) {
        $tmp = substr($word, 1, strlen($word) - 2);
        if (ctype_digit($tmp)) {
            return TRUE;
        }
    }
    return FALSE;
}

/**
 * @param mysqli $mysqli
 * @param string $body
 *
 * @return string
 */
function fixBody($mysqli, $body) {
    $body = $mysqli->escape_string($body);
    $words = explode(' ', $body);
    $i = 0;
    $fixed = '';
    foreach ($words as $word) {
        if (!isFootnote($word)) {
            $fixed .= ' ' . $word;
        }
        $i++;
    }
    return trim($fixed);
}
