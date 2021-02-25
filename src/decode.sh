#!/bin/sh

set -o errexit
FILE="$1"
DOCUMENT="$2"
FORMAT="$3"
OUTPUT="$4"
set -o nounset

if [ -z "$FILE" ] || [ -z "$DOCUMENT" ] || [ -z "$FORMAT" ] || [ -z "$OUTPUT" ]
then
  echo "Usage: $0 <file> <document> <format> <output>" 1>&2
  exit 1
fi

source "$PWD/src/_utils.sh"

# Reset output
rm -rf "$OUTPUT" && mkdir -p "$(dirname "$OUTPUT")"

assert_file_exists "$FILE"

SCRIPT_NAME="decode.sh"
SCRIPT="$PWD/benchmark/$DOCUMENT/$FORMAT/$SCRIPT_NAME"

# Generic fallback
if [ ! -f "$SCRIPT" ]
then
  SCRIPT="$PWD/skeleton/$FORMAT/$SCRIPT_NAME"
fi

assert_file_exists "$SCRIPT"
info "Using entrypoint: $SCRIPT"
info "Output: $OUTPUT"

cd "$(dirname "$SCRIPT")"
./"$(basename "$SCRIPT")" "$FILE" "$OUTPUT"
assert_file_exists "$OUTPUT"
