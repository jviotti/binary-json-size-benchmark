#!/bin/sh

set -eux

set +e
"$DEPSDIR/capnproto/c++/src/capnp/capnp" convert binary:json "$1" Main < "$2" > "$3"
EXIT_CODE="$?"
set -e

# Try "flat"
if [ "$EXIT_CODE" = "1" ]
then
  "$DEPSDIR/capnproto/c++/src/capnp/capnp" convert flat:json "$1" Main < "$2" > "$3"
fi
