#!/usr/local/bin/php
<?php
$transId = 219;
$fName = $argv[1];
$sectionNum = explode('_', str_replace('.txt', '', $fName))[1];
$bookId = 114 + $sectionNum;
$mysqli = new mysqli('localhost', 'sacred', 'sacred42', 'sacredtext');
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
    $firstWord = !empty($line) ? explode(' ', $line)[0] : NULL;
    $restOfLine = substr($line, strlen($firstWord) + 1);
    if ($firstWord === 'Part') {
        $chNum++;
        $chTitle = $mysqli->escape_string(trim(titleCase($line)));
        echo "INSERT INTO chapter (book_id, translation_id, chapter_number, name, title) VALUES ($bookId, $transId, $chNum, '{$chName}', '{$chTitle}');" . PHP_EOL;
        $vNum = 1;
    }
    else if (!empty($line)) {
        $line = $mysqli->escape_string($line);
        echo "INSERT INTO verse (book_id, translation_id, chapter_number, verse_number, body) VALUES ($bookId, $transId, $chNum, $vNum, '$line');" . PHP_EOL;
        $vNum++;
    }
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
    $skipFirst = FALSE;
    if (substr($words[0], strlen($words[0]) - 1, 1) === '.') {
        $skipFirst = TRUE;
    }
    $fixed = '';
    $i = 0;
    foreach ($words as $word) {
        if (($i === 0 && !$skipFirst) || $i > 0) {
            $fixed .= ' ' . $word;
        }
        $i++;
    }
    return trim($fixed);
}


function titleCase($title) {
    $newTitle = strtolower(trim($title));
    $smallWordsArray = ['of', 'a', 'the', 'and', 'an', 'or', 'nor', 'but', 'is', 'if', 'then', 'else', 'when', 'at', 'from', 'by', 'on', 'off', 'for', 'in', 'out', 'over', 'to', 'into', 'with'];
    $words = explode(' ', $newTitle);
    if (count($words) > 0) {
        foreach ($words as $key => $word) {
            if ($key == 0 or !in_array($word, $smallWordsArray)) {
                $words[$key] = ucfirst($word);
            }
        }
        $newTitle = implode(' ', $words);
    }
    return $newTitle;
}
