#!/bin/sh

set -eu

protoc --experimental_allow_proto3_optional -I="$FWD" --python_out="$FWD" "$FWD/schema.proto"

PYTHONPATH="$FWD" python3 -c "
import json
import schema_pb2
import importlib.util
spec = importlib.util.spec_from_file_location(\"module.name\", \"$FWD/run.py\")
run = importlib.util.module_from_spec(spec)
spec.loader.exec_module(run)

with open('$1') as json_data:
  data = json.load(json_data)

result = run.encode(data, schema_pb2)

fd = open('$2', 'wb')
fd.write(result.SerializeToString())
fd.close()"
