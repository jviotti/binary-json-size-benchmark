#!/bin/sh

set -eu

json2msgpack < "$1" > "$2"
