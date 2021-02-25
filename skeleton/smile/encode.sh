#!/bin/sh

set -eu

JSON_FILE="$1" OUTPUT_FILE="$2" clj -M encode.clj
