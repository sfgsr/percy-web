#!/bin/bash

set -euo pipefail

mkdir -p tmp-junit

echo "--- :junit: Download the junits"
buildkite-agent artifact download tmp-junit/*.xml tmp-junit

echo "--- :junit:: Processing the junits"
CONTAINER_ID=$(docker run -d -i node:carbon)
function cleanup() {
  docker stop $CONTAINER_ID
  echo 'Done.'
}
trap cleanup EXIT

docker exec "$CONTAINER_ID" mkdir -p /app/.buildkite /app/tmp-junit
docker cp .buildkite/parse-xml.js $CONTAINER_ID:/app/.buildkite/parse-xml.js
docker cp tmp-junit $CONTAINER_ID:/app/tmp-junit
docker exec "$CONTAINER_ID" bash -c "
  cd /app &&
    npm install -g junit-merge --quiet --silent &> /dev/null &&
    npm install xml2js --quiet --silent &> /dev/null &&
    junit-merge -r -d tmp-junit/ -o .buildkite/merged-xml.xml &&
    node /app/.buildkite/parse-xml.js
" > ./annotation.md


echo "--- :buildkite: Creating annotation"
buildkite-agent annotate --context junit --style error < ./annotation.md