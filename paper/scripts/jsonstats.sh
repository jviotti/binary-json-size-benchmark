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

FILES="$(find schemastore -type f -name '*.json')"

for file in $FILES
do
  FILENAME="$(basename "$file")"
  echo "Processing $FILENAME $file"
  mkdir -p stats/analysis
  node "$JSONBINPACK/dist/utils/jsonstats.js" \
    analyze "$file" > "stats/analysis/$FILENAME"
  mkdir -p stats/summary
  node "$JSONBINPACK/dist/utils/jsonstats.js" \
    summarize "$file" > "stats/summary/$FILENAME"
  mkdir -p stats/qualifiers
  node "$JSONBINPACK/dist/utils/jsonstats.js" \
    qualify "$file" > "stats/qualifiers/$FILENAME"
done
