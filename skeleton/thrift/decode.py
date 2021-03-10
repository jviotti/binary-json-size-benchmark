import sys
from thrift.protocol import TCompactProtocol
from thrift.transport import TTransport

import schema.ttypes

import json
import importlib.util
spec = importlib.util.spec_from_file_location("module.name", sys.argv[2])
run = importlib.util.module_from_spec(spec)
spec.loader.exec_module(run)

with open(sys.argv[1], mode='rb') as binary_data:
    data = binary_data.read()

transport = TTransport.TMemoryBuffer(data)
protocol = TCompactProtocol.TCompactProtocol(transport)
result = schema.ttypes.Main()
result.read(protocol)

fd = open(sys.argv[3], 'w')
fd.write(json.dumps(run.decode(result), indent=4))
fd.close()
