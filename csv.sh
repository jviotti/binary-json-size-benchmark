#!/bin/sh

set -eu

byte_size() {
  stat -f '%z' "$1"
}

RESULT_VECTOR="output.bin"
for ratio in $(seq 1 9)
do
  RESULT_VECTOR="$RESULT_VECTOR output.bin.$ratio.gz"
done

for document in results/*
do
  OUTPUT_FILE="$document/data.csv"
  echo ">> Generating $OUTPUT_FILE"
  rm -f "$OUTPUT_FILE"
  INDEX="1"
  for format in "$document"/*
  do
    if [ ! -d "$format" ]
    then
      continue
    fi

    FORMAT_ID="$(basename "$format")"
    FORMAT_NAME="$(grep "^$FORMAT_ID" NAMES | cut -d ' ' -f2-)"

    if [ -z "$FORMAT_NAME" ]
    then
      echo "No readable name entry for $FORMAT_ID" 1>&2
      exit 1
    fi

    ROW="$INDEX \"$FORMAT_NAME\""
    for item in $RESULT_VECTOR
    do
      ROW="$ROW $(byte_size "$format/$item")"
    done
    echo "$ROW" >> "$OUTPUT_FILE"

    INDEX="$(echo "$INDEX + 1" | bc)"
  done

  cat "$OUTPUT_FILE"
done
