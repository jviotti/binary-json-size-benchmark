#!/bin/sh

set -o errexit
DOCUMENT="$1"
FORMAT="$2"
set -o nounset

ALL="1"

if [ -z "$DOCUMENT" ]
then
  DOCUMENTS="$(ls -1 benchmark)"
else
  ALL="0"
  DOCUMENTS="$DOCUMENT"
fi

if [ -z "$FORMAT" ]
then
  FORMATS="$(ls -1 skeleton)"
else
  ALL="0"
  FORMATS="$FORMAT"
fi

OUTPUT_DIRECTORY="$PWD/output"

if [ "$ALL" = "1" ]
then
  rm -rf "$OUTPUT_DIRECTORY"
fi

for document in $DOCUMENTS
do
  for format in $FORMATS
  do
    if [ ! -f "$PWD/benchmark/$document/$format/IMPOSSIBLE" ]
    then
      make "output/$document/$format/output.bin" "output/$document/$format/output.json"
    else
      mkdir -p "output/$document/$format"
      touch "output/$document/$format/output.bin" "output/$document/$format/output.json"
    fi
  done
done

if [ "$ALL" = "1" ]
then
  make all
fi
