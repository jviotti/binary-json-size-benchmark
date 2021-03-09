#!/bin/sh

set -eu

PYTHONPATH="$FWD" python3 -c "
import json
import schema_pb2
import importlib.util
spec = importlib.util.spec_from_file_location(\"module.name\", \"$FWD/run.py\")
run = importlib.util.module_from_spec(spec)
spec.loader.exec_module(run)

with open('$1', mode='rb') as binary_data:
    data = binary_data.read()

payload = schema_pb2.Main()
payload.ParseFromString(data)

fd = open('$2', 'w')
fd.write(json.dumps(run.decode(payload), indent=4))
fd.close()"
