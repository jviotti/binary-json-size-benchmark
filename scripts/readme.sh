#!/bin/sh

set -eu

cat scripts/README.pre.md

echo ""
echo "Results"
echo "-------"
echo ""

for document in results/*
do
  DOCUMENT_ID="$(basename "$document")"
  TITLE="$(tr -d '\n' < "benchmark/$DOCUMENT_ID/NAME")"
  echo "### $TITLE"
  echo ""
  echo "![$TITLE chart](./charts/$DOCUMENT_ID.png)"
  echo ""
  echo "- [**Input Document**](benchmark/$DOCUMENT_ID/document.json)"
  echo "- [**Benchmark Numbers**](results/$DOCUMENT_ID/data.dat)"
done

