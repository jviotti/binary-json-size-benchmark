#!/bin/sh

set -eu

"$ROOT/.tmp/msgpack-tools/json2msgpack" < "$1" > "$2"
