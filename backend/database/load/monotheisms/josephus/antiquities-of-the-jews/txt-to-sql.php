#!/usr/local/bin/php
<?php
$bookId = $argv[2];
$transId = 216;
$mysqli = new mysqli('localhost', 'sacred', 'sacred42', 'sacredtext');
$fName = $argv[1];
$parts = explode('-', $fName);
$chNum = 0;
$lines = file($fName);
$vNum = 1;
$body = '';
$bookStarted = FALSE;
$bookName = '';
$chStarted = FALSE;
$chName = '';
foreach ($lines as $line) {
    $line = str_replace('“', '"', $line);
    $line = str_replace('”', '"', $line);
    $line = str_replace("’", "'", $line);
    $line = str_replace("‘", "'", $line);
    $line = trim($line);
    $firstWord = !empty($line)? ucfirst(strtolower(explode(' ', $line)[0])) : NULL;
    if ($chStarted && !empty($line)) {
        $chTitle = $line;
        $chTitle = $mysqli->escape_string($chTitle);
        $chName = $mysqli->escape_string($chName);
        echo "INSERT INTO chapter (book_id, translation_id, chapter_number, name, title) VALUES ($bookId, $transId, $chNum, '{$chName}', '{$chTitle}');" . PHP_EOL;
        $chStarted = FALSE;
    }
    else if (!$chStarted && $firstWord === 'Chapter') {
        $chName = ucfirst(strtolower($line));
        $chStarted = TRUE;
        $vNum = 1;
        $chNum++;
    }
    else {
        if (empty($line)) {
            if (!empty($body)) {
                $body = fixBody($mysqli, $body);
                echo "INSERT INTO verse (book_id, translation_id, chapter_number, verse_number, body) VALUES ($bookId, $transId, $chNum, $vNum, '$body');" . PHP_EOL;
                $vNum++;
                $body = '';
            }
        }
        else {
            $body .= (strlen($body) > 0 ? ' ' : '') . $line;
        }
    }
}
if (!empty($body)) {
    $body = fixBody($mysqli, $body);
    echo "INSERT INTO verse (book_id, translation_id, chapter_number, verse_number, body) VALUES ($bookId, $transId, $chNum, $vNum, '$body');" . PHP_EOL;
    $vNum++;
    $body = '';
}

function isFootnote($word) {
    $firstCh = substr($word, 0, 1);
    $lastCh = substr($word, strlen($word) - 1);
    if (($firstCh === '[' && $lastCh === ']') || ($firstCh === '(' && $lastCh === ')')) {
        $tmp = substr($word,1, strlen($word) - 2);
        if (ctype_digit($tmp)) {
            return true;
        }
    }
    return false;
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
    $skipFirst = false;
    if (substr($words[0], strlen($words[0]) - 1, 1) === '.') {
        $skipFirst = true;
    }
    $fixed = '';
    $i = 0;
    foreach ($words as $word) {
        if ((!($i === 0 && $skipFirst)) && !isFootnote($word)) {
            $fixed .= ' ' . $word;
        }
        $i++;
    }
    return trim($fixed);
}

