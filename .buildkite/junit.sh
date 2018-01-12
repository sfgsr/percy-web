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

docker cp .buildkite/parse-xml.js $CONTAINER_ID:/app/.buildkite/parse-xml.js
docker cp "tmp-junit/*.xml" $CONTAINER_ID:/app/tmp-junit
docker exec "$CONTAINER_ID" bash -c "
  cd /app &&
    npm install xml2js --quiet --silent &> /dev/null &&
    node /app/.buildkite/parse-xml.js /app/tmp-junit/*.xml
" > tmp-junit/annotation.md

echo "--- :buildkite: Creating annotation"
buildkite-agent annotate --context junit --style error < tmp-junit/annotation.md