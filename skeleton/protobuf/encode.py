import sys
import json
import schema_pb2
import importlib.util
spec = importlib.util.spec_from_file_location("module.name", sys.argv[2])
run = importlib.util.module_from_spec(spec)
spec.loader.exec_module(run)

with open(sys.argv[1]) as json_data:
    data = json.load(json_data)

result = run.encode(data, schema_pb2)

fd = open(sys.argv[3], 'wb')
fd.write(result.SerializeToString())
fd.close()
