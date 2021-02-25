#!/bin/sh

set -eu

msgpack2json < "$1" > "$2"
