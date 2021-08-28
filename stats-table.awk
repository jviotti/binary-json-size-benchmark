#!/usr/bin/env awk -f

BEGIN {
  FS = ","
}

function unquote(string) {
  gsub("\"", "", string)
  return string
}

function title(string) {
  return toupper( substr( string, 1, 1 ) ) substr( string, 2 );
}

NR == 1 {
  print "| " title($1) " | " title($2) " | " title($3) " | " title($4) " | " title($5) " |"
  print "|--------|--------|--------|--------|--------|"
}

NR != 1 {
  print "| " title(unquote($1)) " | " $2 " | " $3 " | " $4 " | " $5 " |"
}
