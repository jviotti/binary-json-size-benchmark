#!/bin/sh

set -eu

node decode.js "$1" > "$2"
