#!/bin/sh

set -e
DATASET="$1"
set -u

if [ -z "$DATASET" ]
then
  echo "Usage: $0 <dataset>" 1>&2
  exit 1
fi

if [ ! -d "$DATASET" ]
then
  echo "Not a directory: $DATASET" 1>&2
fi

DAT_FILE="datasets/schemastore-byte-size.dat"
rm -f "$DAT_FILE"
touch "$DAT_FILE"

for file in $(find "$DATASET" -type f -name '*.json')
do
  stat -f '%z' "$file" >> "$DAT_FILE"
done
