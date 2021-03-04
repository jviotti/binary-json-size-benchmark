#!/bin/sh

set -eu

"$ROOT/.tmp/flatbuffers/flatc" --flexbuffers -o "$PWD" --strict-json --json "$1"
OUTPUT_FILE="$PWD/$(basename "$1" .bin).json"
cat "$OUTPUT_FILE" > "$2"
rm "$OUTPUT_FILE"
