#!/bin/sh

set -eu

rm -rf "$FWD/schema" "$FWD/__init__.py" "$FWD/__pycache__"
thrift --gen py -o "$FWD" -out "$FWD" "$FWD/schema.thrift"

PYTHONPATH="$FWD" python3 -c "
from thrift import Thrift
from thrift.protocol import TCompactProtocol
from thrift.transport import TTransport

import schema.ttypes

import json
import importlib.util
spec = importlib.util.spec_from_file_location(\"module.name\", \"$FWD/run.py\")
run = importlib.util.module_from_spec(spec)
spec.loader.exec_module(run)

with open('$1') as json_data:
  data = json.load(json_data)

result = run.encode(data, schema.ttypes)

transportOut = TTransport.TMemoryBuffer()
protocolOut = TCompactProtocol.TCompactProtocol(transportOut)
result.write(protocolOut)
bytes = transportOut.getvalue()

fd = open('$2', 'wb')
fd.write(bytes)
fd.close()"
