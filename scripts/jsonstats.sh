#!/bin/sh

set -e
JSONBINPACK="$1"
set -u

if [ -z "$JSONBINPACK" ]
then
  echo "Usage: $0 <jsonbinpack>" 1>&2
  exit 1
fi

if [ ! -d "$JSONBINPACK" ]
then
  echo "Not a directory: $JSONBINPACK" 1>&2
fi

mkdir -p stats

FILES="$(find datasets/schemastore -type f -name '*.json')"

for file in $FILES
do
  FILENAME="$(basename "$file")"
  echo "XX $FILENAME $file"
  mkdir -p stats/schemastore/analyze
  node "$JSONBINPACK/dist/cli/jsonstats.js" \
    analyze "$file" > "stats/schemastore/analyze/$FILENAME"
  mkdir -p stats/schemastore/summarize
  node "$JSONBINPACK/dist/cli/jsonstats.js" \
    summarize "$file" > "stats/schemastore/summarize/$FILENAME"
  mkdir -p stats/schemastore/qualify
  node "$JSONBINPACK/dist/cli/jsonstats.js" \
    qualify "$file" > "stats/schemastore/qualify/$FILENAME"
done
