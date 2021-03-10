#!/bin/sh

set -e
FILE="$1"
set -u

if [ -z "$FILE"  ]; then
  echo "Usage: $0 <file>" 1>&2
  exit 1
fi

if [ "$(uname)" = "Darwin" ]
then
  stat -f '%z' "$FILE"
else
  stat -c '%s' "$FILE"
fi
