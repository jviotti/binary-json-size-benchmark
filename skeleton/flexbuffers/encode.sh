#!/bin/sh

set -eu

OUTPUT_DIRECTORY="$(dirname "$2")"
"$DEPSDIR/flatbuffers/flatc" --flexbuffers -o "$OUTPUT_DIRECTORY" --binary "$1"
mv "$OUTPUT_DIRECTORY/$(basename "$1" .json).bin" "$2"
