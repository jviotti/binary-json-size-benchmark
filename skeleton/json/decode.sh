#!/bin/sh

set -eu

jq '.' < "$1" > "$2"
