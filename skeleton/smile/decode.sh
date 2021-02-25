#!/bin/sh

set -eu

INPUT_FILE="$1" clj -M decode.clj > "$2"
