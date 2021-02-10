#!/bin/sh

set -eu

for file in results/*/*/*.bin
do
  for ratio in $(seq 1 9)
  do
    COMPRESSED_FILE="$file.$ratio.gz"
    rm -f "$COMPRESSED_FILE"
    echo ">> Compressing "$file" with GZIP + ratio $ratio"
    gzip --no-name "-$ratio" < "$file" > "$COMPRESSED_FILE"
  done
done
