import sys
import ubjson
import json

with open(sys.argv[1], mode='rb') as ubjson_data:
    data = ubjson.loadb(ubjson_data.read())

print(json.dumps(data, indent=4))
