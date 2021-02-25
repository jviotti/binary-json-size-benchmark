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

. "src/_utils.sh"

# Reset output
rm -rf "$OUTPUT" && mkdir -p "$(dirname "$OUTPUT")"

DOCUMENT_PATH="$("$PWD/src/document-path.sh" "$DOCUMENT" "$FORMAT")"
assert_file_exists "$DOCUMENT_PATH"

SCRIPT_NAME="encode.sh"
SCRIPT="$(dirname "$DOCUMENT_PATH")/$FORMAT/$SCRIPT_NAME"

# Generic fallback
if [ ! -f "$SCRIPT" ]
then
  SCRIPT="$PWD/skeleton/$FORMAT/$SCRIPT_NAME"
fi

assert_file_exists "$SCRIPT"
info "Using entrypoint: $SCRIPT"
info "Output: $OUTPUT"

cd "$(dirname "$SCRIPT")"
./"$(basename "$SCRIPT")" "$DOCUMENT_PATH" "$OUTPUT"
assert_file_exists "$OUTPUT"
