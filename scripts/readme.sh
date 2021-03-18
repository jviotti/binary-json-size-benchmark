#!/bin/sh

set -eu

echo "Binary JSON-compatible Format Size Benchmark"
echo "============================================"
echo ""
echo "[**JSON documents**](#json-documents) | [**Serialization dormats**](#serialization-formats) | [**Results**](#results) | [**Running locally**](#running-locally)"
echo "
A large-scale space-efficiency benchmark of JSON-compatible binary
serialization formats involving representative real-world JSON documents.
"

echo "
JSON documents
--------------

This size benchmark utilizes representative real-world JSON documents adapted
from the open-source Apache-2.0
[SchemaStore](https://www.schemastore.org/json/)'s [test
suite](https://github.com/SchemaStore/schemastore/tree/master/src/test). All
the JSON documents used in this benchmark are described in the table below.
The *type* column is based on JSON BinPack's [JSON Stats online
tool](https://www.jsonbinpack.org/stats/).

| Name | Type | Link | SchemaStore |
|------|------|------|-------------|"

for document in output/*
do
  DOCUMENT_ID="$(basename "$document")"
  TITLE="$(tr -d '\n' < "benchmark/$DOCUMENT_ID/NAME")"
  SCHEMASTORE_URL="$(tr -d '\n' < "benchmark/$DOCUMENT_ID/SOURCE")"
  printf "| %s | %s | %s | %s |\n" \
    "[$TITLE](#$DOCUMENT_ID)" \
    "$(cat "benchmark/$DOCUMENT_ID/TAXONOMY")" \
    "[:arrow_upper_right:](benchmark/$DOCUMENT_ID/document.json)" \
    "[:arrow_upper_right:]($SCHEMASTORE_URL)"
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
  echo ""

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

This work is released under the Apache-2.0 license."
