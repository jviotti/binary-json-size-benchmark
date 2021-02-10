import sys
import bson
import json

with open(sys.argv[1], mode='rb') as bson_data:
  data = bson.loads(bson_data.read())

print(json.dumps(data, indent=4))
