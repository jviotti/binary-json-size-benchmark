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

ROOT="$PWD"
DOCUMENT_PATH="$("$PWD/scripts/document-path.sh" "$DOCUMENT" "$FORMAT")"
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

FINAL_JSON_PATH="$(dirname "$OUTPUT")/encode.json"
PATCH_PATH="$(dirname "$DOCUMENT_PATH")/$FORMAT/pre.patch.json"

if [ -f "$PATCH_PATH" ]
then
  node scripts/jsonpatch.js "$PATCH_PATH" < "$DOCUMENT_PATH" > "$FINAL_JSON_PATH"
else
  cp "$DOCUMENT_PATH" "$FINAL_JSON_PATH"
fi

cd "$(dirname "$SCRIPT")"
DEPSDIR="$DEPSDIR" ROOT="$ROOT" FWD="$(dirname "$DOCUMENT_PATH")/$FORMAT" \
  ./"$(basename "$SCRIPT")" "$FINAL_JSON_PATH" "$OUTPUT"
assert_file_exists "$OUTPUT"
