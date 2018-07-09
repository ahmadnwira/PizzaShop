<?php
/*
    source : https://ocramius.github.io/blog/automated-code-coverage-check-for-github-pull-requests-with-travis/
    usage: php tests/coverage.php tests/_reports/logs/clover.xml
*/

$inputFile  = $argv[1];

if (!file_exists($inputFile)) {
    throw new InvalidArgumentException('Invalid input file provided');
}

$xml = new SimpleXMLElement(file_get_contents($inputFile));
$metrics = $xml->xpath('//metrics');
$totalElements = 0;
$checkedElements = 0;

foreach ($metrics as $metric) {
    $totalElements += (int) $metric['elements'];
    $checkedElements += (int) $metric['coveredelements'];
}

echo "coverage is " . round(($checkedElements / $totalElements) * 100) . "% \n";