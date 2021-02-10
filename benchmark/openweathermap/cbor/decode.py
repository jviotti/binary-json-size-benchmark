import sys
import cbor2
import json

with open(sys.argv[1], mode='rb') as cbor_data:
    data = cbor2.loads(cbor_data.read())

print(json.dumps(data, indent=4))
