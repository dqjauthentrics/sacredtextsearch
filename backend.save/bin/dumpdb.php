#!/usr/local/bin/php
<?php
$dumpBasePath = $argv[1];
if (empty($dumpBasePath)) {
    echo 'Usage: dumbdb.php <path>';
    exit;
}
$dTime = date('Y_m_d_h_i');
$dumpName = "sacredtext_{$dTime}.dump";
$dumpPath = $dumpBasePath . '/' . $dumpName;
$dumpOptions = '--add-drop-database --routines --databases ';

echo "Dumping \"sacredtext\" to \"$dumpPath\"...\n";
$dumpCmd = "mysqldump --login-path=rootlocal -h localhost $dumpOptions sacredtext > \"$dumpPath\"";
echo "DUMP: $dumpCmd\n";
system($dumpCmd);
echo "Compressing \"$dumpPath\"...\n";
system("bzip2 \"$dumpPath\"");
echo "Done.\n";
