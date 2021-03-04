#!/bin/sh

set -eu

jq -c '.' < "$1" > "$2"
