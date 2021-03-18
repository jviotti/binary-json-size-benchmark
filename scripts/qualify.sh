#!/bin/sh

set -e
JSONSTATS="$1"
set -u

if [ ! -f "$JSONSTATS" ]
then
  echo "Usage: $0 <path-to-jsonstats>" 1>&2
  exit 1
fi

for document in benchmark/*
do
  DOCUMENT_PATH="$document/document.json"
  OUTPUT="$document/TAXONOMY"
  node "$JSONSTATS" qualify "$DOCUMENT_PATH" | jq -r '.[]' | tr '\n' ' ' > "$OUTPUT"
done
