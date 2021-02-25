#!/bin/sh

set -o errexit
set -o nounset

info() {
  echo ">> $1" 1>&2
}

assert_fail() {
  info "ERROR: $1"
  exit 1
}

assert_file_exists() {
  if [ ! -f "$1" ]
  then
    assert_fail "No such file: $1"
  fi
}
