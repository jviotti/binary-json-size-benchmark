#!/bin/sh

set -e
DATA_DIRECTORY="$1"
set -u

INDEX="1"
for format in "$DATA_DIRECTORY"/*
do
  if [ ! -d "$format" ]
  then
    continue
  fi

  NAME="$(cat "skeleton/$(basename "$format")/NAME")"

  printf "%s \"%s\" %s %s %s %s\n" \
    "$INDEX" \
    "$NAME" \
    "$(./scripts/byte-size.sh "$format/output.bin")" \
    "$(./scripts/byte-size.sh "$format/output.bin.gz")" \
    "$(./scripts/byte-size.sh "$format/output.bin.lz4")" \
    "$(./scripts/byte-size.sh "$format/output.bin.lzma")"

  INDEX="$(echo "$INDEX + 1" | bc)"
done
