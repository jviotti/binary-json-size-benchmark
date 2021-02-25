#!/bin/sh

set -o errexit
DOCUMENT="$1"
FORMAT="$2"
set -o nounset

. "src/_utils.sh"

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
  rm -rf charts
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
    SOURCE="$("$PWD/src/document-path.sh" "$document" "$format")"
    BINARY="$OUTPUT_DIRECTORY/$document/$format/output.bin"
    JSON="$OUTPUT_DIRECTORY/$document/$format/decode.json"

    ./src/encode.sh "$document" "$format" "$BINARY"
    xxd "$BINARY"
    ./src/decode.sh "$BINARY" "$document" "$format" "$JSON"
    cat "$JSON"

    if ! python3 src/json-equals.py "$SOURCE" "$JSON"
    then
      assert_fail "Files are not equal"
    fi

    if [ "$ALL" = "0" ]
    then
      continue
    fi

    COMPRESSED_FILE="$BINARY.gz"
    rm -f "$COMPRESSED_FILE"
    info "Compressing $BINARY with GZIP"
    gzip --no-name -9 < "$BINARY" > "$COMPRESSED_FILE"

    echo "$INDEX \"$NAME\" $(byte_size "$BINARY") $(byte_size "$COMPRESSED_FILE")" >> "$DATA_FILE"
    INDEX="$(echo "$INDEX + 1" | bc)"
  done

  if [ "$ALL" = "1" ]
  then
    make "charts/$document.png"
  fi
done

if [ "$ALL" = "1" ]
then
  ./src/readme.sh > README.md
fi
