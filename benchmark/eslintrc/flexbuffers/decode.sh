#!/bin/sh

set -eu

flatc --flexbuffers -o "$PWD" --strict-json --json "$1"
OUTPUT_FILE="$PWD/$(basename "$1" .bin).json"
cat "$OUTPUT_FILE"
rm "$OUTPUT_FILE"
