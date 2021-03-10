#!/bin/sh

set -o errexit
DOCUMENT="$1"
FORMAT="$2"
OUTPUT="$3"
set -o nounset

if [ -z "$DOCUMENT" ] || [ -z "$FORMAT" ] || [ -z "$OUTPUT" ]
then
  echo "Usage: $0 <document> <format> <output>" 1>&2
  exit 1
fi

. "scripts/_utils.sh"

# Reset output
rm -rf "$OUTPUT" && mkdir -p "$(dirname "$OUTPUT")"

if [ "$FORMAT" = "avro" ]
then
  make "output/$DOCUMENT/$FORMAT/output.bin"
  exit 0
fi

ROOT="$PWD"
DOCUMENT_PATH="$("$PWD/scripts/document-path.sh" "$DOCUMENT" "$FORMAT")"
assert_file_exists "$DOCUMENT_PATH"

SCRIPT_NAME="encode.sh"
SCRIPT="$PWD/skeleton/$FORMAT/$SCRIPT_NAME"

assert_file_exists "$SCRIPT"
info "Using entrypoint: $SCRIPT"
info "Output: $OUTPUT"

FINAL_JSON_PATH="$(dirname "$OUTPUT")/encode.json"
make "output/$DOCUMENT/$FORMAT/encode.json"

cd "$(dirname "$SCRIPT")"
DEPSDIR="$DEPSDIR" ROOT="$ROOT" FWD="$(dirname "$DOCUMENT_PATH")/$FORMAT" \
  ./"$(basename "$SCRIPT")" "$FINAL_JSON_PATH" "$OUTPUT"
assert_file_exists "$OUTPUT"
