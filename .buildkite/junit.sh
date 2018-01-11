#!/bin/bash

set -euo pipefail

mkdir -p tmp-junit

echo "--- :junit: Download the junits"
buildkite-agent artifact download tmp-junit/test-results.xml tmp-junit

echo "--- :junit:: Processing the junits"
docker run --rm -v "$(pwd):/app" node:carbon bash -c "cd /app && npm install xml2js --quiet --silent &> /dev/null && node /app/.buildkite/parse-xml.js /app/tmp-junit/*.xml" > tmp-junit/annotation.md

echo "--- :buildkite: Creating annotation"
buildkite-agent annotate --context junit --style error < tmp-junit/annotation.md