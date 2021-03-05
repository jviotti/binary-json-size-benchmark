#!/bin/sh

set -eu

"$DEPSDIR/capnproto/c++/src/capnp/capnp" convert packed:json "$FWD/schema.capnp" Main < "$1" > "$2"
