#!/bin/sh

set -eu

flatc --raw-binary -o "$PWD" --strict-json --json "$FWD/schema.fbs" -- "$1"
OUTPUT_FILE="$PWD/$(basename "$1" .bin).json"
cat "$OUTPUT_FILE" > "$2"
rm "$OUTPUT_FILE"
