#!/usr/bin/env awk -f

BEGIN {
  FS = "  "
}

function unquote(string) {
  gsub("\"", "", string)
  return string
}

function unescape(string) {
  gsub("\\\\.", " ", string)
  return string
}

NR == 1 {
  print "| " unquote($2) " | " unquote($3) " | " unquote($4) " | " unquote($5) " | " unquote($6) " |"
  print "|----------------------|--------------|-----------|----------|-----------|"
}

NR != 1 {
  print "| " unescape(unquote($2)) " | " $3 " | " $4 " | " $5 " | " $6 " |"
}
