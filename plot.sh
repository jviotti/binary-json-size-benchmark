#!/bin/sh

set -eu

ROOT_DIRECTORY="$PWD"
GNUPLOT_FILE="$ROOT_DIRECTORY/plot.gpi"

for document in results/*
do
  echo ">> Plot $document"
  DOCUMENT_ID="$(basename "$document")"
  cd "$document"
  gnuplot "$GNUPLOT_FILE"
  cd "$ROOT_DIRECTORY"
  mv "$document/chart.png" "$ROOT_DIRECTORY/charts/$DOCUMENT_ID.png"
done
