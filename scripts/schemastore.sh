#!/bin/sh

set -e
SCHEMASTORE_LOCATION="$1"
set -u

if [ -z "$SCHEMASTORE_LOCATION" ]
then
  echo "Usage: $0 <schemastore>" 1>&2
  exit 1
fi

if [ ! -d "$SCHEMASTORE_LOCATION" ]
then
  echo "Not a directory: $SCHEMASTORE_LOCATION" 1>&2
fi

BASE_PATH="$SCHEMASTORE_LOCATION/src/test"
JSON_FILES="$(find "$BASE_PATH" -type f -name '*.json')"

OLD_IFS="$IFS"
# See https://unix.stackexchange.com/a/612529/43448
IFS=$'\n'

for file in $JSON_FILES
do
  RELATIVE_PATH="$(realpath --relative-to="$BASE_PATH" "$file")"
  DESTINATION="datasets/schemastore/$(echo "$RELATIVE_PATH" | tr '/' '-' | tr ' ' '-')"
  cp -v "$file" "$DESTINATION"
done

IFS="$OLD_IFS"

git -C "$SCHEMASTORE_LOCATION" rev-parse HEAD > datasets/schemastore.commit
