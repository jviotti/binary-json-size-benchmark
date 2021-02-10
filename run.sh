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
DECODE_SCRIPT="decode.sh"
ROOT_DIRECTORY="$PWD"
OUTPUT_DIRECTORY="$ROOT_DIRECTORY/results"
TMP_DIRECTORY="$ROOT_DIRECTORY/.tmp"

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
    assert_file_exists "$format/$DECODE_SCRIPT"

    OUTPUT_FILE="$OUTPUT_DIRECTORY/$DOCUMENT_NAME/$FORMAT_NAME/output.bin"
    rm -f "$OUTPUT_FILE"
    mkdir -p "$(dirname "$OUTPUT_FILE")"
    cd "$format"
    ./"$ENCODE_SCRIPT" "$JSON_FILE" "$OUTPUT_FILE"
    cd "$ROOT_DIRECTORY"
    assert_file_exists "$OUTPUT_FILE"
    xxd "$OUTPUT_FILE"

    DECODE_OUTPUT_FILE="$TMP_DIRECTORY/$DOCUMENT_NAME/$FORMAT_NAME.json"
    rm -f "$DECODE_OUTPUT_FILE"
    mkdir -p "$(dirname "$DECODE_OUTPUT_FILE")"
    cd "$format"
    ./"$DECODE_SCRIPT" "$OUTPUT_FILE" | jq > "$DECODE_OUTPUT_FILE"
    cd "$ROOT_DIRECTORY"
    assert_file_exists "$DECODE_OUTPUT_FILE"

    colordiff "$JSON_FILE" "$DECODE_OUTPUT_FILE"

    for ratio in $(seq 1 9)
    do
      COMPRESSED_FILE="$OUTPUT_FILE.$ratio.gz"
      rm -f "$COMPRESSED_FILE"
      echo ">> Compressing result with GZIP + ratio $ratio"
      gzip "-$ratio" < "$OUTPUT_FILE" > "$COMPRESSED_FILE"
      assert_file_exists "$COMPRESSED_FILE"
    done
  done
done
