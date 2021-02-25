#!/bin/sh

set -eu

echo "Binary JSON-compatible Format Benchmark"
echo "======================================="
echo "
A size benchmark of JSON-compatible binary serialization formats.

Results
-------
"

for document in output/*
do
  DOCUMENT_ID="$(basename "$document")"
  TITLE="$(tr -d '\n' < "benchmark/$DOCUMENT_ID/NAME")"
  echo "### $TITLE"
  echo ""
  echo "![$TITLE chart](./charts/$DOCUMENT_ID.png)"
  echo ""
  echo "- [**Input Document**](benchmark/$DOCUMENT_ID/document.json)"
  echo "- [**Benchmark Numbers**](output/$DOCUMENT_ID/data.dat)"
done
