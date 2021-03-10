import sys
from thrift.protocol import TCompactProtocol
from thrift.transport import TTransport

import schema.ttypes

import json
import importlib.util
spec = importlib.util.spec_from_file_location("module.name", sys.argv[2])
run = importlib.util.module_from_spec(spec)
spec.loader.exec_module(run)

with open(sys.argv[1]) as json_data:
    data = json.load(json_data)

result = run.encode(data, schema.ttypes)

transportOut = TTransport.TMemoryBuffer()
protocolOut = TCompactProtocol.TCompactProtocol(transportOut)
result.write(protocolOut)
bytes = transportOut.getvalue()

fd = open(sys.argv[3], 'wb')
fd.write(bytes)
fd.close()
