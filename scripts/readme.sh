#!/bin/sh

set -eu

echo "Binary JSON-compatible Format Benchmark"
echo "======================================="
echo "
A size benchmark of JSON-compatible binary serialization formats.
"

echo "- JSON documents"
echo "- Serialization formats"
echo "- Results"
for document in output/*
do
  DOCUMENT_ID="$(basename "$document")"
  TITLE="$(tr -d '\n' < "benchmark/$DOCUMENT_ID/NAME")"
  echo "    - [$TITLE](#$DOCUMENT_ID)"
done
echo "- Running locally"
echo "- License"

echo "
JSON documents
--------------

| Name | Taxonomy | Link | SchemaStore |
|------|----------|------|-------------|"

for document in output/*
do
  DOCUMENT_ID="$(basename "$document")"
  TITLE="$(tr -d '\n' < "benchmark/$DOCUMENT_ID/NAME")"
  SCHEMASTORE_URL="$(tr -d '\n' < "benchmark/$DOCUMENT_ID/SOURCE")"
  echo "| $TITLE | XXX | [:arrow_upper_right:](benchmark/$DOCUMENT_ID/document.json) | [:arrow_upper_right:]($SCHEMASTORE_URL) |"
done

echo "
Serialization formats
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
  echo "<h3 id=\"$DOCUMENT_ID\">$TITLE</h3>"
  echo ""
  echo "![$TITLE chart](./charts/$DOCUMENT_ID.png)"
  echo "
- [**Input Document**](benchmark/$DOCUMENT_ID/document.json)
  "

awk -f data.awk "output/$DOCUMENT_ID/data.dat"
echo ""

done

echo "
Running locally
---------------
"

cat docs/reproducibility.markdown

echo "
License
-------

This work is released under the Apache-1.0 license.
"
