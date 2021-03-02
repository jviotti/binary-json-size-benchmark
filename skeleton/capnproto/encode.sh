#!/bin/sh

set -eu

capnp convert json:packed "$FWD/schema.capnp" Main < "$1" > "$2"
