#!/bin/sh

set -eu

"$DEPSDIR/msgpack-tools/json2msgpack" < "$1" > "$2"
