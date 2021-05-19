#!/bin/sh

set -e
set -u

for document in benchmark/*
do
  SCHEMA="$document/jsonbinpack/schema.json"
  INSTANCE="$document/document.json"

  ./node_modules/.bin/ajv validate -s "$SCHEMA" -d "$INSTANCE" \
    --strict=true --spec=draft2020 --validate-formats=true \
    -c ajv-formats --strict-required=true --strict-tuples=true
done
