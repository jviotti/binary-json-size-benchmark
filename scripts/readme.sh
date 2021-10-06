#!/bin/sh

GITHUB_REPOSITORY="https://github.com/jviotti/binary-json-size-benchmark"

set -eu

echo "---"
echo "title: Benchmark"
echo "permalink: /"
echo "---"
echo ""
echo "[![DOI](https://www.zenodo.org/badge/337583132.svg)](https://www.zenodo.org/badge/latestdoi/337583132)"
echo ""
echo "[**JSON documents**](#json-documents) - [**Serialization formats**](#serialization-formats) - [**Results**](#results) - [**Running locally**](#running-locally) - [**GitHub**]($GITHUB_REPOSITORY)"
echo "
A large-scale space-efficiency benchmark of JSON-compatible binary
serialization formats (with and without compression) involving representative
real-world JSON documents.
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

| Name | Type | Document | SchemaStore |
|------|------|----------|-------------|"

for document in output/*
do
  DOCUMENT_ID="$(basename "$document")"
  TITLE="$(tr -d '\n' < "benchmark/$DOCUMENT_ID/NAME")"
  SCHEMASTORE_URL="$(tr -d '\n' < "benchmark/$DOCUMENT_ID/SOURCE")"
  printf "| %s | %s | %s | %s |\n" \
    "[$TITLE](#$DOCUMENT_ID)" \
    "$(cat "benchmark/$DOCUMENT_ID/TAXONOMY")" \
    "[Link]($GITHUB_REPOSITORY/blob/main/benchmark/$DOCUMENT_ID/document.json)" \
    "[Link]($SCHEMASTORE_URL)"
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
  echo "![$TITLE chart](https://www.jviotti.com/binary-json-size-benchmark/charts/$DOCUMENT_ID.png)"
  echo ""

  awk -v document="$DOCUMENT_ID" -f data.awk "output/$DOCUMENT_ID/data.dat"

  echo ""
  echo "#### Schema-driven statistics"
  echo ""
  awk -f stats-table.awk "output/$DOCUMENT_ID/stats-schema-driven.dat"
  echo ""

  echo "#### Schema-less statistics"
  echo ""
  awk -f stats-table.awk "output/$DOCUMENT_ID/stats-schema-less.dat"
  echo ""

  echo "![$TITLE violin plot](https://www.jviotti.com/binary-json-size-benchmark/charts/violin/$DOCUMENT_ID.png)"
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
