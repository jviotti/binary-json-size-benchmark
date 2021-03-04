#!/bin/sh

set -eu

"$ROOT/.tmp/msgpack-tools/msgpack2json" < "$1" > "$2"
