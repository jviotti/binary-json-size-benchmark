#!/bin/sh

set -eu

echo "Binary JSON-compatible Format Benchmark"
echo "======================================="
echo "
A size benchmark of JSON-compatible binary serialization formats.

Serialization Formats
---------------------
"

cat docs/versions.markdown

echo "
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
  echo "
- [**Input Document**](benchmark/$DOCUMENT_ID/document.json)
  "

./data.awk output/$DOCUMENT_ID/data.dat

done

echo "
Running locally
---------------
"

cat docs/reproducibility.markdown
