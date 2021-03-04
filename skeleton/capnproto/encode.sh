#!/bin/sh

set -eu

"$ROOT/.tmp/capnproto/c++/src/capnp/capnp" convert json:packed "$FWD/schema.capnp" Main < "$1" > "$2"
