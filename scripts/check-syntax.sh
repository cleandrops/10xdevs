#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/.."

php -l wordpress/pracownia-www/functions.php
php -l wordpress/pracownia-wycena/pracownia-wycena.php

for file in reference/*.js wordpress/pracownia-wycena/*.js; do
  node --check "$file"
done

php -r 'json_decode(file_get_contents("wordpress/pracownia-www/theme.json"), true, 512, JSON_THROW_ON_ERROR); json_decode(file_get_contents("wordpress/pracownia-wycena/block.json"), true, 512, JSON_THROW_ON_ERROR); echo "JSON OK\n";'
