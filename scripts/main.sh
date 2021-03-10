#!/bin/sh

set -o errexit
DOCUMENT="$1"
FORMAT="$2"
set -o nounset

info() {
  echo ">> $1" 1>&2
}

assert_fail() {
  info "ERROR: $1"
  exit 1
}

ALL="1"

if [ -z "$DOCUMENT" ]
then
  DOCUMENTS="$(ls -1 benchmark)"
else
  ALL="0"
  DOCUMENTS="$DOCUMENT"
fi

if [ -z "$FORMAT" ]
then
  FORMATS="$(ls -1 skeleton)"
else
  ALL="0"
  FORMATS="$FORMAT"
fi

OUTPUT_DIRECTORY="$PWD/output"

if [ "$ALL" = "1" ]
then
  rm -rf "$OUTPUT_DIRECTORY"
fi

byte_size() {
  if [ "$(uname)" = "Darwin" ]
  then
    stat -f '%z' "$1"
  else
    stat -c '%s' "$1"
  fi
}

for document in $DOCUMENTS
do
  INDEX="1"
  DATA_FILE="$OUTPUT_DIRECTORY/$document/data.dat"
  rm -f "$DATA_FILE"

  for format in $FORMATS
  do
    NAME="$(cat "$PWD/skeleton/$format/NAME")"
    SOURCE="$PWD/benchmark/$document/document.json"
    BINARY="$OUTPUT_DIRECTORY/$document/$format/output.bin"
    JSON="$OUTPUT_DIRECTORY/$document/$format/output.json"
    IMPOSSIBLE_MARK="$(dirname "$SOURCE")/$format/IMPOSSIBLE"

    if [ ! -f "$IMPOSSIBLE_MARK" ]
    then
      make "output/$document/$format/output.bin" "output/$document/$format/output.json"
    fi

    if [ "$ALL" = "0" ]
    then
      continue
    fi

    if [ ! -f "$IMPOSSIBLE_MARK" ]
    then
      make "$BINARY.gz" "$BINARY.lz4" "$BINARY.lzma"
    else
      mkdir -p "$(dirname "$BINARY")"
      touch "$BINARY" "$BINARY.gz" "$BINARY.lz4" "$BINARY.lzma"
    fi

    echo "$INDEX \"$NAME\" $(byte_size "$BINARY") $(byte_size "$BINARY.gz") $(byte_size "$BINARY.lz4") $(byte_size "$BINARY.lzma")" >> "$DATA_FILE"

    INDEX="$(echo "$INDEX + 1" | bc)"
  done

  if [ "$ALL" = "1" ]
  then
    make "charts/$document.png"
  fi
done

if [ "$ALL" = "1" ]
then
  make README.md
fi
