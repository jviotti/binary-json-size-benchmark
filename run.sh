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
OUTPUT_DIRECTORY="$PWD/results"

for document in benchmark/*
do
  DOCUMENT_NAME="$(basename "$document")"
  JSON_FILE="$PWD/$document/document.json"
  assert_file_exists "$JSON_FILE"

  for format in "$document"/*
  do
    if [ ! -d "$format" ]
    then
      continue
    fi

    FORMAT_NAME="$(basename "$format")"
    assert_file_exists "$format/$ENCODE_SCRIPT"
    pushd "$format"
    OUTPUT_FILE="$OUTPUT_DIRECTORY/$DOCUMENT_NAME/$FORMAT_NAME/output.bin"
    rm -f "$OUTPUT_FILE"
    mkdir -p "$(dirname "$OUTPUT_FILE")"
    ./"$ENCODE_SCRIPT" "$JSON_FILE" "$OUTPUT_FILE"
    popd
    assert_file_exists "$OUTPUT_FILE"
    xxd "$OUTPUT_FILE"
  done
done
