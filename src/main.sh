#!/bin/sh

set -o errexit
set -o nounset

source "$PWD/src/_utils.sh"

FORMATS="$(ls -1 skeleton)"
DOCUMENTS="$(ls -1 benchmark)"

OUTPUT_DIRECTORY="$PWD/output"
rm -rf "$OUTPUT_DIRECTORY"

byte_size() {
  stat -f '%z' "$1"
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

    COMPRESSED_FILE="$BINARY.gz"
    rm -f "$COMPRESSED_FILE"
    info "Compressing $BINARY with GZIP"
    gzip --no-name -9 < "$BINARY" > "$COMPRESSED_FILE"

    echo "$INDEX \"$NAME\" $(byte_size "$BINARY") $(byte_size "$COMPRESSED_FILE")" >> "$DATA_FILE"
    INDEX="$(echo "$INDEX + 1" | bc)"
  done

  make "charts/$document.png"
done

./src/readme.sh > README.md
