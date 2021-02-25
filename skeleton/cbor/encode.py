import sys
import cbor2
import json

with open(sys.argv[1]) as json_data:
    data = json.load(json_data)

fd = open(sys.argv[2], "wb")
fd.write(cbor2.dumps(data))
fd.close()
