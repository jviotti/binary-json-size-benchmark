#!/bin/sh

set -o errexit
DOCUMENT="$1"
FORMAT="$2"
set -o nounset

if [ -z "$DOCUMENT" ] || [ -z "$FORMAT" ]
then
  echo "Usage: $0 <document> <format>" 1>&2
  exit 1
fi

. "src/_utils.sh"
DOCUMENT_PATH="$PWD/benchmark/$DOCUMENT/document.json"
echo "$DOCUMENT_PATH"
