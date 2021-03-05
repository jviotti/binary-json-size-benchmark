#!/bin/sh

set -o errexit
DOCUMENT="$1"
FORMAT="$2"
set -o nounset

. "scripts/_utils.sh"

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
    SOURCE="$("$PWD/scripts/document-path.sh" "$document" "$format")"
    BINARY="$OUTPUT_DIRECTORY/$document/$format/output.bin"
    JSON="$OUTPUT_DIRECTORY/$document/$format/decode.json"
    IMPOSSIBLE_MARK="$(dirname "$SOURCE")/$format/IMPOSSIBLE"

    if [ ! -f "$IMPOSSIBLE_MARK" ]
    then
      ./scripts/encode.sh "$document" "$format" "$BINARY"
      xxd "$BINARY"
      ./scripts/decode.sh "$BINARY" "$document" "$format" "$JSON"
      cat "$JSON"

      if ! python3 scripts/json-equals.py "$SOURCE" "$JSON"
      then
        assert_fail "Files are not equal"
      fi
    fi

    if [ "$ALL" = "0" ]
    then
      continue
    fi

    if [ ! -f "$IMPOSSIBLE_MARK" ]
    then
      COMPRESSED_FILE_GZIP="$BINARY.gz"
      COMPRESSED_FILE_LZ4="$BINARY.lz4"
      rm -f "$COMPRESSED_FILE_GZIP" "$COMPRESSED_FILE_LZ4"
      info "Compressing $BINARY with GZIP and LZ4"
      gzip --no-name -9 < "$BINARY" > "$COMPRESSED_FILE_GZIP"
      lz4 -9 "$BINARY" "$COMPRESSED_FILE_LZ4"

      echo "$INDEX \"$NAME\" $(byte_size "$BINARY") $(byte_size "$COMPRESSED_FILE_GZIP") $(byte_size "$COMPRESSED_FILE_LZ4")" >> "$DATA_FILE"
    else
      echo "$INDEX \"$NAME\" 0 0 0" >> "$DATA_FILE"
    fi

    INDEX="$(echo "$INDEX + 1" | bc)"
  done

  if [ "$ALL" = "1" ]
  then
    make "charts/$document.png"
  fi
done

if [ "$ALL" = "1" ]
then
  ./scripts/readme.sh > README.md
fi
