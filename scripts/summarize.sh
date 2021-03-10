#!/bin/sh

set -e
DATA_DIRECTORY="$1"
set -u

byte_size() {
  if [ "$(uname)" = "Darwin" ]
  then
    stat -f '%z' "$1"
  else
    stat -c '%s' "$1"
  fi
}

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
    "$(byte_size "$format/output.bin")" \
    "$(byte_size "$format/output.bin.gz")" \
    "$(byte_size "$format/output.bin.lz4")" \
    "$(byte_size "$format/output.bin.lzma")"

  INDEX="$(echo "$INDEX + 1" | bc)"
done
