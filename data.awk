#!/usr/bin/env awk -f

BEGIN {
  FS = ","
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
  print "| " unquote($3) " | Schema | " unquote($4) " | " unquote($5) " | " unquote($6) " | " unquote($7) " |"
  print "|----------------------|--------|--------------|-----------|----------|-----------|"
}

NR != 1 {
  if ($2 == "asn1") {
    schema = "schema.asn"
  } else if ($2 == "avro") {
    schema = "schema.json"
  } else if ($2 == "bond") {
    schema = "schema.bond"
  } else if ($2 == "capnproto") {
    schema = "schema.capnp"
  } else if ($2 == "capnproto-packed") {
    schema = "schema.capnp"
  } else if ($2 == "flatbuffers") {
    schema = "schema.fbs"
  } else if ($2 == "jsonbinpack") {
    schema = "schema.json"
  } else if ($2 == "jsonbinpack-schemaless") {
    schema = "schema.json"
  } else if ($2 == "protobuf") {
    schema = "schema.proto"
  } else if ($2 == "thrift") {
    schema = "schema.thrift"
  } else {
    schema = ""
  }

  if (schema) {
    url = "https://github.com/jviotti/binary-json-size-benchmark/blob/main/benchmark/" document "/" $2 "/" schema
    print "| " unescape(unquote($3)) " | [`" schema "`](" url ") | " $4 " | " $5 " | " $6 " | " $7 " |"
  } else {
    print "| " unescape(unquote($3)) " | None | " $4 " | " $5 " | " $6 " | " $7 " |"
  }
}
