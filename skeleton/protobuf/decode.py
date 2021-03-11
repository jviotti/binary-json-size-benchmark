import sys
import json
import schema_pb2
import importlib.util
spec = importlib.util.spec_from_file_location("module.name", sys.argv[2])
run = importlib.util.module_from_spec(spec)
spec.loader.exec_module(run)

with open(sys.argv[1], mode='rb') as binary_data:
    data = binary_data.read()

payload = schema_pb2.Main()
payload.ParseFromString(data)

fd = open(sys.argv[3], 'w')
fd.write(json.dumps(run.decode(payload), indent=4))
fd.close()
