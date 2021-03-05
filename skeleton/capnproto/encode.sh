#!/bin/sh

set -eu

"$DEPSDIR/capnproto/c++/src/capnp/capnp" convert json:packed "$FWD/schema.capnp" Main < "$1" > "$2"
