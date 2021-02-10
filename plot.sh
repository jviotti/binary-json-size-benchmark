#!/bin/sh

set -eu

ROOT_DIRECTORY="$PWD"
GNUPLOT_FILE="$ROOT_DIRECTORY/plot.gpi"

for document in results/*
do
  echo ">> Plot $document"
  DOCUMENT_ID="$(basename "$document")"
  DOCUMENT_NAME="$(cat "benchmark/$DOCUMENT_ID/NAME" | tr -d '\n')"
  cd "$document"
  gnuplot -e "description=\"$DOCUMENT_NAME\"" "$GNUPLOT_FILE"
  cd "$ROOT_DIRECTORY"
  mv "$document/chart.png" "$ROOT_DIRECTORY/charts/$DOCUMENT_ID.png"
done
