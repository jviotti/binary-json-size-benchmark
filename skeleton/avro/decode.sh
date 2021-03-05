#!/bin/sh

set -eu

python3 decode.py "$1" > "$2"
