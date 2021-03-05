#!/bin/sh

set -eu

OUTPUT_DIRECTORY="$(dirname "$2")"
"$DEPSDIR/flatbuffers/flatc" --force-defaults --raw-binary -o "$OUTPUT_DIRECTORY" --binary "$FWD/schema.fbs" "$1"
mv "$OUTPUT_DIRECTORY/$(basename "$1" .json).bin" "$2"
