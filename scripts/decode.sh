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

. "scripts/_utils.sh"

# Reset output
rm -rf "$OUTPUT" && mkdir -p "$(dirname "$OUTPUT")"

assert_file_exists "$FILE"

SCRIPT_NAME="decode.sh"
ROOT="$PWD"
SCRIPT="$PWD/benchmark/$DOCUMENT/$FORMAT/$SCRIPT_NAME"
FWD="$(dirname "$SCRIPT")"
PATCH_PATH="$FWD/post.patch.json"

# Generic fallback
if [ ! -f "$SCRIPT" ]
then
  SCRIPT="$PWD/skeleton/$FORMAT/$SCRIPT_NAME"
fi

assert_file_exists "$SCRIPT"
info "Using entrypoint: $SCRIPT"
info "Output: $OUTPUT"

cd "$(dirname "$SCRIPT")"
FWD="$FWD" ./"$(basename "$SCRIPT")" "$FILE" "$OUTPUT"
assert_file_exists "$OUTPUT"

if [ -f "$PATCH_PATH" ]
then
  node "$ROOT/scripts/jsonpatch.js" "$PATCH_PATH" < "$OUTPUT" > "$OUTPUT.final"
  mv "$OUTPUT.final" "$OUTPUT"
fi
