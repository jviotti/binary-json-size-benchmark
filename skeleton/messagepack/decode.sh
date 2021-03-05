#!/bin/sh

set -eu

"$DEPSDIR/msgpack-tools/msgpack2json" < "$1" > "$2"
