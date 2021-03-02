#!/bin/sh

set -eu

capnp convert packed:json "$FWD/schema.capnp" Main < "$1" > "$2"
