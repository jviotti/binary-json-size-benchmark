#!/bin/sh

set -eu

"$ROOT/.tmp/capnproto/c++/src/capnp/capnp" convert packed:json "$FWD/schema.capnp" Main < "$1" > "$2"
