#!/bin/sh

set -eu

# for document in eslintrc
for document in benchmark/*
do
  NAME="$(basename "$document")"
  rm -rf "output/$NAME/jsonbinpack" "output/$NAME/data.dat" "charts/$NAME.png"
  make "benchmark-$NAME-jsonbinpack"
done

make README.md
