#!/usr/bin/env awk -f

BEGIN {
  FS = "  "
  print "| Serialization Format | Uncompressed | GZIP (-9) | LZ4 (-9) | LZMA (-9) |"
  print "|----------------------|--------------|-----------|----------|-----------|"
}

function unquote(string) {
  gsub("\"", "", string)
  return string
}

function unescape(string) {
  gsub("\\\\.", " ", string)
  return string
}

{
  print "| " unescape(unquote($2)) " | " $3 " | " $4 " | " $5 " | " $6 " |"
}
