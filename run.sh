#!/bin/sh

set -eu

fail() {
  echo "ERROR: $1" 1>&2
  exit 1
}

assert_file_exists() {
  if [ ! -f "$1" ]
  then
    fail "No such file: $1"
  fi
}

ENCODE_SCRIPT="encode.sh"
ROOT_DIRECTORY="$PWD"
OUTPUT_DIRECTORY="$ROOT_DIRECTORY/results"

for document in benchmark/*
do
  DOCUMENT_NAME="$(basename "$document")"
  JSON_FILE="$ROOT_DIRECTORY/$document/document.json"
  assert_file_exists "$JSON_FILE"

  for format in "$document"/*
  do
    if [ ! -d "$format" ]
    then
      continue
    fi
    
    echo "------------------------------------------"
    echo "Processing $format"
    echo "------------------------------------------"

    FORMAT_NAME="$(basename "$format")"
    assert_file_exists "$format/$ENCODE_SCRIPT"
    OUTPUT_FILE="$OUTPUT_DIRECTORY/$DOCUMENT_NAME/$FORMAT_NAME/output.bin"
    rm -f "$OUTPUT_FILE"
    mkdir -p "$(dirname "$OUTPUT_FILE")"

    cd "$format"
    ./"$ENCODE_SCRIPT" "$JSON_FILE" "$OUTPUT_FILE"
    cd "$ROOT_DIRECTORY"

    assert_file_exists "$OUTPUT_FILE"
    xxd "$OUTPUT_FILE"
  done
done
